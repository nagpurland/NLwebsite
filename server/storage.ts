import { 
  type User, type InsertUser, 
  type Property, type InsertProperty,
  type Lead, type InsertLead,
  type Locality, type InsertLocality,
  type BuyerEvent, type InsertBuyerEvent,
  type SearchRequirement, type InsertSearchRequirement,
  type Campaign, type InsertCampaign,
  type ScrapingSource, type InsertScrapingSource,
  type ScrapingJob, type InsertScrapingJob,
  type BlogPost, type InsertBlogPost,
  type BlogNotification, type InsertBlogNotification,
  type AiInsight, type InsertAiInsight,
  type IntelligenceSource, type InsertIntelligenceSource,
  type NewsArticle, type InsertNewsArticle,
  type SocialPost, type InsertSocialPost,
  type JobListing, type InsertJobListing,
  type InfrastructureProject, type InsertInfrastructureProject,
  type LegalDispute, type InsertLegalDispute,
  type MarketIntelligence, type InsertMarketIntelligence,
  type SentimentSnapshot, type InsertSentimentSnapshot,
  type IntelligenceJob, type InsertIntelligenceJob,
  type IntelligenceScheduleSettings, type InsertIntelligenceScheduleSettings,
  type PricePrediction, type InsertPricePrediction,
  type UserWatchlistItem, type InsertUserWatchlistItem,
  type PriceAlert, type InsertPriceAlert,
  users, properties, leads, localities, buyerEvents, searchRequirements,
  campaigns, scrapingSources, scrapingJobs, blogPosts, blogNotifications, aiInsights, sessions,
  intelligenceSources, newsArticles, socialPosts, jobListings,
  infrastructureProjects, legalDisputes, marketIntelligence, sentimentSnapshots, intelligenceJobs,
  intelligenceScheduleSettings, pricePredictions, userWatchlist, priceAlerts
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, gte, lte, like, ilike, or } from "drizzle-orm";

export interface IStorage {
  // Users & Auth
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSession(userId: string, token: string, expiresAt: Date): Promise<void>;
  getSession(token: string): Promise<{ userId: string; expiresAt: Date } | undefined>;
  deleteSession(token: string): Promise<void>;

  // Properties
  getProperties(filters?: { locality?: string; type?: string; minPrice?: number; maxPrice?: number }): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(insertProperty: InsertProperty): Promise<Property>;
  updateProperty(id: number, data: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  getPropertyStats(): Promise<{ total: number; verified: number; byLocality: Record<string, number> }>;

  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(filters?: { status?: string; source?: string }): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  updateLead(id: number, data: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: number): Promise<boolean>;
  getLeadStats(): Promise<{ total: number; byStatus: Record<string, number>; bySource: Record<string, number> }>;

  // Localities
  getLocalities(): Promise<Locality[]>;
  getLocality(id: number): Promise<Locality | undefined>;
  getLocalityBySlug(slug: string): Promise<Locality | undefined>;
  createLocality(locality: InsertLocality): Promise<Locality>;
  updateLocality(id: number, data: Partial<InsertLocality>): Promise<Locality | undefined>;

  // Buyer Events (for AI insights)
  trackEvent(event: InsertBuyerEvent): Promise<BuyerEvent>;
  getEventsBySession(sessionId: string): Promise<BuyerEvent[]>;
  getEventStats(days: number): Promise<{ eventCounts: Record<string, number>; topProperties: number[]; topLocalities: number[] }>;

  // Search Requirements
  createSearchRequirement(req: InsertSearchRequirement): Promise<SearchRequirement>;
  getLatestRequirementBySession(sessionId: string): Promise<SearchRequirement | undefined>;
  getSearchRequirements(): Promise<SearchRequirement[]>;

  // Campaigns
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: number, data: Partial<InsertCampaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: number): Promise<boolean>;

  // Scraping
  getScrapingSources(): Promise<ScrapingSource[]>;
  getScrapingSource(id: number): Promise<ScrapingSource | undefined>;
  createScrapingSource(source: InsertScrapingSource): Promise<ScrapingSource>;
  updateScrapingSource(id: number, data: Partial<InsertScrapingSource>): Promise<ScrapingSource | undefined>;
  deleteScrapingSource(id: number): Promise<boolean>;
  getScrapingJobs(sourceId?: number): Promise<ScrapingJob[]>;
  createScrapingJob(job: InsertScrapingJob): Promise<ScrapingJob>;
  updateScrapingJob(id: number, data: Partial<InsertScrapingJob>): Promise<ScrapingJob | undefined>;

