import { storage } from "../storage";
import type { IntelligenceSource, InsertNewsArticle, InsertSocialPost, InsertJobListing } from "@shared/schema";

const APIFY_BASE_URL = "https://api.apify.com/v2";

function getApifyApiKey(): string | undefined {
  return process.env.APIFY_API_KEY;
}

interface CollectorResult {
  success: boolean;
  itemsCollected: number;
  errors: string[];
  logs: string[];
}

export class IntelligenceCollector {
  private async runApifyActor(actorId: string, input: any): Promise<any[]> {
    const apiKey = getApifyApiKey();
    if (!apiKey) {
      throw new Error('APIFY_API_KEY environment variable is not set');
    }
    
    try {
      const runUrl = `${APIFY_BASE_URL}/acts/${actorId}/runs?token=${apiKey}`;
      
      const runResponse = await fetch(runUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      if (!runResponse.ok) {
        throw new Error(`Failed to start Apify actor: ${runResponse.statusText}`);
      }

      const runData = await runResponse.json();
      const runId = runData.data.id;

      let attempts = 0;
      const maxAttempts = 60;
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        const statusUrl = `${APIFY_BASE_URL}/actor-runs/${runId}?token=${apiKey}`;
        const statusResponse = await fetch(statusUrl);
        const statusData = await statusResponse.json();
        
        if (statusData.data.status === 'SUCCEEDED') {
          const datasetUrl = `${APIFY_BASE_URL}/datasets/${statusData.data.defaultDatasetId}/items?token=${apiKey}`;
          const dataResponse = await fetch(datasetUrl);
          return await dataResponse.json();
        }
        
        if (statusData.data.status === 'FAILED' || statusData.data.status === 'ABORTED') {
          throw new Error(`Apify actor run failed: ${statusData.data.status}`);
        }
        
        attempts++;
      }
      
      throw new Error('Apify actor run timed out');
    } catch (error) {
      console.error('Apify error:', error);
      throw error;
    }
  }

  async collectNews(source: IntelligenceSource): Promise<CollectorResult> {
    const logs: string[] = [];
    const errors: string[] = [];
    let itemsCollected = 0;

    try {
      logs.push(`Starting news collection from ${source.name}`);
      
      const config = source.config as any || {};
      
      if (source.category === 'direct_scrape') {
        errors.push('Direct scraping not supported. Please use Apify sources for real data collection.');
        logs.push('Skipped - direct_scrape sources require Apify integration');
      } else if (source.category === 'apify') {
        const actorId = config.actorId || 'apify/google-search-scraper';
        const input = {
          queries: config.keywords || ['Nagpur real estate news', 'MIHAN development', 'Nagpur metro update'],
          maxPagesPerQuery: 1,
          countryCode: 'in'
        };

        try {
          const results = await this.runApifyActor(actorId, input);
          
          for (const result of results) {
            try {
              const article: InsertNewsArticle = {
                title: result.title || 'Untitled',
                content: result.description || result.snippet,
                source: source.name,
                sourceUrl: result.url || result.link,
                publishedAt: new Date(),
                category: this.categorizeNews(result.title || ''),
                locality: this.extractLocality(result.title + ' ' + (result.description || '')),
                sentiment: this.analyzeSentiment(result.title + ' ' + (result.description || '')),
                impactLevel: 'Medium',
                isProcessed: true,
                isVisible: false
              };
              
              await storage.createNewsArticle(article);
              itemsCollected++;
            } catch (err) {
              errors.push(`Failed to save article: ${(err as Error).message}`);
            }
          }
          
          logs.push(`Collected ${itemsCollected} news articles from Apify`);
        } catch (err) {
          errors.push(`Apify actor failed: ${(err as Error).message}`);
          logs.push('Collection failed - no mock data fallback');
        }
      }

      await storage.updateIntelligenceSource(source.id, {
        lastScrapedAt: new Date(),
        itemsScraped: (source.itemsScraped || 0) + itemsCollected
      });

      logs.push(`News collection completed: ${itemsCollected} items`);
      
      return { success: true, itemsCollected, errors, logs };
    } catch (error) {
      errors.push((error as Error).message);
      return { success: false, itemsCollected, errors, logs };
    }
  }

