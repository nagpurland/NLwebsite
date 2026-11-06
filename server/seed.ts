import { storage } from "./storage";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'nagpur_salt_2024').digest('hex');
}

const NAGPUR_LOCALITIES = [
  {
    name: "MIHAN",
    slug: "mihan",
    description: "Multi-modal International Hub Airport at Nagpur - A rapidly developing industrial and residential zone with world-class infrastructure.",
    avgPrice: "4500",
    priceGrowth: "12.5",
    infrastructureScore: 85,
    connectivityScore: 90,
    safetyScore: 80,
    amenitiesScore: 75,
    highlights: ["MIHAN SEZ", "AI & IT Parks", "International Airport Proximity", "Metro Connectivity Planned"],
    investmentOutlook: "High growth potential with 12%+ YoY appreciation expected"
  },
  {
    name: "Wardha Road",
    slug: "wardha-road",
    description: "One of Nagpur's most sought-after corridors with excellent connectivity and premium residential developments.",
    avgPrice: "6500",
    priceGrowth: "8.2",
    infrastructureScore: 88,
    connectivityScore: 92,
    safetyScore: 85,
    amenitiesScore: 88,
    highlights: ["Metro Line Expansion", "Premium Townships", "Hospital Hub", "Educational Institutions"],
    investmentOutlook: "Stable premium segment with consistent growth"
  },
  {
    name: "Dharampeth",
    slug: "dharampeth",
    description: "Premium residential area in central Nagpur known for its elite neighborhoods and excellent civic amenities.",
    avgPrice: "9500",
    priceGrowth: "5.8",
    infrastructureScore: 92,
    connectivityScore: 88,
    safetyScore: 95,
    amenitiesScore: 92,
    highlights: ["Central Location", "Elite Neighborhood", "Heritage Area", "Top Schools Nearby"],
    investmentOutlook: "Premium stable segment - ideal for end-use buyers"
  },
  {
    name: "Besa",
    slug: "besa",
    description: "Emerging residential hub with affordable pricing and growing infrastructure development.",
    avgPrice: "3200",
    priceGrowth: "15.3",
    infrastructureScore: 70,
    connectivityScore: 72,
    safetyScore: 75,
    amenitiesScore: 68,
    highlights: ["Affordable Housing", "IT Corridor Proximity", "New Developments", "Road Expansion"],
    investmentOutlook: "High growth emerging area - excellent for investors"
  },
  {
    name: "Hingna",
    slug: "hingna",
    description: "Industrial and residential area with excellent growth potential due to IT park developments.",
    avgPrice: "2800",
    priceGrowth: "18.7",
    infrastructureScore: 65,
    connectivityScore: 70,
    safetyScore: 72,
    amenitiesScore: 60,
    highlights: ["IT Parks", "Industrial Zone", "Affordable Plots", "Highway Access"],
    investmentOutlook: "Very high growth potential - ideal for long-term investors"
  },
  {
    name: "Ramdaspeth",
    slug: "ramdaspeth",
    description: "Upscale residential locality with commercial hubs and premium real estate options.",
    avgPrice: "8500",
    priceGrowth: "6.1",
    infrastructureScore: 90,
    connectivityScore: 85,
    safetyScore: 90,
    amenitiesScore: 88,
    highlights: ["Commercial Hub", "Premium Residences", "Central Location", "Established Area"],
    investmentOutlook: "Stable premium market with moderate appreciation"
  },
  {
    name: "Civil Lines",
    slug: "civil-lines",
    description: "One of the oldest and most prestigious areas in Nagpur with heritage properties and government offices.",
    avgPrice: "10500",
    priceGrowth: "4.2",
    infrastructureScore: 95,
    connectivityScore: 90,
    safetyScore: 98,
    amenitiesScore: 90,
    highlights: ["Heritage Area", "Government Offices", "Prime Location", "Established Infrastructure"],
    investmentOutlook: "Ultra-premium stable segment - capital preservation focus"
  },
  {
    name: "Manish Nagar",
    slug: "manish-nagar",
    description: "Well-planned residential area with good connectivity and mid-range housing options.",
    avgPrice: "3800",
    priceGrowth: "11.4",
    infrastructureScore: 78,
    connectivityScore: 80,
    safetyScore: 82,
    amenitiesScore: 78,
    highlights: ["Planned Layout", "Good Schools", "Family-Friendly", "Parks & Gardens"],
    investmentOutlook: "Good mid-range option with steady growth"
  },
  {
    name: "Koradi",
    slug: "koradi",
    description: "Emerging area near Koradi Power Station with affordable land options and temple tourism.",
    avgPrice: "2200",
    priceGrowth: "22.5",
    infrastructureScore: 55,
    connectivityScore: 60,
    safetyScore: 70,
    amenitiesScore: 50,
    highlights: ["Koradi Temple", "Power Station", "Affordable Land", "Natural Surroundings"],
    investmentOutlook: "High-risk high-reward - suitable for patient investors"
  },
  {
    name: "Laxmi Nagar",
    slug: "laxmi-nagar",
    description: "Commercial and residential hub with good market access and established infrastructure.",
    avgPrice: "5200",
    priceGrowth: "7.8",
    infrastructureScore: 82,
    connectivityScore: 85,
    safetyScore: 80,
    amenitiesScore: 82,
    highlights: ["Commercial Hub", "Markets", "Good Connectivity", "Mixed Use"],
    investmentOutlook: "Balanced option with moderate growth potential"
  }
];