  // Blog
  getBlogPosts(onlyPublished?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  incrementBlogViews(id: number): Promise<void>;

  // Blog Notifications
  getActiveNotifications(targetPage?: string): Promise<BlogNotification[]>;
  createBlogNotification(notification: InsertBlogNotification): Promise<BlogNotification>;
  updateBlogNotification(id: number, data: Partial<InsertBlogNotification>): Promise<BlogNotification | undefined>;
  incrementNotificationClicks(id: number): Promise<void>;
  deactivateNotification(id: number): Promise<void>;

  // AI Insights
  createInsight(insight: InsertAiInsight): Promise<AiInsight>;
  getInsights(sessionId?: string): Promise<AiInsight[]>;
  getRecentInsights(limit: number): Promise<AiInsight[]>;

  // Web Intelligence - Sources
  getIntelligenceSources(type?: string): Promise<IntelligenceSource[]>;
  getIntelligenceSource(id: number): Promise<IntelligenceSource | undefined>;
  createIntelligenceSource(source: InsertIntelligenceSource): Promise<IntelligenceSource>;
  updateIntelligenceSource(id: number, data: Partial<InsertIntelligenceSource>): Promise<IntelligenceSource | undefined>;
  deleteIntelligenceSource(id: number): Promise<boolean>;

  // Web Intelligence - News Articles
  getNewsArticles(filters?: { locality?: string; isVisible?: boolean; limit?: number }): Promise<NewsArticle[]>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
  updateNewsArticle(id: number, data: Partial<InsertNewsArticle>): Promise<NewsArticle | undefined>;
  deleteNewsArticle(id: number): Promise<boolean>;

  // Web Intelligence - Social Posts
  getSocialPosts(filters?: { platform?: string; isVisible?: boolean; limit?: number }): Promise<SocialPost[]>;
  createSocialPost(post: InsertSocialPost): Promise<SocialPost>;
  updateSocialPost(id: number, data: Partial<InsertSocialPost>): Promise<SocialPost | undefined>;
  deleteSocialPost(id: number): Promise<boolean>;

  // Web Intelligence - Job Listings
  getJobListings(filters?: { locality?: string; isVisible?: boolean; limit?: number }): Promise<JobListing[]>;
  createJobListing(job: InsertJobListing): Promise<JobListing>;
  updateJobListing(id: number, data: Partial<InsertJobListing>): Promise<JobListing | undefined>;
  deleteJobListing(id: number): Promise<boolean>;

  // Web Intelligence - Infrastructure Projects
  getInfrastructureProjects(filters?: { isVisible?: boolean }): Promise<InfrastructureProject[]>;
  createInfrastructureProject(project: InsertInfrastructureProject): Promise<InfrastructureProject>;
  updateInfrastructureProject(id: number, data: Partial<InsertInfrastructureProject>): Promise<InfrastructureProject | undefined>;
  deleteInfrastructureProject(id: number): Promise<boolean>;

  // Web Intelligence - Legal Disputes
  getLegalDisputes(filters?: { locality?: string; isVisible?: boolean }): Promise<LegalDispute[]>;
  createLegalDispute(dispute: InsertLegalDispute): Promise<LegalDispute>;
  updateLegalDispute(id: number, data: Partial<InsertLegalDispute>): Promise<LegalDispute | undefined>;
  deleteLegalDispute(id: number): Promise<boolean>;

  // Web Intelligence - Market Intelligence
  getMarketIntelligence(filters?: { locality?: string; isVisible?: boolean }): Promise<MarketIntelligence[]>;
  createMarketIntelligence(report: InsertMarketIntelligence): Promise<MarketIntelligence>;
  updateMarketIntelligence(id: number, data: Partial<InsertMarketIntelligence>): Promise<MarketIntelligence | undefined>;

  // Web Intelligence - Sentiment Snapshots
  getSentimentSnapshots(filters?: { locality?: string; isVisible?: boolean }): Promise<SentimentSnapshot[]>;
  createSentimentSnapshot(snapshot: InsertSentimentSnapshot): Promise<SentimentSnapshot>;
  updateSentimentSnapshot(id: number, data: Partial<InsertSentimentSnapshot>): Promise<SentimentSnapshot | undefined>;

  // Web Intelligence - Jobs
  getIntelligenceJobs(sourceId?: number): Promise<IntelligenceJob[]>;
  createIntelligenceJob(job: InsertIntelligenceJob): Promise<IntelligenceJob>;
  updateIntelligenceJob(id: number, data: Partial<InsertIntelligenceJob>): Promise<IntelligenceJob | undefined>;

  // Web Intelligence - Schedule Settings
  getIntelligenceScheduleSettings(): Promise<IntelligenceScheduleSettings | undefined>;
  updateIntelligenceScheduleSettings(data: Partial<InsertIntelligenceScheduleSettings>): Promise<IntelligenceScheduleSettings>;

  // Engagement - Price Predictions
  getPricePredictions(locality?: string): Promise<PricePrediction[]>;
  getPricePrediction(id: number): Promise<PricePrediction | undefined>;
  createPricePrediction(prediction: InsertPricePrediction): Promise<PricePrediction>;
  updatePricePrediction(id: number, data: Partial<InsertPricePrediction>): Promise<PricePrediction | undefined>;

  // Engagement - User Watchlist
  getWatchlistBySession(sessionId: string): Promise<UserWatchlistItem[]>;
  getWatchlistByEmail(email: string): Promise<UserWatchlistItem[]>;
  addToWatchlist(item: InsertUserWatchlistItem): Promise<UserWatchlistItem>;
  updateWatchlistItem(id: number, data: Partial<InsertUserWatchlistItem>): Promise<UserWatchlistItem | undefined>;
  removeFromWatchlist(id: number): Promise<boolean>;
  isLocalityInWatchlist(sessionId: string, localityName: string): Promise<boolean>;

  // Engagement - Price Alerts
  getPriceAlerts(sessionId: string): Promise<PriceAlert[]>;
  getPriceAlertsByEmail(email: string): Promise<PriceAlert[]>;
  createPriceAlert(alert: InsertPriceAlert): Promise<PriceAlert>;
  updatePriceAlert(id: number, data: Partial<InsertPriceAlert>): Promise<PriceAlert | undefined>;
  deletePriceAlert(id: number): Promise<boolean>;
  getActiveAlertsForLocality(localityName: string): Promise<PriceAlert[]>;

  // Price Index Snapshot
  getPriceIndexData(): Promise<PriceIndexEntry[]>;
}

export interface PriceIndexEntry {
  id: number;
  name: string;
  slug: string;
  growthScore: number;
  riskScore: number;
  zone: 'green' | 'red' | 'blue' | 'gray';
  avgPrice: number | null;
  growthPercent: number;
  riskFactors: string[];
  growthFactors: string[];
}

export class DatabaseStorage implements IStorage {
  // ============ USERS & AUTH ============
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createSession(userId: string, token: string, expiresAt: Date): Promise<void> {
    await db.insert(sessions).values({ userId, token, expiresAt });
  }