  async collectSocialMedia(source: IntelligenceSource): Promise<CollectorResult> {
    const logs: string[] = [];
    const errors: string[] = [];
    let itemsCollected = 0;

    try {
      logs.push(`Starting social media collection from ${source.name}`);
      
      const config = source.config as any || {};
      
      if (source.category === 'apify') {
        const platform = source.type === 'social' ? (config.platform || 'twitter') : 'twitter';
        
        let actorId = 'quacker/twitter-scraper';
        if (platform === 'reddit') {
          actorId = 'trudax/reddit-scraper';
        }

        const input = {
          searchTerms: config.keywords || ['Nagpur property', 'MIHAN real estate', '#NagpurMetro'],
          maxTweets: config.maxItems || 50,
          addUserInfo: true
        };

        try {
          const results = await this.runApifyActor(actorId, input);
          
          for (const result of results) {
            try {
              const post: InsertSocialPost = {
                platform: platform.charAt(0).toUpperCase() + platform.slice(1),
                author: result.author || result.user?.username || 'unknown',
                content: result.text || result.content || result.title || '',
                postUrl: result.url || result.link,
                postedAt: result.createdAt ? new Date(result.createdAt) : new Date(),
                engagement: {
                  likes: result.likes || result.favoriteCount || 0,
                  retweets: result.retweets || result.retweetCount || 0,
                  replies: result.replies || result.replyCount || 0
                },
                sentiment: this.analyzeSentiment(result.text || result.content || ''),
                topic: this.extractTopic(result.text || result.content || ''),
                localityMentioned: this.extractLocality(result.text || result.content || ''),
                isViral: (result.likes || 0) > 100 || (result.retweets || 0) > 50,
                isProcessed: true,
                isVisible: false
              };
              
              await storage.createSocialPost(post);
              itemsCollected++;
            } catch (err) {
              errors.push(`Failed to save post: ${(err as Error).message}`);
            }
          }
          
          logs.push(`Collected ${itemsCollected} social posts from Apify`);
        } catch (err) {
          errors.push(`Apify actor failed: ${(err as Error).message}`);
          logs.push('Collection failed - no mock data fallback');
        }
      } else {
        errors.push('Only Apify sources are supported for real data collection');
        logs.push('Skipped - source type not supported');
      }

      await storage.updateIntelligenceSource(source.id, {
        lastScrapedAt: new Date(),
        itemsScraped: (source.itemsScraped || 0) + itemsCollected
      });

      return { success: true, itemsCollected, errors, logs };
    } catch (error) {
      errors.push((error as Error).message);
      return { success: false, itemsCollected, errors, logs };
    }
  }

  async collectJobs(source: IntelligenceSource): Promise<CollectorResult> {
    const logs: string[] = [];
    const errors: string[] = [];
    let itemsCollected = 0;

    try {
      logs.push(`Starting job listings collection from ${source.name}`);
      
      const config = source.config as any || {};
      
      if (source.category === 'apify') {
        const actorId = config.actorId || 'bebity/linkedin-jobs-scraper';
        const input = {
          location: 'Nagpur, Maharashtra, India',
          search: config.keywords || ['IT', 'Software', 'Developer'],
          rows: config.maxItems || 50
        };

        try {
          const results = await this.runApifyActor(actorId, input);
          
          for (const result of results) {
            try {
              const job: InsertJobListing = {
                companyName: result.company || result.companyName || 'Unknown Company',
                jobTitle: result.title || result.jobTitle || 'Untitled Position',
                jobCategory: this.categorizeJob(result.title || ''),
                numberOfOpenings: result.openings || 1,
                salaryRange: result.salary || result.salaryRange,
                location: result.location || 'Nagpur',
                locality: this.extractLocality(result.location || 'Nagpur'),
                jobSource: source.name,
                jobUrl: result.url || result.link,
                postedAt: result.postedAt ? new Date(result.postedAt) : new Date(),
                isActive: true,
                isProcessed: true,
                isVisible: false
              };
              
              await storage.createJobListing(job);
              itemsCollected++;
            } catch (err) {
              errors.push(`Failed to save job: ${(err as Error).message}`);
            }
          }
          
          logs.push(`Collected ${itemsCollected} job listings from Apify`);
        } catch (err) {
          errors.push(`Apify actor failed: ${(err as Error).message}`);
          logs.push('Collection failed - no mock data fallback');
        }
      } else {
        errors.push('Only Apify sources are supported for real data collection');
        logs.push('Skipped - source type not supported');
      }

      await storage.updateIntelligenceSource(source.id, {
        lastScrapedAt: new Date(),
        itemsScraped: (source.itemsScraped || 0) + itemsCollected
      });

      return { success: true, itemsCollected, errors, logs };
    } catch (error) {
      errors.push((error as Error).message);
      return { success: false, itemsCollected, errors, logs };
    }
  }