const SAMPLE_PROPERTIES = [
  {
    title: "Premium 3BHK Apartment in Wardha Road",
    description: "Luxurious apartment with modern amenities, spacious rooms, and premium finishes. Located in a gated community with 24/7 security.",
    price: "1.25 Cr",
    priceNumeric: 12500000,
    location: "Wardha Road, Near Orange City Hospital",
    locality: "Wardha Road",
    type: "Apartment",
    bhk: "3 BHK",
    area: "1850 sq.ft",
    areaNumeric: 1850,
    source: "99acres",
    url: "https://99acres.com/sample-1",
    images: [],
    isVerified: true,
    isActive: true,
    riskScore: 15,
    investmentScore: 78,
    highlights: ["RERA Registered", "Ready to Move", "Premium Location"]
  },
  {
    title: "Residential Plot near MIHAN SEZ",
    description: "Prime residential plot in a developed layout with clear title. Excellent investment opportunity near the upcoming IT hub.",
    price: "45 Lakh",
    priceNumeric: 4500000,
    location: "MIHAN Sector 5",
    locality: "MIHAN",
    type: "Plot",
    area: "1500 sq.ft",
    areaNumeric: 1500,
    source: "magicbricks",
    url: "https://magicbricks.com/sample-2",
    images: [],
    isVerified: true,
    isActive: true,
    riskScore: 22,
    investmentScore: 85,
    highlights: ["Clear Title", "Gated Layout", "Near IT Park"]
  },
  {
    title: "Affordable 2BHK Flat in Besa",
    description: "Budget-friendly apartment perfect for first-time buyers. Close to schools and markets with good public transport.",
    price: "32 Lakh",
    priceNumeric: 3200000,
    location: "Besa Square, Near Besa Road",
    locality: "Besa",
    type: "Apartment",
    bhk: "2 BHK",
    area: "950 sq.ft",
    areaNumeric: 950,
    source: "housing",
    url: "https://housing.com/sample-3",
    images: [],
    isVerified: false,
    isActive: true,
    riskScore: 35,
    investmentScore: 72,
    highlights: ["Affordable", "Under Construction", "Good Connectivity"]
  },
  {
    title: "Luxury Villa in Dharampeth",
    description: "Exclusive villa in prime Dharampeth location with private garden, modern architecture, and premium interiors.",
    price: "4.5 Cr",
    priceNumeric: 45000000,
    location: "Dharampeth Extension",
    locality: "Dharampeth",
    type: "Villa",
    bhk: "5 BHK",
    area: "4500 sq.ft",
    areaNumeric: 4500,
    source: "direct",
    url: "https://nagpurland.com/villa-dharampeth",
    images: [],
    isVerified: true,
    isActive: true,
    riskScore: 8,
    investmentScore: 65,
    highlights: ["Premium Location", "Private Garden", "Modern Design"]
  },
  {
    title: "Commercial Plot in Hingna IT Corridor",
    description: "Ideal for IT/ITES setup or commercial development. Located on the main road with excellent visibility.",
    price: "85 Lakh",
    priceNumeric: 8500000,
    location: "Hingna MIDC Road",
    locality: "Hingna",
    type: "Commercial Plot",
    area: "3000 sq.ft",
    areaNumeric: 3000,
    source: "99acres",
    url: "https://99acres.com/sample-5",
    images: [],
    isVerified: true,
    isActive: true,
    riskScore: 28,
    investmentScore: 88,
    highlights: ["Commercial Zone", "Main Road", "IT Corridor"]
  },
  {
    title: "3BHK Flat in Manish Nagar",
    description: "Spacious family apartment in a well-planned residential area with parks and schools nearby.",
    price: "58 Lakh",
    priceNumeric: 5800000,
    location: "Manish Nagar, Plot 45",
    locality: "Manish Nagar",
    type: "Apartment",
    bhk: "3 BHK",
    area: "1400 sq.ft",
    areaNumeric: 1400,
    source: "magicbricks",
    url: "https://magicbricks.com/sample-6",
    images: [],
    isVerified: true,
    isActive: true,
    riskScore: 18,
    investmentScore: 75,
    highlights: ["Family-Friendly", "Near Schools", "Good Layout"]
  }
];

