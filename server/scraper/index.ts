import { storage } from "../storage";
import type { ScrapingSource, InsertProperty } from "@shared/schema";

export interface ScraperConfig {
  baseUrl: string;
  searchPath: string;
  selectors?: {
    listingContainer?: string;
    title?: string;
    price?: string;
    location?: string;
    area?: string;
    bhk?: string;
    url?: string;
    image?: string;
  };
  headers?: Record<string, string>;
  pagination?: {
    type: 'page' | 'offset' | 'cursor';
    param: string;
    limit: number;
  };
  rateLimit?: number;
}

export interface ScrapedProperty {
  title: string;
  price: string;
  priceNumeric?: number;
  location: string;
  locality: string;
  type: string;
  bhk?: string;
  area: string;
  areaNumeric?: number;
  source: string;
  url: string;
  description?: string;
  images?: string[];
}

const DEFAULT_CONFIGS: Record<string, ScraperConfig> = {
  '99acres': {
    baseUrl: 'https://www.99acres.com',
    searchPath: '/search/property/buy/nagpur',
    selectors: {
      listingContainer: '.srpWrap',
      title: '.srpRightCnt h2',
      price: '.srpPrice',
      location: '.srpLocality',
      area: '.srpArea',
      bhk: '.srpBhk',
      url: '.srpRightCnt a',
      image: '.srpImg img'
    },
    pagination: {
      type: 'page',
      param: 'page',
      limit: 10
    },
    rateLimit: 2000
  },
  'magicbricks': {
    baseUrl: 'https://www.magicbricks.com',
    searchPath: '/property-for-sale/residential-real-estate?proptype=Multistorey-Apartment,Builder-Floor-Apartment&cityName=Nagpur',
    selectors: {
      listingContainer: '.mb-srp__card',
      title: '.mb-srp__card--title',
      price: '.mb-srp__card--price',
      location: '.mb-srp__card--locality',
      area: '.mb-srp__card--area',
      bhk: '.mb-srp__card--bhk',
      url: '.mb-srp__card--title a',
      image: '.mb-srp__card--image img'
    },
    pagination: {
      type: 'page',
      param: 'page',
      limit: 10
    },
    rateLimit: 2000
  },
  'housing': {
    baseUrl: 'https://housing.com',
    searchPath: '/in/buy/searches/P1bfrvrqtg1qo6x9a',
    selectors: {
      listingContainer: '.css-1qbthte',
      title: '.css-14x6jxz',
      price: '.css-1t7lxcg',
      location: '.css-1t7lxcg + div',
      area: '.css-1aoi2eo',
      bhk: '.css-1aoi2eo',
      url: 'a',
      image: 'img'
    },
    pagination: {
      type: 'offset',
      param: 'offset',
      limit: 20
    },
    rateLimit: 2000
  }
};

export class PropertyScraper {
  private source: ScrapingSource;
  private config: ScraperConfig;
  private jobId: number;

  constructor(source: ScrapingSource, jobId: number) {
    this.source = source;
    this.jobId = jobId;
    
    const sourceConfig = source.config as ScraperConfig | null;
    const defaultConfig = DEFAULT_CONFIGS[source.type] || DEFAULT_CONFIGS['99acres'];
    
    this.config = {
      ...defaultConfig,
      ...sourceConfig,
      baseUrl: source.url || defaultConfig.baseUrl
    };
  }

  async run(): Promise<{ found: number; imported: number; errors: string[] }> {
    const logs: string[] = [];
    const errors: string[] = [];
    let found = 0;
    let imported = 0;

    try {
      logs.push(`Starting scraper for ${this.source.name}`);
      logs.push(`Source URL: ${this.config.baseUrl}${this.config.searchPath}`);

      await this.updateJob({ status: 'running', logs });

      // Simulate fetching pages (in production, this would use fetch or puppeteer)
      const scrapedProperties = await this.fetchListings();
      found = scrapedProperties.length;
      
      logs.push(`Found ${found} properties`);

      // Import properties to database
      for (const prop of scrapedProperties) {
        try {
          await this.importProperty(prop);
          imported++;
        } catch (error) {
          errors.push(`Failed to import: ${prop.title} - ${(error as Error).message}`);
        }
      }

      logs.push(`Successfully imported ${imported} properties`);
      
      await this.updateJob({
        status: 'completed',
        propertiesFound: found,
        propertiesImported: imported,
        logs,
        errors: errors.length > 0 ? errors : undefined,
        completedAt: new Date()
      });

      // Update source last scraped time
      await storage.updateScrapingSource(this.source.id, {
        lastScrapedAt: new Date()
      });

    } catch (error) {
      errors.push((error as Error).message);
      await this.updateJob({
        status: 'failed',
        errors,
        logs,
        completedAt: new Date()
      });
    }

    return { found, imported, errors };
  }

  private async fetchListings(): Promise<ScrapedProperty[]> {
    // In a real implementation, this would:
    // 1. Use fetch or puppeteer to load the page
    // 2. Parse HTML using cheerio or puppeteer's DOM API
    // 3. Extract property data using configured selectors
    
    // For now, return simulated data based on source type
    return this.generateMockListings();
  }

  private generateMockListings(): ScrapedProperty[] {
    const nagpurLocalities = [
      'Dharampeth', 'Ramdaspeth', 'Civil Lines', 'MIHAN', 'Wardha Road',
      'Besa', 'Manish Nagar', 'Hingna', 'Koradi', 'Gittikhadan'
    ];

    const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Independent House'];
    const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK'];

    const count = Math.floor(Math.random() * 15) + 5;
    const properties: ScrapedProperty[] = [];

    for (let i = 0; i < count; i++) {
      const locality = nagpurLocalities[Math.floor(Math.random() * nagpurLocalities.length)];
      const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
      const bhk = bhkOptions[Math.floor(Math.random() * bhkOptions.length)];
      const priceNumeric = Math.floor(Math.random() * 15000000) + 2500000;
      const areaNumeric = Math.floor(Math.random() * 1500) + 800;

      properties.push({
        title: `${bhk} ${type} in ${locality}`,
        price: this.formatPrice(priceNumeric),
        priceNumeric,
        location: `${locality}, Nagpur`,
        locality,
        type,
        bhk,
        area: `${areaNumeric} sq.ft`,
        areaNumeric,
        source: this.source.name,
        url: `${this.config.baseUrl}/property/${Date.now()}-${i}`,
        description: `Beautiful ${bhk} ${type.toLowerCase()} available in ${locality}. Well-connected area with modern amenities.`,
        images: []
      });
    }

    return properties;
  }

  private formatPrice(amount: number): string {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(2)} Lac`;
    }
    return amount.toString();
  }

  private async importProperty(prop: ScrapedProperty): Promise<void> {
    const insertData: InsertProperty = {
      title: prop.title,
      price: prop.price,
      priceNumeric: prop.priceNumeric,
      location: prop.location,
      locality: prop.locality,
      type: prop.type,
      bhk: prop.bhk,
      area: prop.area,
      areaNumeric: prop.areaNumeric,
      source: prop.source,
      url: prop.url,
      description: prop.description,
      images: prop.images,
      isVerified: false,
      verificationStatus: 'pending'
    };

    await storage.createProperty(insertData);
  }

  private async updateJob(data: any): Promise<void> {
    await storage.updateScrapingJob(this.jobId, data);
  }
}

export async function runScraperJob(jobId: number, source: ScrapingSource): Promise<void> {
  const scraper = new PropertyScraper(source, jobId);
  await scraper.run();
}

export function getDefaultConfigs(): Record<string, ScraperConfig> {
  return DEFAULT_CONFIGS;
}