  async getSession(token: string): Promise<{ userId: string; expiresAt: Date } | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.token, token));
    if (!session) return undefined;
    return { userId: session.userId, expiresAt: session.expiresAt };
  }

  async deleteSession(token: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.token, token));
  }

  // ============ PROPERTIES ============
  async getProperties(filters?: { locality?: string; type?: string; minPrice?: number; maxPrice?: number }): Promise<Property[]> {
    let query = db.select().from(properties);
    
    const conditions = [];
    if (filters?.locality) {
      conditions.push(ilike(properties.locality, `%${filters.locality}%`));
    }
    if (filters?.type) {
      conditions.push(eq(properties.type, filters.type));
    }
    if (filters?.minPrice) {
      conditions.push(gte(properties.priceNumeric, filters.minPrice));
    }
    if (filters?.maxPrice) {
      conditions.push(lte(properties.priceNumeric, filters.maxPrice));
    }

    if (conditions.length > 0) {
      return await db.select().from(properties).where(and(...conditions)).orderBy(desc(properties.postedAt));
    }
    return await db.select().from(properties).orderBy(desc(properties.postedAt));
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [prop] = await db.select().from(properties).where(eq(properties.id, id));
    return prop;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [prop] = await db.insert(properties).values(insertProperty).returning();
    return prop;
  }

  async updateProperty(id: number, data: Partial<InsertProperty>): Promise<Property | undefined> {
    const [prop] = await db.update(properties).set({ ...data, updatedAt: new Date() }).where(eq(properties.id, id)).returning();
    return prop;
  }

  async deleteProperty(id: number): Promise<boolean> {
    const result = await db.delete(properties).where(eq(properties.id, id));
    return true;
  }

  async getPropertyStats(): Promise<{ total: number; verified: number; byLocality: Record<string, number> }> {
    const allProps = await db.select().from(properties);
    const verified = allProps.filter((p: Property) => p.isVerified).length;
    const byLocality: Record<string, number> = {};
    allProps.forEach((p: Property) => {
      byLocality[p.locality] = (byLocality[p.locality] || 0) + 1;
    });
    return { total: allProps.length, verified, byLocality };
  }

  // ============ LEADS ============
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async getLeads(filters?: { status?: string; source?: string }): Promise<Lead[]> {
    const conditions = [];
    if (filters?.status) {
      conditions.push(eq(leads.status, filters.status));
    }
    if (filters?.source) {
      conditions.push(eq(leads.source, filters.source));
    }

    if (conditions.length > 0) {
      return await db.select().from(leads).where(and(...conditions)).orderBy(desc(leads.createdAt));
    }
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async updateLead(id: number, data: Partial<InsertLead>): Promise<Lead | undefined> {
    const [lead] = await db.update(leads).set({ ...data, updatedAt: new Date() }).where(eq(leads.id, id)).returning();
    return lead;
  }

  async deleteLead(id: number): Promise<boolean> {
    await db.delete(leads).where(eq(leads.id, id));
    return true;
  }

  async getLeadStats(): Promise<{ total: number; byStatus: Record<string, number>; bySource: Record<string, number> }> {
    const allLeads = await db.select().from(leads);
    const byStatus: Record<string, number> = {};
    const bySource: Record<string, number> = {};
    allLeads.forEach((l: Lead) => {
      byStatus[l.status || 'new'] = (byStatus[l.status || 'new'] || 0) + 1;
      bySource[l.source || 'website'] = (bySource[l.source || 'website'] || 0) + 1;
    });
    return { total: allLeads.length, byStatus, bySource };
  }

  // ============ LOCALITIES ============
  async getLocalities(): Promise<Locality[]> {
    return await db.select().from(localities).orderBy(localities.name);
  }

  async getLocality(id: number): Promise<Locality | undefined> {
    const [loc] = await db.select().from(localities).where(eq(localities.id, id));
    return loc;
  }

  async getLocalityBySlug(slug: string): Promise<Locality | undefined> {
    const [loc] = await db.select().from(localities).where(eq(localities.slug, slug));
    return loc;
  }

  async createLocality(insertLocality: InsertLocality): Promise<Locality> {
    const [loc] = await db.insert(localities).values(insertLocality).returning();
    return loc;
  }

  async updateLocality(id: number, data: Partial<InsertLocality>): Promise<Locality | undefined> {
    const [loc] = await db.update(localities).set({ ...data, updatedAt: new Date() }).where(eq(localities.id, id)).returning();
    return loc;
  }

  // ============ BUYER EVENTS ============
  async trackEvent(event: InsertBuyerEvent): Promise<BuyerEvent> {
    const [evt] = await db.insert(buyerEvents).values(event).returning();
    return evt;
  }

  async getEventsBySession(sessionId: string): Promise<BuyerEvent[]> {
    return await db.select().from(buyerEvents).where(eq(buyerEvents.sessionId, sessionId)).orderBy(desc(buyerEvents.createdAt));
  }

  async getEventStats(days: number): Promise<{ eventCounts: Record<string, number>; topProperties: number[]; topLocalities: number[] }> {
    const since = new Date();
    since.setDate(since.getDate() - days);
    
    const events = await db.select().from(buyerEvents).where(gte(buyerEvents.createdAt, since));
    
    const eventCounts: Record<string, number> = {};
    const propertyCounts: Record<number, number> = {};
    const localityCounts: Record<number, number> = {};

    events.forEach((e: BuyerEvent) => {
      eventCounts[e.eventType] = (eventCounts[e.eventType] || 0) + 1;
      if (e.propertyId) {
        propertyCounts[e.propertyId] = (propertyCounts[e.propertyId] || 0) + 1;
      }
      if (e.localityId) {
        localityCounts[e.localityId] = (localityCounts[e.localityId] || 0) + 1;
      }
    });

    const topProperties = Object.entries(propertyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([id]) => parseInt(id));

    const topLocalities = Object.entries(localityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([id]) => parseInt(id));

    return { eventCounts, topProperties, topLocalities };
  }

  // ============ SEARCH REQUIREMENTS ============
  async createSearchRequirement(insertReq: InsertSearchRequirement): Promise<SearchRequirement> {
    const [req] = await db.insert(searchRequirements).values(insertReq).returning();
    return req;
  }

  async getLatestRequirementBySession(sessionId: string): Promise<SearchRequirement | undefined> {
    const [req] = await db
      .select()
      .from(searchRequirements)
      .where(eq(searchRequirements.sessionId, sessionId))
      .orderBy(desc(searchRequirements.createdAt))
      .limit(1);
    return req;
  }

  async getSearchRequirements(): Promise<SearchRequirement[]> {
    return await db.select().from(searchRequirements).orderBy(desc(searchRequirements.createdAt));
  }

  // ============ CAMPAIGNS ============
  async getCampaigns(): Promise<Campaign[]> {
    return await db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    const [camp] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return camp;
  }

  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const [camp] = await db.insert(campaigns).values(campaign).returning();
    return camp;
  }

  async updateCampaign(id: number, data: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const [camp] = await db.update(campaigns).set({ ...data, updatedAt: new Date() }).where(eq(campaigns.id, id)).returning();
    return camp;
  }

  async deleteCampaign(id: number): Promise<boolean> {
    await db.delete(campaigns).where(eq(campaigns.id, id));
    return true;
  }

  // ============ SCRAPING ============
  async getScrapingSources(): Promise<ScrapingSource[]> {
    return await db.select().from(scrapingSources).orderBy(scrapingSources.name);
  }

  async getScrapingSource(id: number): Promise<ScrapingSource | undefined> {
    const [src] = await db.select().from(scrapingSources).where(eq(scrapingSources.id, id));
    return src;
  }

  async createScrapingSource(source: InsertScrapingSource): Promise<ScrapingSource> {
    const [src] = await db.insert(scrapingSources).values(source).returning();
    return src;
  }

  async updateScrapingSource(id: number, data: Partial<InsertScrapingSource>): Promise<ScrapingSource | undefined> {
    const [src] = await db.update(scrapingSources).set(data).where(eq(scrapingSources.id, id)).returning();
    return src;
  }

  async deleteScrapingSource(id: number): Promise<boolean> {
    await db.delete(scrapingSources).where(eq(scrapingSources.id, id));
    return true;
  }

  async getScrapingJobs(sourceId?: number): Promise<ScrapingJob[]> {
    if (sourceId) {
      return await db.select().from(scrapingJobs).where(eq(scrapingJobs.sourceId, sourceId)).orderBy(desc(scrapingJobs.createdAt));
    }
    return await db.select().from(scrapingJobs).orderBy(desc(scrapingJobs.createdAt));
  }

  async createScrapingJob(job: InsertScrapingJob): Promise<ScrapingJob> {
    const [j] = await db.insert(scrapingJobs).values(job).returning();
    return j;
  }

  async updateScrapingJob(id: number, data: Partial<InsertScrapingJob>): Promise<ScrapingJob | undefined> {
    const [j] = await db.update(scrapingJobs).set(data).where(eq(scrapingJobs.id, id)).returning();
    return j;
  }

  // ============ BLOG ============
  async getBlogPosts(onlyPublished = false): Promise<BlogPost[]> {
    if (onlyPublished) {
      return await db.select().from(blogPosts).where(eq(blogPosts.isPublished, true)).orderBy(desc(blogPosts.publishedAt));
    }
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [p] = await db.insert(blogPosts).values(post).returning();
    return p;
  }

  async updateBlogPost(id: number, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [p] = await db.update(blogPosts).set({ ...data, updatedAt: new Date() }).where(eq(blogPosts.id, id)).returning();
    return p;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  }

  async incrementBlogViews(id: number): Promise<void> {
    await db.update(blogPosts)
      .set({ viewsCount: sql`COALESCE(${blogPosts.viewsCount}, 0) + 1` })
      .where(eq(blogPosts.id, id));
  }

  // ============ BLOG NOTIFICATIONS ============
  async getActiveNotifications(targetPage?: string): Promise<BlogNotification[]> {
    const conditions = [eq(blogNotifications.isActive, true)];
    if (targetPage) {
      conditions.push(eq(blogNotifications.targetPage, targetPage));
    }
    return await db.select().from(blogNotifications)
      .where(and(...conditions))
      .orderBy(desc(blogNotifications.publishedAt));
  }

  async createBlogNotification(notification: InsertBlogNotification): Promise<BlogNotification> {
    const [n] = await db.insert(blogNotifications).values(notification).returning();
    return n;
  }

  async updateBlogNotification(id: number, data: Partial<InsertBlogNotification>): Promise<BlogNotification | undefined> {
    const [n] = await db.update(blogNotifications).set(data).where(eq(blogNotifications.id, id)).returning();
    return n;
  }

  async incrementNotificationClicks(id: number): Promise<void> {
    await db.update(blogNotifications)
      .set({ clicksCount: sql`COALESCE(${blogNotifications.clicksCount}, 0) + 1` })
      .where(eq(blogNotifications.id, id));
  }

  async deactivateNotification(id: number): Promise<void> {
    await db.update(blogNotifications)
      .set({ isActive: false })
      .where(eq(blogNotifications.id, id));
  }

  // ============ AI INSIGHTS ============
  async createInsight(insight: InsertAiInsight): Promise<AiInsight> {
    const [ins] = await db.insert(aiInsights).values(insight).returning();
    return ins;
  }

  async getInsights(sessionId?: string): Promise<AiInsight[]> {
    if (sessionId) {
      return await db.select().from(aiInsights).where(eq(aiInsights.sessionId, sessionId)).orderBy(desc(aiInsights.createdAt));
    }
    return await db.select().from(aiInsights).orderBy(desc(aiInsights.createdAt));
  }

  async getRecentInsights(limit: number): Promise<AiInsight[]> {
    return await db.select().from(aiInsights).orderBy(desc(aiInsights.createdAt)).limit(limit);
  }

  // ============ WEB INTELLIGENCE - SOURCES ============
  async getIntelligenceSources(type?: string): Promise<IntelligenceSource[]> {
    if (type) {
      return await db.select().from(intelligenceSources).where(eq(intelligenceSources.type, type)).orderBy(intelligenceSources.name);
    }
    return await db.select().from(intelligenceSources).orderBy(intelligenceSources.name);
  }

  async getIntelligenceSource(id: number): Promise<IntelligenceSource | undefined> {
    const [source] = await db.select().from(intelligenceSources).where(eq(intelligenceSources.id, id));
    return source;
  }

  async createIntelligenceSource(source: InsertIntelligenceSource): Promise<IntelligenceSource> {
    const [s] = await db.insert(intelligenceSources).values(source).returning();
    return s;
  }

  async updateIntelligenceSource(id: number, data: Partial<InsertIntelligenceSource>): Promise<IntelligenceSource | undefined> {
    const [s] = await db.update(intelligenceSources).set(data).where(eq(intelligenceSources.id, id)).returning();
    return s;
  }

  async deleteIntelligenceSource(id: number): Promise<boolean> {
    await db.delete(intelligenceSources).where(eq(intelligenceSources.id, id));
    return true;
  }

  // ============ WEB INTELLIGENCE - NEWS ARTICLES ============
  async getNewsArticles(filters?: { locality?: string; isVisible?: boolean; limit?: number }): Promise<NewsArticle[]> {
    const conditions = [];
    if (filters?.locality) {
      conditions.push(eq(newsArticles.locality, filters.locality));
    }
    if (filters?.isVisible !== undefined) {
      conditions.push(eq(newsArticles.isVisible, filters.isVisible));
    }

    let query = db.select().from(newsArticles);
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    query = query.orderBy(desc(newsArticles.scrapedAt)) as any;
    if (filters?.limit) {
      query = query.limit(filters.limit) as any;
    }
    return await query;
  }

  async createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle> {
    const [a] = await db.insert(newsArticles).values(article).returning();
    return a;
  }

  async updateNewsArticle(id: number, data: Partial<InsertNewsArticle>): Promise<NewsArticle | undefined> {
    const [a] = await db.update(newsArticles).set(data).where(eq(newsArticles.id, id)).returning();
    return a;
  }

  async deleteNewsArticle(id: number): Promise<boolean> {
    await db.delete(newsArticles).where(eq(newsArticles.id, id));
    return true;
  }

  // ============ WEB INTELLIGENCE - SOCIAL POSTS ============
  async getSocialPosts(filters?: { platform?: string; isVisible?: boolean; limit?: number }): Promise<SocialPost[]> {
    const conditions = [];
    if (filters?.platform) {
      conditions.push(eq(socialPosts.platform, filters.platform));
    }
    if (filters?.isVisible !== undefined) {
      conditions.push(eq(socialPosts.isVisible, filters.isVisible));
    }

    let query = db.select().from(socialPosts);
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    query = query.orderBy(desc(socialPosts.scrapedAt)) as any;
    if (filters?.limit) {
      query = query.limit(filters.limit) as any;
    }
    return await query;
  }

  async createSocialPost(post: InsertSocialPost): Promise<SocialPost> {
    const [p] = await db.insert(socialPosts).values(post).returning();
    return p;
  }

  async updateSocialPost(id: number, data: Partial<InsertSocialPost>): Promise<SocialPost | undefined> {
    const [p] = await db.update(socialPosts).set(data).where(eq(socialPosts.id, id)).returning();
    return p;
  }

  async deleteSocialPost(id: number): Promise<boolean> {
    await db.delete(socialPosts).where(eq(socialPosts.id, id));
    return true;
  }

  // ============ WEB INTELLIGENCE - JOB LISTINGS ============
  async getJobListings(filters?: { locality?: string; isVisible?: boolean; limit?: number }): Promise<JobListing[]> {
    const conditions = [];
    if (filters?.locality) {
      conditions.push(eq(jobListings.locality, filters.locality));
    }
    if (filters?.isVisible !== undefined) {
      conditions.push(eq(jobListings.isVisible, filters.isVisible));
    }

    let query = db.select().from(jobListings);
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    query = query.orderBy(desc(jobListings.scrapedAt)) as any;
    if (filters?.limit) {
      query = query.limit(filters.limit) as any;
    }
    return await query;
  }

  async createJobListing(job: InsertJobListing): Promise<JobListing> {
    const [j] = await db.insert(jobListings).values(job).returning();
    return j;
  }

  async updateJobListing(id: number, data: Partial<InsertJobListing>): Promise<JobListing | undefined> {
    const [j] = await db.update(jobListings).set(data).where(eq(jobListings.id, id)).returning();
    return j;
  }

  async deleteJobListing(id: number): Promise<boolean> {
    await db.delete(jobListings).where(eq(jobListings.id, id));
    return true;
  }

  // ============ WEB INTELLIGENCE - INFRASTRUCTURE PROJECTS ============
  async getInfrastructureProjects(filters?: { isVisible?: boolean }): Promise<InfrastructureProject[]> {
    if (filters?.isVisible !== undefined) {
      return await db.select().from(infrastructureProjects)
        .where(eq(infrastructureProjects.isVisible, filters.isVisible))
        .orderBy(desc(infrastructureProjects.lastUpdatedAt));
    }
    return await db.select().from(infrastructureProjects).orderBy(desc(infrastructureProjects.lastUpdatedAt));
  }

  async createInfrastructureProject(project: InsertInfrastructureProject): Promise<InfrastructureProject> {
    const [p] = await db.insert(infrastructureProjects).values(project).returning();
    return p;
  }

  async updateInfrastructureProject(id: number, data: Partial<InsertInfrastructureProject>): Promise<InfrastructureProject | undefined> {
    const [p] = await db.update(infrastructureProjects).set({ ...data, lastUpdatedAt: new Date() }).where(eq(infrastructureProjects.id, id)).returning();
    return p;
  }

  async deleteInfrastructureProject(id: number): Promise<boolean> {
    await db.delete(infrastructureProjects).where(eq(infrastructureProjects.id, id));
    return true;
  }

  // ============ WEB INTELLIGENCE - LEGAL DISPUTES ============
  async getLegalDisputes(filters?: { locality?: string; isVisible?: boolean }): Promise<LegalDispute[]> {
    const conditions = [];
    if (filters?.locality) {
      conditions.push(eq(legalDisputes.locality, filters.locality));
    }
    if (filters?.isVisible !== undefined) {
      conditions.push(eq(legalDisputes.isVisible, filters.isVisible));
    }

    if (conditions.length > 0) {
      return await db.select().from(legalDisputes).where(and(...conditions)).orderBy(desc(legalDisputes.lastUpdatedAt));
    }
    return await db.select().from(legalDisputes).orderBy(desc(legalDisputes.lastUpdatedAt));
  }

  async createLegalDispute(dispute: InsertLegalDispute): Promise<LegalDispute> {
    const [d] = await db.insert(legalDisputes).values(dispute).returning();
    return d;
  }

  async updateLegalDispute(id: number, data: Partial<InsertLegalDispute>): Promise<LegalDispute | undefined> {
    const [d] = await db.update(legalDisputes).set({ ...data, lastUpdatedAt: new Date() }).where(eq(legalDisputes.id, id)).returning();
    return d;
  }

  async deleteLegalDispute(id: number): Promise<boolean> {
    await db.delete(legalDisputes).where(eq(legalDisputes.id, id));
    return true;
  }

  // ============ WEB INTELLIGENCE - MARKET INTELLIGENCE ============
  async getMarketIntelligence(filters?: { locality?: string; isVisible?: boolean }): Promise<MarketIntelligence[]> {
    const conditions = [];
    if (filters?.locality) {
      conditions.push(eq(marketIntelligence.locality, filters.locality));
    }
    if (filters?.isVisible !== undefined) {
      conditions.push(eq(marketIntelligence.isVisible, filters.isVisible));
    }

    if (conditions.length > 0) {
      return await db.select().from(marketIntelligence).where(and(...conditions)).orderBy(desc(marketIntelligence.reportDate));
    }
    return await db.select().from(marketIntelligence).orderBy(desc(marketIntelligence.reportDate));
  }

  async createMarketIntelligence(report: InsertMarketIntelligence): Promise<MarketIntelligence> {
    const [r] = await db.insert(marketIntelligence).values(report).returning();
    return r;
  }

  async updateMarketIntelligence(id: number, data: Partial<InsertMarketIntelligence>): Promise<MarketIntelligence | undefined> {
    const [r] = await db.update(marketIntelligence).set(data).where(eq(marketIntelligence.id, id)).returning();
    return r;
  }

  // ============ WEB INTELLIGENCE - SENTIMENT SNAPSHOTS ============
  async getSentimentSnapshots(filters?: { locality?: string; isVisible?: boolean }): Promise<SentimentSnapshot[]> {
    const conditions = [];
    if (filters?.locality) {
      conditions.push(eq(sentimentSnapshots.locality, filters.locality));
    }
    if (filters?.isVisible !== undefined) {
      conditions.push(eq(sentimentSnapshots.isVisible, filters.isVisible));
    }

    if (conditions.length > 0) {
      return await db.select().from(sentimentSnapshots).where(and(...conditions)).orderBy(desc(sentimentSnapshots.snapshotDate));
    }
    return await db.select().from(sentimentSnapshots).orderBy(desc(sentimentSnapshots.snapshotDate));
  }

  async createSentimentSnapshot(snapshot: InsertSentimentSnapshot): Promise<SentimentSnapshot> {
    const [s] = await db.insert(sentimentSnapshots).values(snapshot).returning();
    return s;
  }

  async updateSentimentSnapshot(id: number, data: Partial<InsertSentimentSnapshot>): Promise<SentimentSnapshot | undefined> {
    const [s] = await db.update(sentimentSnapshots).set(data).where(eq(sentimentSnapshots.id, id)).returning();
    return s;
  }

  // ============ WEB INTELLIGENCE - JOBS ============
  async getIntelligenceJobs(sourceId?: number): Promise<IntelligenceJob[]> {
    if (sourceId) {
      return await db.select().from(intelligenceJobs).where(eq(intelligenceJobs.sourceId, sourceId)).orderBy(desc(intelligenceJobs.createdAt));
    }
    return await db.select().from(intelligenceJobs).orderBy(desc(intelligenceJobs.createdAt));
  }

  async createIntelligenceJob(job: InsertIntelligenceJob): Promise<IntelligenceJob> {
    const [j] = await db.insert(intelligenceJobs).values(job).returning();
    return j;
  }

  async updateIntelligenceJob(id: number, data: Partial<InsertIntelligenceJob>): Promise<IntelligenceJob | undefined> {
    const [j] = await db.update(intelligenceJobs).set(data).where(eq(intelligenceJobs.id, id)).returning();
    return j;
  }

  // ============ WEB INTELLIGENCE - SCHEDULE SETTINGS ============
  async getIntelligenceScheduleSettings(): Promise<IntelligenceScheduleSettings | undefined> {
    const [settings] = await db.select().from(intelligenceScheduleSettings).limit(1);
    return settings;
  }

  async updateIntelligenceScheduleSettings(data: Partial<InsertIntelligenceScheduleSettings>): Promise<IntelligenceScheduleSettings> {
    const existing = await this.getIntelligenceScheduleSettings();
    if (existing) {
      const [updated] = await db.update(intelligenceScheduleSettings)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(intelligenceScheduleSettings.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(intelligenceScheduleSettings).values(data as InsertIntelligenceScheduleSettings).returning();
      return created;
    }
  }

  // ============ ENGAGEMENT - PRICE PREDICTIONS ============
  async getPricePredictions(locality?: string): Promise<PricePrediction[]> {
    if (locality) {
      return await db.select().from(pricePredictions)
        .where(and(eq(pricePredictions.locality, locality), eq(pricePredictions.isActive, true)))
        .orderBy(desc(pricePredictions.generatedAt));
    }
    return await db.select().from(pricePredictions)
      .where(eq(pricePredictions.isActive, true))
      .orderBy(desc(pricePredictions.generatedAt));
  }

  async getPricePrediction(id: number): Promise<PricePrediction | undefined> {
    const [prediction] = await db.select().from(pricePredictions).where(eq(pricePredictions.id, id));
    return prediction;
  }

  async createPricePrediction(prediction: InsertPricePrediction): Promise<PricePrediction> {
    const [p] = await db.insert(pricePredictions).values(prediction).returning();
    return p;
  }

  async updatePricePrediction(id: number, data: Partial<InsertPricePrediction>): Promise<PricePrediction | undefined> {
    const [p] = await db.update(pricePredictions).set(data).where(eq(pricePredictions.id, id)).returning();
    return p;
  }

  // ============ ENGAGEMENT - USER WATCHLIST ============
  async getWatchlistBySession(sessionId: string): Promise<UserWatchlistItem[]> {
    return await db.select().from(userWatchlist)
      .where(eq(userWatchlist.sessionId, sessionId))
      .orderBy(desc(userWatchlist.createdAt));
  }

  async getWatchlistByEmail(email: string): Promise<UserWatchlistItem[]> {
    return await db.select().from(userWatchlist)
      .where(eq(userWatchlist.email, email))
      .orderBy(desc(userWatchlist.createdAt));
  }

  async addToWatchlist(item: InsertUserWatchlistItem): Promise<UserWatchlistItem> {
    const [w] = await db.insert(userWatchlist).values(item).returning();
    return w;
  }

  async updateWatchlistItem(id: number, data: Partial<InsertUserWatchlistItem>): Promise<UserWatchlistItem | undefined> {
    const [w] = await db.update(userWatchlist).set({ ...data, updatedAt: new Date() }).where(eq(userWatchlist.id, id)).returning();
    return w;
  }

  async removeFromWatchlist(id: number): Promise<boolean> {
    await db.delete(userWatchlist).where(eq(userWatchlist.id, id));
    return true;
  }

  async isLocalityInWatchlist(sessionId: string, localityName: string): Promise<boolean> {
    const [item] = await db.select().from(userWatchlist)
      .where(and(eq(userWatchlist.sessionId, sessionId), eq(userWatchlist.localityName, localityName)));
    return !!item;
  }

  // ============ ENGAGEMENT - PRICE ALERTS ============
  async getPriceAlerts(sessionId: string): Promise<PriceAlert[]> {
    return await db.select().from(priceAlerts)
      .where(eq(priceAlerts.sessionId, sessionId))
      .orderBy(desc(priceAlerts.createdAt));
  }

  async getPriceAlertsByEmail(email: string): Promise<PriceAlert[]> {
    return await db.select().from(priceAlerts)
      .where(eq(priceAlerts.email, email))
      .orderBy(desc(priceAlerts.createdAt));
  }

  async createPriceAlert(alert: InsertPriceAlert): Promise<PriceAlert> {
    const [a] = await db.insert(priceAlerts).values(alert).returning();
    return a;
  }

  async updatePriceAlert(id: number, data: Partial<InsertPriceAlert>): Promise<PriceAlert | undefined> {
    const [a] = await db.update(priceAlerts).set(data).where(eq(priceAlerts.id, id)).returning();
    return a;
  }

  async deletePriceAlert(id: number): Promise<boolean> {
    await db.delete(priceAlerts).where(eq(priceAlerts.id, id));
    return true;
  }

  async getActiveAlertsForLocality(localityName: string): Promise<PriceAlert[]> {
    return await db.select().from(priceAlerts)
      .where(and(eq(priceAlerts.localityName, localityName), eq(priceAlerts.isActive, true)))
      .orderBy(desc(priceAlerts.createdAt));
  }

  // ============ PRICE INDEX SNAPSHOT ============
  async getPriceIndexData(): Promise<PriceIndexEntry[]> {
    const allLocalities = await this.getLocalities();
    const allDisputes = await this.getLegalDisputes({});
    const allProjects = await this.getInfrastructureProjects({});
    const allPredictions = await this.getPricePredictions();

    const entries: PriceIndexEntry[] = [];

    for (const locality of allLocalities) {
      const localityName = locality.name.toLowerCase();
      
      // Calculate growth score (0-100) based on predictions and market data
      const predictions = allPredictions.filter(p => 
        p.locality.toLowerCase() === localityName
      );
      const latestPrediction = predictions[0];
      
      let growthPercent = 0;
      let growthScore = 50; // Default neutral
      const avgPrice = locality.avgPrice ? parseFloat(locality.avgPrice) : null;
      const priceGrowth = locality.priceGrowth ? parseFloat(locality.priceGrowth) : null;
      
      if (latestPrediction && latestPrediction.currentPricePerSqft) {
        const avgPredicted = (latestPrediction.predictedPriceMin + latestPrediction.predictedPriceMax) / 2;
        growthPercent = ((avgPredicted - latestPrediction.currentPricePerSqft) / latestPrediction.currentPricePerSqft) * 100;
        growthScore = Math.min(100, Math.max(0, 50 + growthPercent * 2));
      } else if (priceGrowth !== null) {
        // Use stored price growth if available
        growthPercent = priceGrowth;
        growthScore = Math.min(100, Math.max(0, 50 + priceGrowth * 2));
      } else if (locality.infrastructureScore) {
        // Estimate based on infrastructure score
        growthScore = Math.min(100, locality.infrastructureScore * 10);
        growthPercent = (growthScore - 50) / 2;
      }

      // Calculate risk score (0-100) based on legal disputes and infrastructure delays
      const disputes = allDisputes.filter(d => 
        d.locality?.toLowerCase() === localityName ||
        d.locality?.toLowerCase().includes(localityName)
      );
      
      const projects = allProjects.filter(p =>
        p.affectedLocalities?.some(l => l.toLowerCase().includes(localityName)) ||
        p.projectName?.toLowerCase().includes(localityName)
      );

      const riskFactors: string[] = [];
      const growthFactors: string[] = [];
      let riskScore = 20; // Base risk

      // Legal dispute risk
      const unresolvedDisputes = disputes.filter(d => d.currentStatus !== 'resolved' && d.currentStatus !== 'dismissed');
      if (unresolvedDisputes.length > 0) {
        const severityWeight: Record<string, number> = { 'critical': 25, 'high': 15, 'medium': 8, 'low': 3 };
        for (const dispute of unresolvedDisputes) {
          riskScore += severityWeight[dispute.impactLevel || 'medium'] || 8;
          riskFactors.push(`${dispute.disputeType}: ${dispute.impactLevel} impact`);
        }
      }

      // Infrastructure project impact (currentStatus is completion percentage 0-100)
      const stalledProjects = projects.filter(p => (p.currentStatus || 0) > 0 && (p.currentStatus || 0) < 30);
      const activeProjects = projects.filter(p => (p.currentStatus || 0) >= 30);
      
      if (stalledProjects.length > 0) {
        riskScore += stalledProjects.length * 10;
        riskFactors.push(`${stalledProjects.length} stalled infrastructure project(s)`);
      }
      
      if (activeProjects.length > 0) {
        growthScore += activeProjects.length * 5;
        growthFactors.push(`${activeProjects.length} active infrastructure project(s)`);
      }

      // Cap scores
      riskScore = Math.min(100, Math.max(0, riskScore));
      growthScore = Math.min(100, Math.max(0, growthScore));

      // Determine zone based on thresholds
      let zone: 'green' | 'red' | 'blue' | 'gray';
      if (growthScore >= 60 && riskScore < 40) {
        zone = 'green'; // High growth, low risk - Best
      } else if (growthScore >= 60 && riskScore >= 40) {
        zone = 'red'; // High growth, high risk - Risky
      } else if (growthScore < 60 && riskScore < 40) {
        zone = 'blue'; // Low growth, low risk - Stable
      } else {
        zone = 'gray'; // Low growth, high risk - Avoid
      }

      entries.push({
        id: locality.id,
        name: locality.name,
        slug: locality.slug,
        growthScore,
        riskScore,
        zone,
        avgPrice,
        growthPercent: Math.round(growthPercent * 10) / 10,
        riskFactors,
        growthFactors
      });
    }

    return entries;
  }
}

export const storage = new DatabaseStorage();