const SAMPLE_LEADS = [
  {
    name: "Rajesh Kulkarni",
    email: "rajesh.k@email.com",
    phone: "+91 98230 12345",
    requirementType: "buy",
    source: "filter_search",
    locality: "MIHAN",
    budget: "45-65L",
    message: "Looking for investment plots near MIHAN AI Park",
    status: "new",
    intentScore: 85,
    awarenessLevel: "solution_aware"
  },
  {
    name: "Sneha Deshpande",
    email: "sneha.d@email.com",
    phone: "+91 94221 56789",
    requirementType: "buy",
    source: "exit_intent",
    locality: "Besa",
    budget: "30-40L",
    message: "First-time buyer looking for affordable 2BHK",
    status: "contacted",
    intentScore: 62,
    awarenessLevel: "problem_aware"
  },
  {
    name: "Amit Sharma",
    email: "amit.sharma@email.com",
    phone: "+91 71225 88990",
    requirementType: "buy",
    source: "contact_form",
    locality: "Wardha Road",
    budget: "1.2Cr+",
    message: "Urgent - selling ancestral property, need luxury apartment",
    status: "site_visit",
    intentScore: 91,
    awarenessLevel: "most_aware"
  },
  {
    name: "Priya Joshi",
    email: "priya.j@email.com",
    phone: "+91 88065 33221",
    requirementType: "buy",
    source: "whatsapp",
    locality: "Dharampeth",
    budget: "80L-1Cr",
    message: "Looking for villa or large apartment for family",
    status: "negotiation",
    intentScore: 88,
    awarenessLevel: "product_aware"
  },
  {
    name: "Vikram Patil",
    email: "vikram.p@email.com",
    phone: "+91 90110 44332",
    requirementType: "invest",
    source: "casual_browser",
    locality: "Hingna",
    budget: "20-30L",
    message: "Exploring investment options",
    status: "new",
    intentScore: 34,
    awarenessLevel: "unaware"
  }
];

