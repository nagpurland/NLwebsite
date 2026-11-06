import { pgTable, text, serial, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// ============ USERS & AUTH ============
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============ PROPERTIES ============
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  price: text("price").notNull(),
  priceNumeric: integer("price_numeric"),
  location: text("location").notNull(),
  locality: text("locality").notNull(),
  type: text("type").notNull(),
  bhk: text("bhk"),
  area: text("area").notNull(),
  areaNumeric: integer("area_numeric"),
  source: text("source").notNull(),
  url: text("url").notNull(),
  description: text("description"),
  images: text("images").array(),
  isVerified: boolean("is_verified").default(false),
  verificationStatus: text("verification_status").default("pending"),
  legalStatus: text("legal_status"),
  amenities: text("amenities").array(),
  highlights: text("highlights").array(),
  riskScore: integer("risk_score"),
  investmentScore: integer("investment_score"),
  postedAt: timestamp("posted_at").defaultNow(),
  scrapedAt: timestamp("scraped_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============ LEADS ============
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  requirementType: text("requirement_type").notNull(),
  budget: text("budget"),
  locality: text("locality"),
  message: text("message"),
  status: text("status").default("new"),
  source: text("source").default("website"),
  interestedPropertyId: integer("interested_property_id"),
  intentScore: integer("intent_score").default(0),
  awarenessLevel: text("awareness_level").default("unaware"),
  notes: text("notes"),
  followUpDate: timestamp("follow_up_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============ LOCALITIES ============
export const localities = pgTable("localities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  avgPrice: text("avg_price"),
  priceGrowth: text("price_growth"),
  infrastructureScore: integer("infrastructure_score"),
  connectivityScore: integer("connectivity_score"),
  safetyScore: integer("safety_score"),
  amenitiesScore: integer("amenities_score"),
  highlights: text("highlights").array(),
  nearbyLandmarks: text("nearby_landmarks").array(),
  upcomingProjects: text("upcoming_projects").array(),
  investmentOutlook: text("investment_outlook"),
  riskFactors: text("risk_factors").array(),
  images: text("images").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============ BUYER EVENTS (for AI insights) ============
export const buyerEvents = pgTable("buyer_events", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  eventType: text("event_type").notNull(),
  eventData: jsonb("event_data"),
  propertyId: integer("property_id"),
  localityId: integer("locality_id"),
  pageUrl: text("page_url"),
  scrollDepth: integer("scroll_depth"),
  timeSpent: integer("time_spent"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============ SEARCH REQUIREMENTS ============
export const searchRequirements = pgTable("search_requirements", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  category: text("category").notNull(),
  timeline: text("timeline").notNull(),
  budget: text("budget"),
  preferredLocalities: text("preferred_localities").array(),
  propertyType: text("property_type"),
  insights: jsonb("insights"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============ CAMPAIGNS ============
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").default("draft"),
  targetAudience: text("target_audience"),
  content: text("content"),
  subject: text("subject"),
  scheduledAt: timestamp("scheduled_at"),
  sentAt: timestamp("sent_at"),
  openRate: integer("open_rate"),
  clickRate: integer("click_rate"),
  recipientCount: integer("recipient_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============ SCRAPING ============
export const scrapingSources = pgTable("scraping_sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  config: jsonb("config"),
  isActive: boolean("is_active").default(true),
  lastScrapedAt: timestamp("last_scraped_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const scrapingJobs = pgTable("scraping_jobs", {
  id: serial("id").primaryKey(),
  sourceId: integer("source_id").notNull(),
  status: text("status").default("pending"),
  propertiesFound: integer("properties_found").default(0),
  propertiesImported: integer("properties_imported").default(0),
  errors: text("errors").array(),
  logs: text("logs").array(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============ BLOG / CONTENT ============
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  metaDescription: text("meta_description"),
  author: text("author"),
  category: text("category"),
  contentType: text("content_type"), // 12-point-guide, case-study, market-trend, qa, legal-update, tips-hacks, recap
  locality: text("locality"),
  tone: text("tone").default("professional"), // casual, professional
  tags: text("tags").array(),
  featuredImage: text("featured_image"),
  status: text("status").default("draft"), // draft, generated, approved, scheduled, published
  aiProvider: text("ai_provider"), // gemini, perplexity
  aiCostUsd: text("ai_cost_usd"),
  scheduledAt: timestamp("scheduled_at"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  viewsCount: integer("views_count").default(0),
  clicksCount: integer("clicks_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============ BLOG NOTIFICATIONS ============
export const blogNotifications = pgTable("blog_notifications", {
  id: serial("id").primaryKey(),
  blogId: integer("blog_id").notNull(),
  notificationText: text("notification_text").notNull(),
  targetPage: text("target_page").default("/step-3-safety-check"), // where to show the notification
  isActive: boolean("is_active").default(true),
  clicksCount: integer("clicks_count").default(0),
  publishedAt: timestamp("published_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============ AI BUDGET TRACKING ============
export const aiBudgetTracking = pgTable("ai_budget_tracking", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(), // YYYY-MM format
  provider: text("provider").notNull(), // gemini, perplexity
  monthlyBudget: text("monthly_budget").default("5.00"),
  totalSpent: text("total_spent").default("0.00"),
  requestCount: integer("request_count").default(0),
  lastRequestAt: timestamp("last_request_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============ AI INSIGHTS ============
export const aiInsights = pgTable("ai_insights", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id"),
  insightType: text("insight_type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  data: jsonb("data"),
  confidence: integer("confidence"),
  actionTaken: text("action_taken"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============ WEB INTELLIGENCE ENGINE ============

// Intelligence Sources - manages all data sources for web intelligence
export const intelligenceSources = pgTable("intelligence_sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // news, social, jobs, infrastructure, legal
  category: text("category").notNull(), // direct_scrape, apify, api, manual
  url: text("url"),
  config: jsonb("config"), // API keys, selectors, keywords, etc.
  isActive: boolean("is_active").default(true),
  scrapeFrequency: text("scrape_frequency").default("daily"), // hourly, daily, weekly
  lastScrapedAt: timestamp("last_scraped_at"),
  itemsScraped: integer("items_scraped").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// News Articles scraped from news websites
export const newsArticles = pgTable("news_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  summary: text("summary"),
  source: text("source").notNull(),
  sourceUrl: text("source_url"),
  publishedAt: timestamp("published_at"),
  scrapedAt: timestamp("scraped_at").defaultNow(),
  category: text("category"), // Infrastructure, Jobs, Market, Legal, Policy
  locality: text("locality"), // MIHAN, Besa, Wardha Road, etc.
  sentiment: text("sentiment"), // Positive, Negative, Neutral
  impactLevel: text("impact_level"), // High, Medium, Low
  keywords: text("keywords").array(),
  isProcessed: boolean("is_processed").default(false),
  isVisible: boolean("is_visible").default(false), // Admin controls frontend visibility
  createdAt: timestamp("created_at").defaultNow(),
});

// Social Media Posts from Twitter, Reddit, Facebook, LinkedIn
export const socialPosts = pgTable("social_posts", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(), // Twitter, Reddit, Facebook, LinkedIn
  author: text("author"),
  content: text("content").notNull(),
  postUrl: text("post_url"),
  postedAt: timestamp("posted_at"),
  scrapedAt: timestamp("scraped_at").defaultNow(),
  engagement: jsonb("engagement"), // likes, shares, comments, retweets
  sentiment: text("sentiment"), // Bullish, Bearish, Neutral
  topic: text("topic"), // Prices, Metro, Jobs, Legal, Infrastructure
  localityMentioned: text("locality_mentioned"),
  isViral: boolean("is_viral").default(false),
  isProcessed: boolean("is_processed").default(false),
  isVisible: boolean("is_visible").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Job Listings from LinkedIn, Naukri, company websites
export const jobListings = pgTable("job_listings", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  jobTitle: text("job_title").notNull(),
  jobCategory: text("job_category"), // IT, Manufacturing, Services, Retail
  numberOfOpenings: integer("number_of_openings").default(1),
  salaryRange: text("salary_range"),
  location: text("location"),
  locality: text("locality"),
  jobSource: text("job_source"), // LinkedIn, Naukri, Company Website
  jobUrl: text("job_url"),
  postedAt: timestamp("posted_at"),
  scrapedAt: timestamp("scraped_at").defaultNow(),
  isActive: boolean("is_active").default(true),
  isProcessed: boolean("is_processed").default(false),
  isVisible: boolean("is_visible").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Infrastructure Projects tracking
export const infrastructureProjects = pgTable("infrastructure_projects", {
  id: serial("id").primaryKey(),
  projectName: text("project_name").notNull(),
  projectType: text("project_type"), // Metro, Road, IT Park, Mall, Hospital
  currentStatus: integer("current_status").default(0), // % completed
  timelineMonths: integer("timeline_months"),
  launchDate: timestamp("launch_date"),
  affectedLocalities: text("affected_localities").array(),
  expectedJobImpact: integer("expected_job_impact"),
  expectedAppreciation: text("expected_appreciation"), // % price increase expected
  investmentAmount: text("investment_amount"),
  source: text("source"),
  sourceUrl: text("source_url"),
  lastUpdatedAt: timestamp("last_updated_at").defaultNow(),
  isProcessed: boolean("is_processed").default(false),
  isVisible: boolean("is_visible").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Legal Disputes and violations tracking
export const legalDisputes = pgTable("legal_disputes", {
  id: serial("id").primaryKey(),
  disputeType: text("dispute_type").notNull(), // Land Dispute, Title Issue, Encroachment, Environmental
  locality: text("locality").notNull(),
  caseNumber: text("case_number"),
  filedAt: timestamp("filed_at"),
  currentStatus: text("current_status"), // Pending, Resolved, Dismissed
  description: text("description"),
  impactLevel: text("impact_level"), // High, Medium, Low
  source: text("source"),
  sourceUrl: text("source_url"),
  lastUpdatedAt: timestamp("last_updated_at").defaultNow(),
  isProcessed: boolean("is_processed").default(false),
  isVisible: boolean("is_visible").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Market Intelligence Reports generated daily per locality
export const marketIntelligence = pgTable("market_intelligence", {
  id: serial("id").primaryKey(),
  reportDate: timestamp("report_date").notNull(),
  locality: text("locality").notNull(),
  marketTemperature: text("market_temperature"), // HOT, WARM, COOLING
  priceTrend30d: integer("price_trend_30d"), // % change
  priceTrend90d: integer("price_trend_90d"),
  avgPrice: integer("avg_price"),
  avgPricePerSqft: integer("avg_price_per_sqft"),
  newListingsCount: integer("new_listings_count"),
  delistedCount: integer("delisted_count"),
  daysToSellAvg: integer("days_to_sell_avg"),
  employmentJobsCount: integer("employment_jobs_count"),
  employmentTrend: text("employment_trend"), // Increasing, Stable, Decreasing
  infrastructureStatus: jsonb("infrastructure_status"), // array of projects
  newsSentimentPositive: integer("news_sentiment_positive"),
  newsSentimentNegative: integer("news_sentiment_negative"),
  newsSentimentNeutral: integer("news_sentiment_neutral"),
  socialSentiment: text("social_sentiment"), // Bullish, Bearish, Neutral
  legalDisputesCount: integer("legal_disputes_count"),
  buyingClarityScore: integer("buying_clarity_score"), // 1-10
  verdict: text("verdict"),
  isVisible: boolean("is_visible").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Sentiment Snapshots - daily aggregate sentiment tracking
export const sentimentSnapshots = pgTable("sentiment_snapshots", {
  id: serial("id").primaryKey(),
  snapshotDate: timestamp("snapshot_date").notNull(),
  locality: text("locality"), // null for city-wide
  newsPositiveCount: integer("news_positive_count").default(0),
  newsNegativeCount: integer("news_negative_count").default(0),
  newsNeutralCount: integer("news_neutral_count").default(0),
  socialBullishCount: integer("social_bullish_count").default(0),
  socialBearishCount: integer("social_bearish_count").default(0),
  socialNeutralCount: integer("social_neutral_count").default(0),
  overallSentiment: text("overall_sentiment"), // Bullish, Bearish, Neutral
  sentimentTrend: text("sentiment_trend"), // Improving, Stable, Declining
  topPositiveTopic: text("top_positive_topic"),
  topNegativeConcern: text("top_negative_concern"),
  isVisible: boolean("is_visible").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Intelligence Jobs - tracks scraping/analysis job runs
export const intelligenceJobs = pgTable("intelligence_jobs", {
  id: serial("id").primaryKey(),
  sourceId: integer("source_id"),
  jobType: text("job_type").notNull(), // scrape, analyze, report
  status: text("status").default("pending"), // pending, running, completed, failed
  itemsProcessed: integer("items_processed").default(0),
  errors: text("errors").array(),
  logs: text("logs").array(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============ ENGAGEMENT FEATURES ============

// Price Predictions - AI-generated price forecasts for localities
export const pricePredictions = pgTable("price_predictions", {
  id: serial("id").primaryKey(),
  locality: text("locality").notNull(),
  currentPricePerSqft: integer("current_price_per_sqft"),
  predictedPriceMin: integer("predicted_price_min").notNull(),
  predictedPriceMax: integer("predicted_price_max").notNull(),
  predictionMonths: integer("prediction_months").default(12),
  confidenceLevel: integer("confidence_level").notNull(), // 0-100 percentage
  factorsConsidered: jsonb("factors_considered"), // { infraProjects: [], demandTrend: '', supplyTrend: '', economicIndicators: [] }
  reasoning: text("reasoning"),
  modelVersion: text("model_version").default("v1"),
  isActive: boolean("is_active").default(true),
  generatedAt: timestamp("generated_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Watchlist - tracks localities users are monitoring
export const userWatchlist = pgTable("user_watchlist", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  email: text("email"),
  localityId: integer("locality_id"),
  localityName: text("locality_name").notNull(),
  notifyPriceChanges: boolean("notify_price_changes").default(true),
  notifyNewListings: boolean("notify_new_listings").default(false),
  notifyInfraUpdates: boolean("notify_infra_updates").default(true),
  weeklyDigest: boolean("weekly_digest").default(true),
  lastNotifiedAt: timestamp("last_notified_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Price Alerts - custom alert conditions set by users
export const priceAlerts = pgTable("price_alerts", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  email: text("email"),
  localityName: text("locality_name").notNull(),
  alertType: text("alert_type").notNull(), // price_below, price_above, litigation_below, new_infra
  condition: text("condition").notNull(), // e.g., "price < 3800" or "litigation_cases < 10%"
  thresholdValue: integer("threshold_value"),
  thresholdUnit: text("threshold_unit"), // per_sqft, percentage, count
  currentValue: integer("current_value"),
  isTriggered: boolean("is_triggered").default(false),
  triggeredAt: timestamp("triggered_at"),
  isActive: boolean("is_active").default(true),
  lastCheckedAt: timestamp("last_checked_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Watchlist Digest - tracks sent digests
export const watchlistDigests = pgTable("watchlist_digests", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  digestType: text("digest_type").default("weekly"), // daily, weekly, monthly
  localitiesIncluded: text("localities_included").array(),
  priceMovements: jsonb("price_movements"), // { locality: string, change: number, direction: 'up'|'down' }[]
  alertsTriggered: integer("alerts_triggered").default(0),
  newListingsCount: integer("new_listings_count").default(0),
  sentAt: timestamp("sent_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============ INSERT SCHEMAS ============
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  postedAt: true,
  scrapedAt: true,
  updatedAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLocalitySchema = createInsertSchema(localities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBuyerEventSchema = createInsertSchema(buyerEvents).omit({
  id: true,
  createdAt: true,
});

export const insertSearchRequirementSchema = createInsertSchema(searchRequirements).omit({
  id: true,
  createdAt: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertScrapingSourceSchema = createInsertSchema(scrapingSources).omit({
  id: true,
  createdAt: true,
});

export const insertScrapingJobSchema = createInsertSchema(scrapingJobs).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBlogNotificationSchema = createInsertSchema(blogNotifications).omit({
  id: true,
  createdAt: true,
});

export const insertAiBudgetTrackingSchema = createInsertSchema(aiBudgetTracking).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAiInsightSchema = createInsertSchema(aiInsights).omit({
  id: true,
  createdAt: true,
});

// Web Intelligence Insert Schemas
export const insertIntelligenceSourceSchema = createInsertSchema(intelligenceSources).omit({
  id: true,
  createdAt: true,
});

export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({
  id: true,
  createdAt: true,
});

export const insertSocialPostSchema = createInsertSchema(socialPosts).omit({
  id: true,
  createdAt: true,
});

export const insertJobListingSchema = createInsertSchema(jobListings).omit({
  id: true,
  createdAt: true,
});

export const insertInfrastructureProjectSchema = createInsertSchema(infrastructureProjects).omit({
  id: true,
  createdAt: true,
});

export const insertLegalDisputeSchema = createInsertSchema(legalDisputes).omit({
  id: true,
  createdAt: true,
});

export const insertMarketIntelligenceSchema = createInsertSchema(marketIntelligence).omit({
  id: true,
  createdAt: true,
});

export const insertSentimentSnapshotSchema = createInsertSchema(sentimentSnapshots).omit({
  id: true,
  createdAt: true,
});

export const insertIntelligenceJobSchema = createInsertSchema(intelligenceJobs).omit({
  id: true,
  createdAt: true,
});

// Engagement Feature Insert Schemas
export const insertPricePredictionSchema = createInsertSchema(pricePredictions).omit({
  id: true,
  createdAt: true,
});

export const insertUserWatchlistSchema = createInsertSchema(userWatchlist).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPriceAlertSchema = createInsertSchema(priceAlerts).omit({
  id: true,
  createdAt: true,
});

export const insertWatchlistDigestSchema = createInsertSchema(watchlistDigests).omit({
  id: true,
  createdAt: true,
});

// ============ INTELLIGENCE SCHEDULING ============
export const intelligenceScheduleSettings = pgTable("intelligence_schedule_settings", {
  id: serial("id").primaryKey(),
  autoScrapingEnabled: boolean("auto_scraping_enabled").default(true),
  dailyNewsTime: text("daily_news_time").default("02:00"),
  dailySocialTime: text("daily_social_time").default("03:00"),
  dailyJobsTime: text("daily_jobs_time").default("04:00"),
  dailyInfraTime: text("daily_infra_time").default("05:00"),
  dailyMarketTime: text("daily_market_time").default("06:00"),
  dailySyncTime: text("daily_sync_time").default("07:00"),
  weeklyAnalysisDay: text("weekly_analysis_day").default("sunday"),
  monthlyReportDay: integer("monthly_report_day").default(1),
  lastDailyRun: timestamp("last_daily_run"),
  lastWeeklyRun: timestamp("last_weekly_run"),
  lastMonthlyRun: timestamp("last_monthly_run"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertIntelligenceScheduleSettingsSchema = createInsertSchema(intelligenceScheduleSettings).omit({
  id: true,
  updatedAt: true,
});

// ============ TYPES ============
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type Locality = typeof localities.$inferSelect;
export type InsertLocality = z.infer<typeof insertLocalitySchema>;

export type BuyerEvent = typeof buyerEvents.$inferSelect;
export type InsertBuyerEvent = z.infer<typeof insertBuyerEventSchema>;

export type SearchRequirement = typeof searchRequirements.$inferSelect;
export type InsertSearchRequirement = z.infer<typeof insertSearchRequirementSchema>;

export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;

export type ScrapingSource = typeof scrapingSources.$inferSelect;
export type InsertScrapingSource = z.infer<typeof insertScrapingSourceSchema>;

export type ScrapingJob = typeof scrapingJobs.$inferSelect;
export type InsertScrapingJob = z.infer<typeof insertScrapingJobSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type BlogNotification = typeof blogNotifications.$inferSelect;
export type InsertBlogNotification = z.infer<typeof insertBlogNotificationSchema>;

export type AiBudgetTracking = typeof aiBudgetTracking.$inferSelect;
export type InsertAiBudgetTracking = z.infer<typeof insertAiBudgetTrackingSchema>;

export type AiInsight = typeof aiInsights.$inferSelect;
export type InsertAiInsight = z.infer<typeof insertAiInsightSchema>;

// Web Intelligence Types
export type IntelligenceSource = typeof intelligenceSources.$inferSelect;
export type InsertIntelligenceSource = z.infer<typeof insertIntelligenceSourceSchema>;

export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;

export type SocialPost = typeof socialPosts.$inferSelect;
export type InsertSocialPost = z.infer<typeof insertSocialPostSchema>;

export type JobListing = typeof jobListings.$inferSelect;
export type InsertJobListing = z.infer<typeof insertJobListingSchema>;

export type InfrastructureProject = typeof infrastructureProjects.$inferSelect;
export type InsertInfrastructureProject = z.infer<typeof insertInfrastructureProjectSchema>;

export type LegalDispute = typeof legalDisputes.$inferSelect;
export type InsertLegalDispute = z.infer<typeof insertLegalDisputeSchema>;

export type MarketIntelligence = typeof marketIntelligence.$inferSelect;
export type InsertMarketIntelligence = z.infer<typeof insertMarketIntelligenceSchema>;

export type SentimentSnapshot = typeof sentimentSnapshots.$inferSelect;
export type InsertSentimentSnapshot = z.infer<typeof insertSentimentSnapshotSchema>;

export type IntelligenceJob = typeof intelligenceJobs.$inferSelect;
export type InsertIntelligenceJob = z.infer<typeof insertIntelligenceJobSchema>;

export type IntelligenceScheduleSettings = typeof intelligenceScheduleSettings.$inferSelect;
export type InsertIntelligenceScheduleSettings = z.infer<typeof insertIntelligenceScheduleSettingsSchema>;

// Engagement Feature Types
export type PricePrediction = typeof pricePredictions.$inferSelect;
export type InsertPricePrediction = z.infer<typeof insertPricePredictionSchema>;

export type UserWatchlistItem = typeof userWatchlist.$inferSelect;
export type InsertUserWatchlistItem = z.infer<typeof insertUserWatchlistSchema>;

export type PriceAlert = typeof priceAlerts.$inferSelect;
export type InsertPriceAlert = z.infer<typeof insertPriceAlertSchema>;

export type WatchlistDigest = typeof watchlistDigests.$inferSelect;
export type InsertWatchlistDigest = z.infer<typeof insertWatchlistDigestSchema>;
