import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertLeadSchema, insertSearchRequirementSchema, insertPropertySchema,
  insertLocalitySchema, insertBuyerEventSchema, insertCampaignSchema,
  insertScrapingSourceSchema, insertBlogPostSchema, insertAiInsightSchema,
  insertIntelligenceSourceSchema, insertNewsArticleSchema, insertSocialPostSchema,
  insertJobListingSchema, insertInfrastructureProjectSchema, insertLegalDisputeSchema,
  insertMarketIntelligenceSchema, insertSentimentSnapshotSchema,
  insertUserWatchlistSchema, insertPriceAlertSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import rateLimit from "express-rate-limit";
import { DUMMY_PASSWORD_HASH, generateToken, hashToken, isPublicApi, publicEventSchema, publicLeadSchema, verifyPassword } from "./auth";
import { runScraperJob, getDefaultConfigs } from "./scraper";
import { insightEngine } from "./insights/engine";
import { intelligenceCollector } from "./intelligence/collector";
import multer from "multer";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

const upload = multer({ dest: "uploads/" });

interface CSVListing {
  Locality: string;
  Price: string;
  PlotSize: string;
  PricePerSqft: string;
  Title: string;
  Link: string;
  PostedDate: string;
  Source: string;
}

interface LocalityMetric {
  locality: string;
  count: number;
  avgPricePerSqft: number;
  medianPricePerSqft: number;
  minPrice: number;
  maxPrice: number;
  sampleListings: Array<{
    title: string;
    price: number;
    pricePerSqft: number;
    source: string;
  }>;
}

let processedMetrics: LocalityMetric[] = [];

// ============ AUTH MIDDLEWARE ============
interface AuthenticatedRequest extends Request {
  userId?: string;
}