  async runCollection(sourceId: number): Promise<CollectorResult> {
    const source = await storage.getIntelligenceSource(sourceId);
    if (!source) {
      return { success: false, itemsCollected: 0, errors: ['Source not found'], logs: [] };
    }

    const job = await storage.createIntelligenceJob({
      sourceId,
      jobType: 'scrape',
      status: 'running',
      startedAt: new Date()
    });

    let result: CollectorResult;
    
    switch (source.type) {
      case 'news':
        result = await this.collectNews(source);
        break;
      case 'social':
        result = await this.collectSocialMedia(source);
        break;
      case 'jobs':
        result = await this.collectJobs(source);
        break;
      default:
        result = { success: false, itemsCollected: 0, errors: [`Unknown source type: ${source.type}`], logs: [] };
    }

    await storage.updateIntelligenceJob(job.id, {
      status: result.success ? 'completed' : 'failed',
      itemsProcessed: result.itemsCollected,
      errors: result.errors.length > 0 ? result.errors : undefined,
      logs: result.logs,
      completedAt: new Date()
    });

    return result;
  }

  private categorizeNews(title: string): string {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('metro') || titleLower.includes('road') || titleLower.includes('flyover') || titleLower.includes('airport')) {
      return 'Infrastructure';
    }
    if (titleLower.includes('job') || titleLower.includes('hiring') || titleLower.includes('employment') || titleLower.includes('infosys') || titleLower.includes('tcs')) {
      return 'Jobs';
    }
    if (titleLower.includes('price') || titleLower.includes('market') || titleLower.includes('property') || titleLower.includes('real estate')) {
      return 'Market';
    }
    if (titleLower.includes('court') || titleLower.includes('dispute') || titleLower.includes('legal') || titleLower.includes('encroachment')) {
      return 'Legal';
    }
    if (titleLower.includes('government') || titleLower.includes('policy') || titleLower.includes('scheme') || titleLower.includes('regulation')) {
      return 'Policy';
    }
    return 'Other';
  }

  private extractLocality(text: string): string {
    const textLower = text.toLowerCase();
    const localities = ['mihan', 'besa', 'wardha road', 'dharampeth', 'hingna', 'ramdaspeth', 'civil lines', 'manish nagar', 'koradi', 'laxmi nagar'];
    
    for (const locality of localities) {
      if (textLower.includes(locality)) {
        return locality.charAt(0).toUpperCase() + locality.slice(1);
      }
    }
    return 'Nagpur';
  }

  private extractTopic(text: string): string {
    const textLower = text.toLowerCase();
    if (textLower.includes('price') || textLower.includes('cost') || textLower.includes('lakh') || textLower.includes('crore')) {
      return 'Prices';
    }
    if (textLower.includes('metro')) {
      return 'Metro';
    }
    if (textLower.includes('job') || textLower.includes('work') || textLower.includes('career')) {
      return 'Jobs';
    }
    if (textLower.includes('legal') || textLower.includes('court') || textLower.includes('dispute')) {
      return 'Legal';
    }
    if (textLower.includes('infra') || textLower.includes('road') || textLower.includes('development')) {
      return 'Infrastructure';
    }
    return 'General';
  }

  private analyzeSentiment(text: string): string {
    const textLower = text.toLowerCase();
    const positiveWords = ['growth', 'boom', 'rise', 'increase', 'development', 'expansion', 'opportunity', 'bullish', 'excellent', 'great', 'best', 'good', 'positive', 'success'];
    const negativeWords = ['decline', 'fall', 'decrease', 'problem', 'issue', 'concern', 'risk', 'bearish', 'bad', 'poor', 'negative', 'failure', 'dispute', 'delay'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    for (const word of positiveWords) {
      if (textLower.includes(word)) positiveCount++;
    }
    for (const word of negativeWords) {
      if (textLower.includes(word)) negativeCount++;
    }
    
    if (positiveCount > negativeCount) return 'Positive';
    if (negativeCount > positiveCount) return 'Negative';
    return 'Neutral';
  }

  private categorizeJob(title: string): string {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('software') || titleLower.includes('developer') || titleLower.includes('engineer') || titleLower.includes('it') || titleLower.includes('data')) {
      return 'IT';
    }
    if (titleLower.includes('manufacturing') || titleLower.includes('production') || titleLower.includes('factory')) {
      return 'Manufacturing';
    }
    if (titleLower.includes('retail') || titleLower.includes('sales') || titleLower.includes('marketing')) {
      return 'Retail';
    }
    return 'Services';
  }

}

export const intelligenceCollector = new IntelligenceCollector();