const SCRAPING_SOURCES = [
  {
    name: "99acres Nagpur",
    type: "99acres",
    url: "https://www.99acres.com/property-in-nagpur-ffid",
    isActive: true,
    config: {
      listingSelector: ".tupleNew",
      titleSelector: ".projectName",
      priceSelector: ".priceAsk",
      locationSelector: ".locationName",
      areaSelector: ".unitDetails",
      linkSelector: "a.body_med",
      paginationSelector: ".pagination a",
      scrapeFrequency: "6h"
    }
  },
  {
    name: "MagicBricks Nagpur",
    type: "magicbricks",
    url: "https://www.magicbricks.com/property-for-sale-in-nagpur",
    isActive: true,
    config: {
      listingSelector: ".mb-srp__card",
      titleSelector: ".mb-srp__card--title",
      priceSelector: ".mb-srp__card__price--amount",
      locationSelector: ".mb-srp__card__society--name",
      areaSelector: ".mb-srp__card__summary--value",
      linkSelector: "a.mb-srp__card__link",
      paginationSelector: ".mb-srp__pagination a",
      scrapeFrequency: "6h"
    }
  },
  {
    name: "Housing.com Nagpur",
    type: "housing",
    url: "https://housing.com/in/buy/nagpur",
    isActive: true,
    config: {
      listingSelector: ".property-card",
      titleSelector: ".property-title",
      priceSelector: ".property-price",
      locationSelector: ".property-locality",
      areaSelector: ".property-area",
      linkSelector: "a.property-link",
      paginationSelector: ".pagination-next",
      scrapeFrequency: "12h"
    }
  }
];