async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.userId) return next();

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.substring(7);
  const session = await storage.getSession(hashToken(token));
  
  if (!session || new Date(session.expiresAt) < new Date()) {
    return res.status(401).json({ message: "Session expired" });
  }

  const user = await storage.getUser(session.userId);
  if (user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  req.userId = session.userId;
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Default deny: a route is public only if it is listed in PUBLIC_API (server/auth.ts).
  app.use("/api", (req, res, next) => {
    if (isPublicApi(req.method, req.path)) return next();
    authMiddleware(req as AuthenticatedRequest, res, next).catch(next);
  });

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many login attempts. Try again in 15 minutes." },
  });
  const publicFormLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests. Please try again later." },
  });

  const publicEventLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests." },
  });

  // ============ AUTH ROUTES ============
  app.post("/api/auth/login", loginLimiter, async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      // Unknown usernames do the same hashing work, so timing doesn't reveal which names exist.
      if (!verifyPassword(String(password), user?.password ?? DUMMY_PASSWORD_HASH) || !user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 day session

      await storage.createSession(user.id, hashToken(token), expiresAt);

      res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // ============ CSV PROCESSING ROUTES ============
  app.post("/api/process-csv", upload.single("csv"), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No CSV file uploaded" });
      }

      const fileContent = fs.readFileSync(req.file.path, "utf-8");
      
      const records: CSVListing[] = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      if (records.length === 0) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "CSV file is empty" });
      }

      type ListingData = { price: number; pricePerSqft: number; title: string; source: string; };
      const groupedByLocality: Record<string, ListingData[]> = {};

      for (const record of records) {
        const locality = record.Locality?.trim();
        if (!locality) continue;

        const price = parseFloat(record.Price?.replace(/[^0-9.]/g, "") || "0");
        const pricePerSqft = parseFloat(record.PricePerSqft?.replace(/[^0-9.]/g, "") || "0");
        
        if (price <= 0 && pricePerSqft <= 0) continue;

        if (!groupedByLocality[locality]) {
          groupedByLocality[locality] = [];
        }

        groupedByLocality[locality].push({
          price,
          pricePerSqft,
          title: record.Title || "",
          source: record.Source || "unknown",
        });
      }

      const metrics: LocalityMetric[] = [];

      for (const locality of Object.keys(groupedByLocality)) {
        const listings = groupedByLocality[locality];
        const prices = listings.map((l: ListingData) => l.price).filter((p: number) => p > 0);
        const pricesPerSqft = listings.map((l: ListingData) => l.pricePerSqft).filter((p: number) => p > 0);
        
        const sortedPricesPerSqft = [...pricesPerSqft].sort((a: number, b: number) => a - b);
        const mid = Math.floor(sortedPricesPerSqft.length / 2);
        const median = sortedPricesPerSqft.length % 2 !== 0
          ? sortedPricesPerSqft[mid]
          : (sortedPricesPerSqft[mid - 1] + sortedPricesPerSqft[mid]) / 2;

        const avg = pricesPerSqft.length > 0 
          ? pricesPerSqft.reduce((a: number, b: number) => a + b, 0) / pricesPerSqft.length 
          : 0;

        metrics.push({
          locality,
          count: listings.length,
          avgPricePerSqft: Math.round(avg),
          medianPricePerSqft: Math.round(median || 0),
          minPrice: prices.length > 0 ? Math.min(...prices) : 0,
          maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
          sampleListings: listings.slice(0, 3).map((l: ListingData) => ({
            title: l.title,
            price: l.price,
            pricePerSqft: l.pricePerSqft,
            source: l.source,
          })),
        });
      }

      metrics.sort((a, b) => b.count - a.count);
      processedMetrics = metrics;

      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const outputPath = path.join(dataDir, "processed.json");
      fs.writeFileSync(outputPath, JSON.stringify({
        metrics,
        totalListings: records.length,
        processedAt: new Date().toISOString(),
      }, null, 2));

      fs.unlinkSync(req.file.path);

      res.json({
        success: true,
        message: "CSV processed successfully",
        totalListings: records.length,
        localityCount: metrics.length,
        metrics,
        processedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("CSV processing error:", error);
      const multerReq = req as Request & { file?: Express.Multer.File };
      if (multerReq.file) {
        try { fs.unlinkSync(multerReq.file.path); } catch {}
      }
      res.status(500).json({ message: "Failed to process CSV" });
    }
  });

  app.get("/api/price-index", async (_req, res) => {
    try {
      const dataPath = path.join(process.cwd(), "data", "processed.json");
      
      if (fs.existsSync(dataPath)) {
        const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        return res.json(data);
      }

      if (processedMetrics.length > 0) {
        return res.json({
          metrics: processedMetrics,
          totalListings: processedMetrics.reduce((sum, m) => sum + m.count, 0),
          processedAt: new Date().toISOString(),
        });
      }

      res.json({
        metrics: [],
        totalListings: 0,
        message: "No data processed yet. Upload a CSV to generate metrics.",
      });
    } catch (error) {
      console.error("Price index fetch error:", error);
      res.status(500).json({ message: "Failed to fetch price index" });
    }
  });

  app.get("/api/price-index/:locality", async (req, res) => {
    try {
      const locality = req.params.locality.toLowerCase();
      const dataPath = path.join(process.cwd(), "data", "processed.json");
      
      let metrics: LocalityMetric[] = [];
      
      if (fs.existsSync(dataPath)) {
        const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
        metrics = data.metrics || [];
      } else if (processedMetrics.length > 0) {
        metrics = processedMetrics;
      }

      const found = metrics.find(m => m.locality.toLowerCase() === locality);
      
      if (found) {
        return res.json(found);
      }

      res.status(404).json({ message: `No data found for locality: ${req.params.locality}` });
    } catch (error) {
      console.error("Price index locality fetch error:", error);
      res.status(500).json({ message: "Failed to fetch locality data" });
    }
  });

  app.post("/api/auth/logout", authMiddleware as any, async (req: AuthenticatedRequest, res) => {
    try {
      const token = req.headers.authorization?.substring(7);
      if (token) {
        await storage.deleteSession(hashToken(token));
      }
      res.json({ message: "Logged out" });
    } catch (error) {
      res.status(500).json({ message: "Logout failed" });
    }
  });

  app.get("/api/auth/me", authMiddleware as any, async (req: AuthenticatedRequest, res) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ id: user.id, username: user.username, role: user.role });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // ============ PROPERTY ROUTES ============
  app.get("/api/properties", async (req, res) => {
    try {
      const { locality, type, minPrice, maxPrice } = req.query;
      const properties = await storage.getProperties({
        locality: locality as string,
        type: type as string,
        minPrice: minPrice ? parseInt(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined
      });
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/stats", async (_req, res) => {
    try {
      const stats = await storage.getPropertyStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property stats" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(parseInt(req.params.id));
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  app.post("/api/properties", authMiddleware as any, async (req, res) => {
    const result = insertPropertySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const property = await storage.createProperty(result.data);
      res.status(201).json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to create property" });
    }
  });

  app.patch("/api/properties/:id", authMiddleware as any, async (req, res) => {
    try {
      const property = await storage.updateProperty(parseInt(req.params.id), req.body);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to update property" });
    }
  });

  app.delete("/api/properties/:id", authMiddleware as any, async (req, res) => {
    try {
      await storage.deleteProperty(parseInt(req.params.id));
      res.json({ message: "Property deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete property" });
    }
  });

  // ============ LEAD ROUTES ============
  app.post("/api/leads", async (req, res) => {
    const result = insertLeadSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const lead = await storage.createLead(result.data);
      res.status(201).json(lead);
    } catch (error) {
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  // Visitor enquiries from the public forms
  app.post("/api/public/leads", publicFormLimiter, async (req, res) => {
    const result = publicLeadSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0]?.message ?? "Invalid details" });
    }
    const { kind, name, phone, email, locality, message, website } = result.data;
    if (website) {
      return res.status(201).json({ received: true });
    }
    try {
      await storage.createLead({
        name: name || email || "Newsletter subscriber",
        phone: phone || "",
        email,
        locality,
        message,
        requirementType: kind,
        source: kind,
        notes: `Agreed to privacy policy on ${new Date().toISOString()}`,
      });
      res.status(201).json({ received: true });
    } catch (error) {
      res.status(500).json({ message: "Could not save your request. Please try again." });
    }
  });

  app.post("/api/public/events", publicEventLimiter, async (req, res) => {
    const result = publicEventSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid event" });
    }
    try {
      const { event, page, language } = result.data;
      await storage.trackEvent({ sessionId: "anonymous", eventType: event, eventData: { page, language } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Could not record event" });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const { status, source } = req.query;
      const leads = await storage.getLeads({
        status: status as string,
        source: source as string
      });
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/stats", authMiddleware as any, async (_req, res) => {
    try {
      const stats = await storage.getLeadStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lead stats" });
    }
  });

  app.get("/api/leads/:id", authMiddleware as any, async (req, res) => {
    try {
      const lead = await storage.getLead(parseInt(req.params.id));
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lead" });
    }
  });

  app.patch("/api/leads/:id", authMiddleware as any, async (req, res) => {
    try {
      const lead = await storage.updateLead(parseInt(req.params.id), req.body);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  app.delete("/api/leads/:id", authMiddleware as any, async (req, res) => {
    try {
      await storage.deleteLead(parseInt(req.params.id));
      res.json({ message: "Lead deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete lead" });
    }
  });

  // ============ LOCALITY ROUTES ============
  app.get("/api/localities", async (_req, res) => {
    try {
      const localities = await storage.getLocalities();
      res.json(localities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch localities" });
    }
  });

  app.get("/api/localities/price-index", async (req, res) => {
    try {
      const data = await storage.getPriceIndexData();
      
      const summary = {
        green: data.filter(d => d.zone === 'green'),
        red: data.filter(d => d.zone === 'red'),
        blue: data.filter(d => d.zone === 'blue'),
        gray: data.filter(d => d.zone === 'gray')
      };
      
      res.json({ 
        entries: data,
        summary: {
          greenCount: summary.green.length,
          redCount: summary.red.length,
          blueCount: summary.blue.length,
          grayCount: summary.gray.length,
          totalLocalities: data.length
        }
      });
    } catch (error) {
      console.error("Price index error:", error);
      res.status(500).json({ message: "Failed to fetch price index data" });
    }
  });

  app.get("/api/localities/:slug", async (req, res) => {
    try {
      const locality = await storage.getLocalityBySlug(req.params.slug);
      if (!locality) {
        return res.status(404).json({ message: "Locality not found" });
      }
      res.json(locality);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch locality" });
    }
  });

  app.post("/api/localities", authMiddleware as any, async (req, res) => {
    const result = insertLocalitySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const locality = await storage.createLocality(result.data);
      res.status(201).json(locality);
    } catch (error) {
      res.status(500).json({ message: "Failed to create locality" });
    }
  });

  app.patch("/api/localities/:id", authMiddleware as any, async (req, res) => {
    try {
      const locality = await storage.updateLocality(parseInt(req.params.id), req.body);
      if (!locality) {
        return res.status(404).json({ message: "Locality not found" });
      }
      res.json(locality);
    } catch (error) {
      res.status(500).json({ message: "Failed to update locality" });
    }
  });

  // ============ EVENT TRACKING ROUTES ============
  app.post("/api/events", async (req, res) => {
    const result = insertBuyerEventSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const event = await storage.trackEvent(result.data);
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to track event" });
    }
  });

  app.get("/api/events/stats", authMiddleware as any, async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const stats = await storage.getEventStats(days);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event stats" });
    }
  });

  app.get("/api/events/session/:sessionId", authMiddleware as any, async (req, res) => {
    try {
      const events = await storage.getEventsBySession(req.params.sessionId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch session events" });
    }
  });

  // ============ SEARCH REQUIREMENTS ROUTES ============
  app.post("/api/requirements", async (req, res) => {
    const result = insertSearchRequirementSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      // Rule-based AI logic for generating insights
      const insights = await insightEngine.generateSearchInsights(result.data);
      
      const requirement = await storage.createSearchRequirement({
        ...result.data,
        insights
      });
      res.status(201).json(requirement);
    } catch (error) {
      res.status(500).json({ message: "Failed to save requirements" });
    }
  });

  app.get("/api/requirements/:sessionId", async (req, res) => {
    try {
      const requirement = await storage.getLatestRequirementBySession(req.params.sessionId);
      if (!requirement) {
        return res.status(404).json({ message: "No requirements found for this session" });
      }
      res.json(requirement);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch requirements" });
    }
  });

  app.get("/api/requirements", authMiddleware as any, async (_req, res) => {
    try {
      const requirements = await storage.getSearchRequirements();
      res.json(requirements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch requirements" });
    }
  });

  // ============ CAMPAIGN ROUTES ============
  // Public read for dashboard display
  app.get("/api/campaigns", async (_req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  app.get("/api/campaigns/:id", authMiddleware as any, async (req, res) => {
    try {
      const campaign = await storage.getCampaign(parseInt(req.params.id));
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaign" });
    }
  });

  app.post("/api/campaigns", authMiddleware as any, async (req, res) => {
    const result = insertCampaignSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const campaign = await storage.createCampaign(result.data);
      res.status(201).json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to create campaign" });
    }
  });

  app.patch("/api/campaigns/:id", authMiddleware as any, async (req, res) => {
    try {
      const campaign = await storage.updateCampaign(parseInt(req.params.id), req.body);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to update campaign" });
    }
  });

  app.delete("/api/campaigns/:id", authMiddleware as any, async (req, res) => {
    try {
      await storage.deleteCampaign(parseInt(req.params.id));
      res.json({ message: "Campaign deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete campaign" });
    }
  });

  // ============ SCRAPING SOURCE ROUTES ============
  // Public read for dashboard display
  app.get("/api/scraping/sources", async (_req, res) => {
    try {
      const sources = await storage.getScrapingSources();
      res.json(sources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scraping sources" });
    }
  });

  app.get("/api/scraping/sources/:id", authMiddleware as any, async (req, res) => {
    try {
      const source = await storage.getScrapingSource(parseInt(req.params.id));
      if (!source) {
        return res.status(404).json({ message: "Source not found" });
      }
      res.json(source);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch source" });
    }
  });

  app.post("/api/scraping/sources", authMiddleware as any, async (req, res) => {
    const result = insertScrapingSourceSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const source = await storage.createScrapingSource(result.data);
      res.status(201).json(source);
    } catch (error) {
      res.status(500).json({ message: "Failed to create source" });
    }
  });

  app.patch("/api/scraping/sources/:id", authMiddleware as any, async (req, res) => {
    try {
      const source = await storage.updateScrapingSource(parseInt(req.params.id), req.body);
      if (!source) {
        return res.status(404).json({ message: "Source not found" });
      }
      res.json(source);
    } catch (error) {
      res.status(500).json({ message: "Failed to update source" });
    }
  });

  app.delete("/api/scraping/sources/:id", authMiddleware as any, async (req, res) => {
    try {
      await storage.deleteScrapingSource(parseInt(req.params.id));
      res.json({ message: "Source deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete source" });
    }
  });

  // ============ SCRAPING JOB ROUTES ============
  // Public read for dashboard display
  app.get("/api/scraping/jobs", async (req, res) => {
    try {
      const sourceId = req.query.sourceId ? parseInt(req.query.sourceId as string) : undefined;
      const jobs = await storage.getScrapingJobs(sourceId);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.post("/api/scraping/jobs", authMiddleware as any, async (req, res) => {
    try {
      const sourceId = req.body.sourceId;
      if (!sourceId) {
        return res.status(400).json({ message: "sourceId required" });
      }

      const source = await storage.getScrapingSource(sourceId);
      if (!source) {
        return res.status(404).json({ message: "Source not found" });
      }

      // Create a new job
      const job = await storage.createScrapingJob({
        sourceId,
        status: "running",
        startedAt: new Date()
      });

      // Run scraper asynchronously
      runScraperJob(job.id, source);

      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({ message: "Failed to start scraping job" });
    }
  });

  // ============ BLOG ROUTES ============
  app.get("/api/blog", async (req, res) => {
    try {
      const onlyPublished = req.query.published !== 'false';
      const posts = await storage.getBlogPosts(onlyPublished);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.post("/api/blog", authMiddleware as any, async (req, res) => {
    const result = insertBlogPostSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const post = await storage.createBlogPost(result.data);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.patch("/api/blog/:id", authMiddleware as any, async (req, res) => {
    try {
      const post = await storage.updateBlogPost(parseInt(req.params.id), req.body);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  app.delete("/api/blog/:id", authMiddleware as any, async (req, res) => {
    try {
      await storage.deleteBlogPost(parseInt(req.params.id));
      res.json({ message: "Post deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // Track blog views (public)
  app.post("/api/blog/:id/view", async (req, res) => {
    try {
      await storage.incrementBlogViews(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to track view" });
    }
  });

  // ============ AI BLOG GENERATOR ROUTES ============
  app.post("/api/admin/blog/generate", authMiddleware as any, async (req, res) => {
    try {
      const { contentType, locality, topic, tone, provider } = req.body;
      
      if (!contentType || !topic || !tone || !provider) {
        return res.status(400).json({ message: "Missing required fields: contentType, topic, tone, provider" });
      }

      const { generateBlogContent } = await import("./ai/blog-generator");
      const result = await generateBlogContent({
        contentType,
        locality,
        topic,
        tone,
        provider
      });

      // Create draft blog post
      const post = await storage.createBlogPost({
        title: result.title,
        slug: result.slug,
        excerpt: result.excerpt,
        content: result.content,
        metaDescription: result.metaDescription,
        contentType,
        locality,
        tone,
        status: "generated",
        aiProvider: provider,
        aiCostUsd: result.costUsd,
        isPublished: false
      });

      res.json({ post, cost: result.costUsd });
    } catch (error: any) {
      console.error("Blog generation error:", error);
      res.status(500).json({ message: error.message || "Failed to generate blog" });
    }
  });

  app.post("/api/admin/blog/:id/approve", authMiddleware as any, async (req, res) => {
    try {
      const post = await storage.updateBlogPost(parseInt(req.params.id), {
        status: "approved"
      });
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to approve post" });
    }
  });

  app.post("/api/admin/blog/:id/schedule", authMiddleware as any, async (req, res) => {
    try {
      const { scheduledAt } = req.body;
      if (!scheduledAt) {
        return res.status(400).json({ message: "scheduledAt is required" });
      }

      const post = await storage.updateBlogPost(parseInt(req.params.id), {
        status: "scheduled",
        scheduledAt: new Date(scheduledAt)
      });
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to schedule post" });
    }
  });

  app.post("/api/admin/blog/:id/publish", authMiddleware as any, async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const existingPost = await storage.getBlogPost(postId);
      if (!existingPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Publish the blog post
      const post = await storage.updateBlogPost(postId, {
        status: "published",
        isPublished: true,
        publishedAt: new Date()
      });

      // Create notification for the blog
      await storage.createBlogNotification({
        blogId: postId,
        notificationText: `New Guide: ${existingPost.title}`,
        targetPage: "/step-3-safety-check",
        isActive: true,
        publishedAt: new Date()
      });

      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to publish post" });
    }
  });

  // Budget tracking
  app.get("/api/admin/budget", authMiddleware as any, async (_req, res) => {
    try {
      const { getBudgetStatus } = await import("./ai/blog-generator");
      const budget = await getBudgetStatus();
      res.json(budget);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch budget" });
    }
  });

  // ============ BLOG NOTIFICATIONS ROUTES ============
  // Public - get active notifications
  app.get("/api/notifications", async (req, res) => {
    try {
      const targetPage = req.query.targetPage as string;
      const notifications = await storage.getActiveNotifications(targetPage);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  // Track notification click
  app.post("/api/notifications/:id/click", async (req, res) => {
    try {
      await storage.incrementNotificationClicks(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to track click" });
    }
  });

  // Deactivate notification
  app.post("/api/notifications/:id/deactivate", async (req, res) => {
    try {
      await storage.deactivateNotification(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to deactivate notification" });
    }
  });

  // ============ AI INSIGHTS ROUTES ============
  app.post("/api/insights", authMiddleware as any, async (req, res) => {
    const result = insertAiInsightSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const insight = await storage.createInsight(result.data);
      res.status(201).json(insight);
    } catch (error) {
      res.status(500).json({ message: "Failed to create insight" });
    }
  });

  app.get("/api/insights", authMiddleware as any, async (req, res) => {
    try {
      const sessionId = req.query.sessionId as string;
      const insights = await storage.getInsights(sessionId);
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch insights" });
    }
  });

  app.get("/api/insights/recent", authMiddleware as any, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const insights = await storage.getRecentInsights(limit);
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent insights" });
    }
  });

  // ============ ANALYTICS DASHBOARD ROUTE ============
  // Public read for dashboard display
  app.get("/api/analytics/dashboard", async (_req, res) => {
    try {
      const [propertyStats, leadStats, eventStats] = await Promise.all([
        storage.getPropertyStats(),
        storage.getLeadStats(),
        storage.getEventStats(30)
      ]);

      res.json({
        properties: propertyStats,
        leads: leadStats,
        events: eventStats
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard analytics" });
    }
  });

  // ============ INSIGHT ENGINE ROUTES ============
  app.get("/api/insights/property/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(parseInt(req.params.id));
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      const insights = insightEngine.analyzeProperty(property);
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze property" });
    }
  });

  app.get("/api/insights/locality/:name", async (req, res) => {
    try {
      const insights = insightEngine.analyzeLocality(req.params.name);
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze locality" });
    }
  });

  app.get("/api/insights/buyer/:sessionId", authMiddleware as any, async (req, res) => {
    try {
      const profile = await insightEngine.analyzeBuyerBehavior(req.params.sessionId);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze buyer behavior" });
    }
  });

  app.post("/api/insights/lead/:id/score", authMiddleware as any, async (req, res) => {
    try {
      const lead = await storage.getLead(parseInt(req.params.id));
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      const scoring = await insightEngine.generateLeadScore(lead);
      
      // Update lead with scoring
      await storage.updateLead(lead.id, {
        intentScore: scoring.intentScore,
        awarenessLevel: scoring.awarenessLevel
      });
      
      res.json(scoring);
    } catch (error) {
      res.status(500).json({ message: "Failed to score lead" });
    }
  });

  app.get("/api/scraping/configs", authMiddleware as any, async (_req, res) => {
    try {
      const configs = getDefaultConfigs();
      res.json(configs);
    } catch (error) {
      res.status(500).json({ message: "Failed to get scraper configs" });
    }
  });

  // ============ WEB INTELLIGENCE - SOURCES ============
  app.get("/api/intelligence/sources", async (req, res) => {
    try {
      const type = req.query.type as string;
      const sources = await storage.getIntelligenceSources(type);
      res.json(sources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch intelligence sources" });
    }
  });

  app.get("/api/intelligence/sources/:id", authMiddleware as any, async (req, res) => {
    try {
      const source = await storage.getIntelligenceSource(parseInt(req.params.id));
      if (!source) {
        return res.status(404).json({ message: "Source not found" });
      }
      res.json(source);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch source" });
    }
  });

  app.post("/api/intelligence/sources", authMiddleware as any, async (req, res) => {
    const result = insertIntelligenceSourceSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const source = await storage.createIntelligenceSource(result.data);
      res.status(201).json(source);
    } catch (error) {
      res.status(500).json({ message: "Failed to create source" });
    }
  });

  app.patch("/api/intelligence/sources/:id", authMiddleware as any, async (req, res) => {
    try {
      const source = await storage.updateIntelligenceSource(parseInt(req.params.id), req.body);
      if (!source) {
        return res.status(404).json({ message: "Source not found" });
      }
      res.json(source);
    } catch (error) {
      res.status(500).json({ message: "Failed to update source" });
    }
  });

  app.delete("/api/intelligence/sources/:id", authMiddleware as any, async (req: AuthenticatedRequest, res) => {
    try {
      const { adminPassword } = req.body;
      
      if (!adminPassword) {
        return res.status(400).json({ message: "Admin password is required" });
      }
      
      // Confirm the admin password again before this destructive action
      const adminUser = await storage.getUser(req.userId!);
      if (!adminUser) {
        return res.status(403).json({ message: "Admin account not found" });
      }
      
      const isValidPassword = verifyPassword(String(adminPassword), adminUser.password);
      if (!isValidPassword) {
        return res.status(403).json({ message: "Invalid admin password" });
      }
      
      await storage.deleteIntelligenceSource(parseInt(req.params.id));
      res.json({ message: "Source deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete source" });
    }
  });

  // ============ WEB INTELLIGENCE - NEWS ARTICLES ============
  app.get("/api/intelligence/news", async (req, res) => {
    try {
      const { locality, visible, limit } = req.query;
      const articles = await storage.getNewsArticles({
        locality: locality as string,
        isVisible: visible === 'true' ? true : visible === 'false' ? false : undefined,
        limit: limit ? parseInt(limit as string) : undefined
      });
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news articles" });
    }
  });

  app.post("/api/intelligence/news", authMiddleware as any, async (req, res) => {
    const result = insertNewsArticleSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const article = await storage.createNewsArticle(result.data);
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to create news article" });
    }
  });

  app.patch("/api/intelligence/news/:id", authMiddleware as any, async (req, res) => {
    try {
      const article = await storage.updateNewsArticle(parseInt(req.params.id), req.body);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to update news article" });
    }
  });

  app.delete("/api/intelligence/news/:id", authMiddleware as any, async (req, res) => {
    try {
      await storage.deleteNewsArticle(parseInt(req.params.id));
      res.json({ message: "Article deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete news article" });
    }
  });

  // ============ WEB INTELLIGENCE - SOCIAL POSTS ============
  app.get("/api/intelligence/social", async (req, res) => {
    try {
      const { platform, visible, limit } = req.query;
      const posts = await storage.getSocialPosts({
        platform: platform as string,
        isVisible: visible === 'true' ? true : visible === 'false' ? false : undefined,
        limit: limit ? parseInt(limit as string) : undefined
      });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch social posts" });
    }
  });

  app.post("/api/intelligence/social", authMiddleware as any, async (req, res) => {
    const result = insertSocialPostSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const post = await storage.createSocialPost(result.data);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create social post" });
    }
  });

  app.patch("/api/intelligence/social/:id", authMiddleware as any, async (req, res) => {
    try {
      const post = await storage.updateSocialPost(parseInt(req.params.id), req.body);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to update social post" });
    }
  });

  app.delete("/api/intelligence/social/:id", authMiddleware as any, async (req, res) => {
    try {
      await storage.deleteSocialPost(parseInt(req.params.id));
      res.json({ message: "Post deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete social post" });
    }
  });

  // ============ WEB INTELLIGENCE - JOB LISTINGS ============
  app.get("/api/intelligence/jobs", async (req, res) => {
    try {
      const { locality, visible, limit } = req.query;
      const jobs = await storage.getJobListings({
        locality: locality as string,
        isVisible: visible === 'true' ? true : visible === 'false' ? false : undefined,
        limit: limit ? parseInt(limit as string) : undefined
      });
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job listings" });
    }
  });

  app.post("/api/intelligence/jobs", authMiddleware as any, async (req, res) => {
    const result = insertJobListingSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const job = await storage.createJobListing(result.data);
      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({ message: "Failed to create job listing" });
    }
  });

  app.patch("/api/intelligence/jobs/:id", authMiddleware as any, async (req, res) => {
    try {
      const job = await storage.updateJobListing(parseInt(req.params.id), req.body);
      if (!job) {
        return res.status(404).json({ message: "Job listing not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Failed to update job listing" });
    }
  });

  app.delete("/api/intelligence/jobs/:id", authMiddleware as any, async (req, res) => {
    try {
      await storage.deleteJobListing(parseInt(req.params.id));
      res.json({ message: "Job listing deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete job listing" });
    }
  });

  // ============ WEB INTELLIGENCE - INFRASTRUCTURE PROJECTS ============
  app.get("/api/intelligence/infrastructure", async (req, res) => {
    try {
      const { visible } = req.query;
      const projects = await storage.getInfrastructureProjects({
        isVisible: visible === 'true' ? true : visible === 'false' ? false : undefined
      });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch infrastructure projects" });
    }
  });

  app.post("/api/intelligence/infrastructure", authMiddleware as any, async (req, res) => {
    const result = insertInfrastructureProjectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const project = await storage.createInfrastructureProject(result.data);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to create infrastructure project" });
    }
  });

  app.patch("/api/intelligence/infrastructure/:id", authMiddleware as any, async (req, res) => {
    try {
      const project = await storage.updateInfrastructureProject(parseInt(req.params.id), req.body);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to update infrastructure project" });
    }
  });

  app.delete("/api/intelligence/infrastructure/:id", authMiddleware as any, async (req, res) => {
    try {
      await storage.deleteInfrastructureProject(parseInt(req.params.id));
      res.json({ message: "Project deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete infrastructure project" });
    }
  });

  // ============ WEB INTELLIGENCE - LEGAL DISPUTES ============
  app.get("/api/intelligence/legal", async (req, res) => {
    try {
      const { locality, visible } = req.query;
      const disputes = await storage.getLegalDisputes({
        locality: locality as string,
        isVisible: visible === 'true' ? true : visible === 'false' ? false : undefined
      });
      res.json(disputes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch legal disputes" });
    }
  });

  app.post("/api/intelligence/legal", authMiddleware as any, async (req, res) => {
    const result = insertLegalDisputeSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const dispute = await storage.createLegalDispute(result.data);
      res.status(201).json(dispute);
    } catch (error) {
      res.status(500).json({ message: "Failed to create legal dispute" });
    }
  });

  app.patch("/api/intelligence/legal/:id", authMiddleware as any, async (req, res) => {
    try {
      const dispute = await storage.updateLegalDispute(parseInt(req.params.id), req.body);
      if (!dispute) {
        return res.status(404).json({ message: "Dispute not found" });
      }
      res.json(dispute);
    } catch (error) {
      res.status(500).json({ message: "Failed to update legal dispute" });
    }
  });

  app.delete("/api/intelligence/legal/:id", authMiddleware as any, async (req, res) => {
    try {
      await storage.deleteLegalDispute(parseInt(req.params.id));
      res.json({ message: "Dispute deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete legal dispute" });
    }
  });

  // ============ WEB INTELLIGENCE - MARKET INTELLIGENCE ============
  app.get("/api/intelligence/market", async (req, res) => {
    try {
      const { locality, visible } = req.query;
      const reports = await storage.getMarketIntelligence({
        locality: locality as string,
        isVisible: visible === 'true' ? true : visible === 'false' ? false : undefined
      });
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market intelligence" });
    }
  });

  app.post("/api/intelligence/market", authMiddleware as any, async (req, res) => {
    const result = insertMarketIntelligenceSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const report = await storage.createMarketIntelligence(result.data);
      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ message: "Failed to create market intelligence" });
    }
  });

  app.patch("/api/intelligence/market/:id", authMiddleware as any, async (req, res) => {
    try {
      const report = await storage.updateMarketIntelligence(parseInt(req.params.id), req.body);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Failed to update market intelligence" });
    }
  });

  // ============ WEB INTELLIGENCE - SENTIMENT ============
  app.get("/api/intelligence/sentiment", async (req, res) => {
    try {
      const { locality, visible } = req.query;
      const snapshots = await storage.getSentimentSnapshots({
        locality: locality as string,
        isVisible: visible === 'true' ? true : visible === 'false' ? false : undefined
      });
      res.json(snapshots);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sentiment snapshots" });
    }
  });

  app.post("/api/intelligence/sentiment", authMiddleware as any, async (req, res) => {
    const result = insertSentimentSnapshotSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: fromZodError(result.error).message });
    }
    try {
      const snapshot = await storage.createSentimentSnapshot(result.data);
      res.status(201).json(snapshot);
    } catch (error) {
      res.status(500).json({ message: "Failed to create sentiment snapshot" });
    }
  });

  app.patch("/api/intelligence/sentiment/:id", authMiddleware as any, async (req, res) => {
    try {
      const snapshot = await storage.updateSentimentSnapshot(parseInt(req.params.id), req.body);
      if (!snapshot) {
        return res.status(404).json({ message: "Snapshot not found" });
      }
      res.json(snapshot);
    } catch (error) {
      res.status(500).json({ message: "Failed to update sentiment snapshot" });
    }
  });

  // ============ WEB INTELLIGENCE - INTELLIGENCE JOBS ============
  app.get("/api/intelligence/scrape-jobs", async (req, res) => {
    try {
      const sourceId = req.query.sourceId ? parseInt(req.query.sourceId as string) : undefined;
      const jobs = await storage.getIntelligenceJobs(sourceId);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch intelligence jobs" });
    }
  });

  app.post("/api/intelligence/collect", authMiddleware as any, async (req, res) => {
    try {
      const { sourceId } = req.body;
      if (!sourceId) {
        return res.status(400).json({ message: "sourceId is required" });
      }

      const source = await storage.getIntelligenceSource(sourceId);
      if (!source) {
        return res.status(404).json({ message: "Source not found" });
      }

      const result = await intelligenceCollector.runCollection(sourceId);
      res.json(result);
    } catch (error) {
      console.error("Intelligence collection error:", error);
      res.status(500).json({ message: "Failed to run intelligence collection" });
    }
  });

  // ============ WEB INTELLIGENCE - DASHBOARD SUMMARY ============
  app.get("/api/intelligence/dashboard", async (_req, res) => {
    try {
      const [sources, news, social, jobs, infrastructure, legal, market, sentiment] = await Promise.all([
        storage.getIntelligenceSources(),
        storage.getNewsArticles({ limit: 10 }),
        storage.getSocialPosts({ limit: 10 }),
        storage.getJobListings({ limit: 10 }),
        storage.getInfrastructureProjects(),
        storage.getLegalDisputes(),
        storage.getMarketIntelligence(),
        storage.getSentimentSnapshots()
      ]);

      res.json({
        stats: {
          sourcesCount: sources.length,
          activeSources: sources.filter(s => s.isActive).length,
          newsCount: news.length,
          socialCount: social.length,
          jobsCount: jobs.length,
          infrastructureCount: infrastructure.length,
          legalCount: legal.length,
          marketReportsCount: market.length
        },
        recentNews: news.slice(0, 5),
        recentSocial: social.slice(0, 5),
        topJobs: jobs.slice(0, 5),
        infrastructure: infrastructure,
        legalAlerts: legal.filter(d => d.currentStatus === 'Pending'),
        latestMarket: market[0],
        latestSentiment: sentiment[0]
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch intelligence dashboard" });
    }
  });

  // ============ WEB INTELLIGENCE - PUBLIC INSIGHTS (Only visible data) ============
  app.get("/api/public/intelligence", async (_req, res) => {
    try {
      const [news, social, jobs, infrastructure, legal, market, sentiment] = await Promise.all([
        storage.getNewsArticles({ isVisible: true, limit: 20 }),
        storage.getSocialPosts({ isVisible: true, limit: 20 }),
        storage.getJobListings({ isVisible: true, limit: 20 }),
        storage.getInfrastructureProjects({ isVisible: true }),
        storage.getLegalDisputes({ isVisible: true }),
        storage.getMarketIntelligence({ isVisible: true }),
        storage.getSentimentSnapshots({ isVisible: true })
      ]);

      res.json({
        news,
        social,
        jobs,
        infrastructure,
        legal,
        market,
        sentiment
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch public intelligence" });
    }
  });

  // ============ WEB INTELLIGENCE - COLLECT ALL SOURCES ============
  app.post("/api/intelligence/collect-all", authMiddleware as any, async (_req, res) => {
    try {
      const sources = await storage.getIntelligenceSources();
      const activeSources = sources.filter(s => s.isActive);
      
      if (activeSources.length === 0) {
        return res.status(400).json({ message: "No active sources to collect from" });
      }

      const results = [];
      let totalItems = 0;
      
      for (const source of activeSources) {
        try {
          const result = await intelligenceCollector.runCollection(source.id);
          results.push({ sourceId: source.id, name: source.name, ...result });
          totalItems += result.itemsCollected || 0;
        } catch (err) {
          results.push({ sourceId: source.id, name: source.name, error: 'Collection failed' });
        }
      }

      res.json({
        message: `Collected from ${activeSources.length} sources`,
        totalItemsCollected: totalItems,
        results
      });
    } catch (error) {
      console.error("Collect all error:", error);
      res.status(500).json({ message: "Failed to run collection" });
    }
  });

  // ============ WEB INTELLIGENCE - SCHEDULE SETTINGS ============
  app.get("/api/intelligence/schedule", authMiddleware as any, async (_req, res) => {
    try {
      let settings = await storage.getIntelligenceScheduleSettings();
      if (!settings) {
        settings = await storage.updateIntelligenceScheduleSettings({
          autoScrapingEnabled: true
        });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schedule settings" });
    }
  });

  app.patch("/api/intelligence/schedule", authMiddleware as any, async (req, res) => {
    try {
      const settings = await storage.updateIntelligenceScheduleSettings(req.body);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to update schedule settings" });
    }
  });

  // ============ ENGAGEMENT - PRICE PREDICTIONS ============
  app.get("/api/predictions", async (req, res) => {
    try {
      const { locality } = req.query;
      const predictions = await storage.getPricePredictions(locality as string | undefined);
      res.json(predictions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch predictions" });
    }
  });

  app.get("/api/predictions/:id", async (req, res) => {
    try {
      const prediction = await storage.getPricePrediction(parseInt(req.params.id));
      if (!prediction) {
        return res.status(404).json({ message: "Prediction not found" });
      }
      res.json(prediction);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prediction" });
    }
  });

  app.post("/api/predictions", authMiddleware as any, async (req, res) => {
    try {
      const prediction = await storage.createPricePrediction(req.body);
      res.status(201).json(prediction);
    } catch (error) {
      res.status(500).json({ message: "Failed to create prediction" });
    }
  });

  // Generate predictions for a locality based on market data
  app.post("/api/predictions/generate/:locality", async (req, res) => {
    try {
      const { locality } = req.params;
      
      // Fetch relevant data for prediction
      const [infraProjects, marketData, legalDisputes] = await Promise.all([
        storage.getInfrastructureProjects({ isVisible: true }),
        storage.getMarketIntelligence({ locality, isVisible: true }),
        storage.getLegalDisputes({ locality, isVisible: true })
      ]);

      // Filter infra projects affecting this locality
      const relevantInfra = infraProjects.filter(p => 
        p.affectedLocalities?.includes(locality)
      );

      // Get latest market data
      const latestMarket = marketData[0];
      const currentPrice = latestMarket?.avgPricePerSqft || 3500;

      // Calculate prediction based on factors
      let appreciationFactor = 1.0;
      let confidenceLevel = 60;
      const factors: any = {
        infraProjects: [],
        demandTrend: 'stable',
        supplyTrend: 'moderate',
        legalRisk: 'low'
      };

      // Infrastructure impact
      relevantInfra.forEach(infra => {
        const impact = parseFloat(infra.expectedAppreciation?.replace('%', '') || '0') / 100;
        appreciationFactor += impact * 0.3; // Weight infrastructure impact
        factors.infraProjects.push({
          name: infra.projectName,
          type: infra.projectType,
          status: infra.currentStatus,
          expectedImpact: infra.expectedAppreciation
        });
        confidenceLevel += 5;
      });

      // Market temperature impact
      if (latestMarket?.marketTemperature === 'HOT') {
        appreciationFactor += 0.08;
        factors.demandTrend = 'high';
        confidenceLevel += 10;
      } else if (latestMarket?.marketTemperature === 'COOLING') {
        appreciationFactor -= 0.03;
        factors.demandTrend = 'declining';
      }

      // Legal risk adjustment
      const pendingDisputes = legalDisputes.filter(d => d.currentStatus === 'Pending').length;
      if (pendingDisputes > 10) {
        appreciationFactor -= 0.05;
        factors.legalRisk = 'high';
        confidenceLevel -= 10;
      } else if (pendingDisputes > 5) {
        factors.legalRisk = 'moderate';
        confidenceLevel -= 5;
      }

      // Calculate predicted range
      const predictedAvg = Math.round(currentPrice * appreciationFactor);
      const variance = 0.05; // 5% variance
      const predictedMin = Math.round(predictedAvg * (1 - variance));
      const predictedMax = Math.round(predictedAvg * (1 + variance));

      // Cap confidence level
      confidenceLevel = Math.min(Math.max(confidenceLevel, 40), 95);

      // Create reasoning text
      const reasoning = `Based on ${relevantInfra.length} infrastructure projects affecting ${locality}, ` +
        `current market temperature (${latestMarket?.marketTemperature || 'Unknown'}), ` +
        `and ${pendingDisputes} pending legal disputes. ` +
        `Demand trend is ${factors.demandTrend} with ${factors.legalRisk} legal risk.`;

      // Expire after 30 days
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const prediction = await storage.createPricePrediction({
        locality,
        currentPricePerSqft: currentPrice,
        predictedPriceMin: predictedMin,
        predictedPriceMax: predictedMax,
        predictionMonths: 12,
        confidenceLevel,
        factorsConsidered: factors,
        reasoning,
        expiresAt,
        isActive: true
      });

      res.status(201).json(prediction);
    } catch (error) {
      console.error("Generate prediction error:", error);
      res.status(500).json({ message: "Failed to generate prediction" });
    }
  });

  // ============ ENGAGEMENT - USER WATCHLIST ============
  app.get("/api/watchlist", async (req, res) => {
    try {
      const sessionId = req.headers['x-session-id'] as string;
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID required" });
      }
      const watchlist = await storage.getWatchlistBySession(sessionId);
      res.json(watchlist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watchlist" });
    }
  });

  app.post("/api/watchlist", async (req, res) => {
    try {
      const sessionId = req.headers['x-session-id'] as string;
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID required" });
      }

      const validationResult = insertUserWatchlistSchema.safeParse({
        ...req.body,
        sessionId
      });
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: fromZodError(validationResult.error).message 
        });
      }

      const { localityName } = validationResult.data;

      // Check if already in watchlist
      const exists = await storage.isLocalityInWatchlist(sessionId, localityName);
      if (exists) {
        return res.status(409).json({ message: "Locality already in watchlist" });
      }

      const item = await storage.addToWatchlist({
        ...validationResult.data,
        notifyPriceChanges: validationResult.data.notifyPriceChanges ?? true,
        notifyInfraUpdates: validationResult.data.notifyInfraUpdates ?? true,
        weeklyDigest: validationResult.data.weeklyDigest ?? true
      });
      res.status(201).json(item);
    } catch (error) {
      console.error("Add to watchlist error:", error);
      res.status(500).json({ message: "Failed to add to watchlist" });
    }
  });

  app.patch("/api/watchlist/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updated = await storage.updateWatchlistItem(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Watchlist item not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update watchlist item" });
    }
  });

  app.delete("/api/watchlist/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFromWatchlist(id);
      res.json({ message: "Removed from watchlist" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from watchlist" });
    }
  });

  app.get("/api/watchlist/check/:localityName", async (req, res) => {
    try {
      const sessionId = req.headers['x-session-id'] as string;
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID required" });
      }
      const exists = await storage.isLocalityInWatchlist(sessionId, req.params.localityName);
      res.json({ inWatchlist: exists });
    } catch (error) {
      res.status(500).json({ message: "Failed to check watchlist" });
    }
  });

  // ============ ENGAGEMENT - PRICE ALERTS ============
  app.get("/api/alerts", async (req, res) => {
    try {
      const sessionId = req.headers['x-session-id'] as string;
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID required" });
      }
      const alerts = await storage.getPriceAlerts(sessionId);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const sessionId = req.headers['x-session-id'] as string;
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID required" });
      }

      const validationResult = insertPriceAlertSchema.safeParse({
        ...req.body,
        sessionId,
        isActive: true
      });
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: fromZodError(validationResult.error).message 
        });
      }

      const alert = await storage.createPriceAlert(validationResult.data);
      res.status(201).json(alert);
    } catch (error) {
      console.error("Create alert error:", error);
      res.status(500).json({ message: "Failed to create alert" });
    }
  });

  app.patch("/api/alerts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updated = await storage.updatePriceAlert(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Alert not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update alert" });
    }
  });

  app.delete("/api/alerts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deletePriceAlert(id);
      res.json({ message: "Alert deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete alert" });
    }
  });

  // Get locality engagement data (predictions + active alerts count)
  app.get("/api/locality/:name/engagement", async (req, res) => {
    try {
      const { name } = req.params;
      const sessionId = req.headers['x-session-id'] as string;

      const [predictions, inWatchlist] = await Promise.all([
        storage.getPricePredictions(name),
        sessionId ? storage.isLocalityInWatchlist(sessionId, name) : Promise.resolve(false)
      ]);

      const latestPrediction = predictions[0];

      res.json({
        prediction: latestPrediction ? {
          currentPrice: latestPrediction.currentPricePerSqft,
          predictedMin: latestPrediction.predictedPriceMin,
          predictedMax: latestPrediction.predictedPriceMax,
          confidence: latestPrediction.confidenceLevel,
          months: latestPrediction.predictionMonths,
          factors: latestPrediction.factorsConsidered,
          reasoning: latestPrediction.reasoning,
          generatedAt: latestPrediction.generatedAt
        } : null,
        inWatchlist
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch engagement data" });
    }
  });

  return httpServer;
}