export async function seedDatabase() {
  console.log("Starting database seed...");

  try {
    // Seed admin user
    console.log("Seeding admin user...");
    try {
      const existingAdmin = await storage.getUserByUsername("admin");
      if (!existingAdmin) {
        await storage.createUser({
          username: "admin",
          password: hashPassword("nagpur123")
        });
        console.log("  Created admin user (username: admin, password: nagpur123)");
      } else {
        console.log("  Admin user already exists, skipping...");
      }
    } catch (error) {
      console.log("  Admin user creation failed, may already exist");
    }

    // Seed localities
    console.log("Seeding localities...");
    for (const locality of NAGPUR_LOCALITIES) {
      try {
        await storage.createLocality(locality);
        console.log(`  Created locality: ${locality.name}`);
      } catch (error) {
        console.log(`  Locality ${locality.name} may already exist, skipping...`);
      }
    }

    // Seed properties
    console.log("Seeding properties...");
    for (const property of SAMPLE_PROPERTIES) {
      try {
        await storage.createProperty(property);
        console.log(`  Created property: ${property.title}`);
      } catch (error) {
        console.log(`  Property creation failed, may already exist`);
      }
    }

    // Seed leads
    console.log("Seeding leads...");
    for (const lead of SAMPLE_LEADS) {
      try {
        await storage.createLead(lead);
        console.log(`  Created lead: ${lead.name}`);
      } catch (error) {
        console.log(`  Lead creation failed, may already exist`);
      }
    }

    // Seed scraping sources
    console.log("Seeding scraping sources...");
    for (const source of SCRAPING_SOURCES) {
      try {
        await storage.createScrapingSource(source);
        console.log(`  Created scraping source: ${source.name}`);
      } catch (error) {
        console.log(`  Scraping source creation failed, may already exist`);
      }
    }

    // Seed intelligence sources
    console.log("Seeding intelligence sources...");
    const intelligenceSources = [
      {
        name: "Nagpur News Network",
        type: "news",
        category: "direct_scrape",
        url: "https://nagpurtoday.in",
        isActive: true,
        config: { keywords: ["Nagpur real estate", "MIHAN", "property", "metro"] }
      },
      {
        name: "Twitter Nagpur Real Estate",
        type: "social",
        category: "apify",
        url: "https://twitter.com",
        isActive: true,
        config: { platform: "twitter", keywords: ["#NagpurRealEstate", "MIHAN property", "Nagpur metro"] }
      },
      {
        name: "LinkedIn Nagpur Jobs",
        type: "jobs",
        category: "apify",
        url: "https://linkedin.com",
        isActive: true,
        config: { keywords: ["IT", "Software", "Manufacturing"], maxItems: 50 }
      },
      {
        name: "Reddit r/Nagpur",
        type: "social",
        category: "apify",
        url: "https://reddit.com/r/nagpur",
        isActive: true,
        config: { platform: "reddit", keywords: ["property", "real estate", "housing"] }
      },
      {
        name: "Google News Nagpur",
        type: "news",
        category: "apify",
        url: "https://news.google.com",
        isActive: true,
        config: { actorId: "apify/google-search-scraper", keywords: ["Nagpur real estate news", "MIHAN development"] }
      }
    ];
    
    for (const source of intelligenceSources) {
      try {
        await storage.createIntelligenceSource(source);
        console.log(`  Created intelligence source: ${source.name}`);
      } catch (error) {
        console.log(`  Intelligence source ${source.name} may already exist, skipping...`);
      }
    }

    // Seed legal disputes
    console.log("Seeding legal disputes...");
    const legalDisputes = [
      {
        disputeType: "Land Dispute",
        locality: "MIHAN",
        caseNumber: "CIV/2024/1234",
        filedAt: new Date("2024-06-15"),
        currentStatus: "Pending",
        description: "Dispute regarding boundary demarcation between two adjoining plots in MIHAN Sector 3. Case filed by original landowner claiming improper survey.",
        impactLevel: "Medium",
        source: "Nagpur District Court",
        sourceUrl: "https://districts.ecourts.gov.in/nagpur",
        isVisible: true
      },
      {
        disputeType: "Title Issue",
        locality: "Wardha Road",
        caseNumber: "CIV/2023/5678",
        filedAt: new Date("2023-11-20"),
        currentStatus: "Resolved",
        description: "Title dispute resolved in favor of current owner. Clear title confirmed after verification of sale deed chain.",
        impactLevel: "Low",
        source: "Sub-Registrar Office",
        sourceUrl: "https://igrmaharashtra.gov.in",
        isVisible: true
      },
      {
        disputeType: "Encroachment",
        locality: "Hingna",
        caseNumber: "CIV/2024/9012",
        filedAt: new Date("2024-02-10"),
        currentStatus: "Pending",
        description: "Encroachment case filed by NMC regarding unauthorized construction extending into road widening zone. Demolition notice issued.",
        impactLevel: "High",
        source: "NMC Records",
        sourceUrl: "https://nmc.gov.in",
        isVisible: true
      },
      {
        disputeType: "Environmental",
        locality: "Koradi",
        caseNumber: "NGT/2024/0456",
        filedAt: new Date("2024-04-05"),
        currentStatus: "Pending",
        description: "Environmental clearance case for a proposed residential project near Koradi Power Station. NGT hearing pending.",
        impactLevel: "High",
        source: "National Green Tribunal",
        sourceUrl: "https://greentribunal.gov.in",
        isVisible: true
      },
      {
        disputeType: "Land Dispute",
        locality: "Besa",
        caseNumber: "CIV/2023/7890",
        filedAt: new Date("2023-08-12"),
        currentStatus: "Dismissed",
        description: "Frivolous claim by distant relative dismissed by court. Original owner's title upheld.",
        impactLevel: "Low",
        source: "Nagpur District Court",
        sourceUrl: "https://districts.ecourts.gov.in/nagpur",
        isVisible: true
      }
    ];

    for (const dispute of legalDisputes) {
      try {
        await storage.createLegalDispute(dispute);
        console.log(`  Created legal dispute: ${dispute.caseNumber}`);
      } catch (error) {
        console.log(`  Legal dispute ${dispute.caseNumber} may already exist, skipping...`);
      }
    }

    // Seed market intelligence reports
    console.log("Seeding market intelligence...");
    const marketReports = [
      {
        reportDate: new Date(),
        locality: "MIHAN",
        marketTemperature: "HOT",
        priceTrend30d: 8,
        priceTrend90d: 15,
        avgPrice: 4500000,
        avgPricePerSqft: 4500,
        newListingsCount: 45,
        delistedCount: 12,
        daysToSellAvg: 35,
        employmentJobsCount: 1250,
        employmentTrend: "Increasing",
        infrastructureStatus: { projects: ["Metro Phase 2", "MIHAN SEZ Expansion", "International Cargo Hub"] },
        newsSentimentPositive: 75,
        newsSentimentNegative: 10,
        socialBullishPercent: 68,
        legalDisputesCount: 2,
        buyingClarityScore: 8,
        verdict: "Strong buy zone with excellent growth potential. IT/AI hub development driving demand.",
        isVisible: true
      },
      {
        reportDate: new Date(),
        locality: "Wardha Road",
        marketTemperature: "WARM",
        priceTrend30d: 5,
        priceTrend90d: 9,
        avgPrice: 6500000,
        avgPricePerSqft: 6500,
        newListingsCount: 32,
        delistedCount: 8,
        daysToSellAvg: 42,
        employmentJobsCount: 890,
        employmentTrend: "Stable",
        infrastructureStatus: { projects: ["Metro Line Extension", "Hospital Hub Development"] },
        newsSentimentPositive: 65,
        newsSentimentNegative: 15,
        socialBullishPercent: 55,
        legalDisputesCount: 1,
        buyingClarityScore: 7,
        verdict: "Premium corridor with consistent appreciation. Good for end-users seeking quality.",
        isVisible: true
      },
      {
        reportDate: new Date(),
        locality: "Dharampeth",
        marketTemperature: "WARM",
        priceTrend30d: 3,
        priceTrend90d: 6,
        avgPrice: 9500000,
        avgPricePerSqft: 9500,
        newListingsCount: 15,
        delistedCount: 5,
        daysToSellAvg: 60,
        employmentJobsCount: 450,
        employmentTrend: "Stable",
        infrastructureStatus: { projects: ["Heritage Zone Preservation", "Smart City Initiatives"] },
        newsSentimentPositive: 70,
        newsSentimentNegative: 8,
        socialBullishPercent: 52,
        legalDisputesCount: 0,
        buyingClarityScore: 9,
        verdict: "Ultra-premium segment. Limited supply, high demand from elite buyers.",
        isVisible: true
      },
      {
        reportDate: new Date(),
        locality: "Besa",
        marketTemperature: "HOT",
        priceTrend30d: 12,
        priceTrend90d: 22,
        avgPrice: 3200000,
        avgPricePerSqft: 3200,
        newListingsCount: 65,
        delistedCount: 18,
        daysToSellAvg: 28,
        employmentJobsCount: 580,
        employmentTrend: "Increasing",
        infrastructureStatus: { projects: ["Road Expansion", "New School Complex", "Commercial Hub"] },
        newsSentimentPositive: 72,
        newsSentimentNegative: 12,
        socialBullishPercent: 70,
        legalDisputesCount: 1,
        buyingClarityScore: 7,
        verdict: "Emerging hotspot for first-time buyers. Excellent value for money.",
        isVisible: true
      },
      {
        reportDate: new Date(),
        locality: "Hingna",
        marketTemperature: "HOT",
        priceTrend30d: 15,
        priceTrend90d: 28,
        avgPrice: 2800000,
        avgPricePerSqft: 2800,
        newListingsCount: 78,
        delistedCount: 22,
        daysToSellAvg: 25,
        employmentJobsCount: 2100,
        employmentTrend: "Increasing",
        infrastructureStatus: { projects: ["IT Park Phase 2", "Industrial Corridor", "Highway Widening"] },
        newsSentimentPositive: 80,
        newsSentimentNegative: 8,
        socialBullishPercent: 75,
        legalDisputesCount: 1,
        buyingClarityScore: 6,
        verdict: "High-growth investment zone. IT parks driving massive demand.",
        isVisible: true
      }
    ];

    for (const report of marketReports) {
      try {
        await storage.createMarketIntelligence(report);
        console.log(`  Created market intelligence for: ${report.locality}`);
      } catch (error) {
        console.log(`  Market intelligence for ${report.locality} may already exist, skipping...`);
      }
    }

    console.log("Database seed completed successfully!");
    console.log("\nNote: To populate more intelligence data, use the admin dashboard:");
    console.log("  1. Navigate to /admin/web-intelligence");
    console.log("  2. Click 'Collect Now' to gather data from sources");
    console.log("  3. Toggle visibility on items to show them publicly");
  } catch (error) {
    console.error("Seed failed:", error);
    throw error;
  }
}

