import { PropertyWithRelevance, ResearchInsight, UserSegment } from "./types";

export const MOCK_PROPERTIES: PropertyWithRelevance[] = [
  {
    property_id: "prop_mihan_001",
    title: "MIHAN Tech-Corridor Plot 30x40, 1200 sq.ft.",
    price: "28L",
    price_numeric: 2800000,
    locality: "MIHAN",
    property_type: "Plot",
    area_sqft: 1200,
    relevance_score: 92,
    reason_for_inclusion: "Top match for investors; high growth corridor",
    micro_insights: [
      { type: "price", text: "8% below market avg", sentiment: "positive" },
      { type: "scarcity", text: "Only 2 plots left in budget", sentiment: "urgent" },
      { type: "trending", text: "Price trending +12%", sentiment: "positive" }
    ],
    strategy_tags: ["Investor", "High Growth", "Time-sensitive"]
  },
  {
    property_id: "prop_mihan_005",
    title: "MIHAN Residential Plot 25x50, 1250 sq.ft.",
    price: "32L",
    price_numeric: 3200000,
    locality: "MIHAN",
    property_type: "Plot",
    area_sqft: 1250,
    relevance_score: 89,
    reason_for_inclusion: "Premium option; larger plot size",
    micro_insights: [
      { type: "value", text: "Best value per sqft", sentiment: "positive" },
      { type: "competition", text: "3 inquiries this week", sentiment: "urgent" }
    ],
    strategy_tags: ["Investor", "Premium", "High Demand"]
  },
  {
    property_id: "prop_wardha_001",
    title: "Wardha Road Premium 3BHK+Study, 1900 sq.ft.",
    price: "58L",
    price_numeric: 5800000,
    locality: "Wardha Road",
    property_type: "Flat",
    area_sqft: 1900,
    relevance_score: 94,
    reason_for_inclusion: "Perfect NRI match: Mature area, premium finish",
    micro_insights: [
      { type: "value", text: "Rental yield 3.8%", sentiment: "positive" },
      { type: "price", text: "RERA verified", sentiment: "positive" }
    ],
    strategy_tags: ["NRI", "Premium", "Rental Income"]
  },
  {
    property_id: "prop_wardha_002",
    title: "Wardha Road 4BHK Villa, 2200 sq.ft.",
    price: "65L",
    price_numeric: 6500000,
    locality: "Wardha Road",
    property_type: "Villa",
    area_sqft: 2200,
    relevance_score: 91,
    reason_for_inclusion: "Top-tier NRI option; villa with space",
    micro_insights: [
      { type: "scarcity", text: "Only 1 villa available", sentiment: "urgent" },
      { type: "value", text: "Gated community", sentiment: "positive" }
    ],
    strategy_tags: ["NRI", "Luxury", "Family Home"]
  },
  {
    property_id: "prop_besa_001",
    title: "Besa Affordable 2BHK, 950 sq.ft.",
    price: "22L",
    price_numeric: 2200000,
    locality: "Besa",
    property_type: "Flat",
    area_sqft: 950,
    relevance_score: 86,
    reason_for_inclusion: "First-timer friendly; affordable entry point",
    micro_insights: [
      { type: "price", text: "Lowest in category", sentiment: "positive" },
      { type: "trending", text: "Area growth +18% YoY", sentiment: "positive" }
    ],
    strategy_tags: ["First-Timer", "Affordable", "Growing Area"]
  },
  {
    property_id: "prop_hingna_001",
    title: "Hingna Industrial Plot, 2400 sq.ft.",
    price: "18L",
    price_numeric: 1800000,
    locality: "Hingna",
    property_type: "Plot",
    area_sqft: 2400,
    relevance_score: 88,
    reason_for_inclusion: "Highest rental yield zone; commercial potential",
    micro_insights: [
      { type: "value", text: "5.1% rental yield", sentiment: "positive" },
      { type: "trending", text: "Industrial demand +25%", sentiment: "positive" }
    ],
    strategy_tags: ["Investor", "Commercial", "High Yield"]
  }
];

export const MOCK_INSIGHTS: Record<UserSegment, ResearchInsight[]> = {
  investor: [
    {
      id: "inv_001",
      category: "market_dynamics",
      title: "MIHAN Market Behavior: Inventory Scarcity Drives Price Acceleration",
      summary: "MIHAN zone inventory down 12% YoY. New listings see price acceleration of 12–15% within 90 days. Early-mover advantage still exists.",
      relevance_reason: "You're searching MIHAN now; scarcity window is narrowing. Act within 30–60 days for best terms.",
      data_freshness: "Jan 2026",
      source_credibility: "high"
    },
    {
      id: "inv_002",
      category: "investment_mechanics",
      title: "Investment Mechanics: Plot vs. Flat for MIHAN Investors",
      summary: "MIHAN plots: 8–12% appreciation, low rental yield (1–2%), liquidity 6–12 months. Best for long-term capital appreciation.",
      relevance_reason: "You're evaluating plots; 8–12 year hold captures full MIHAN infrastructure development cycle.",
      data_freshness: "Jan 2026",
      source_credibility: "high"
    },
    {
      id: "inv_003",
      category: "urgency_signal",
      title: "Urgency Signal: MIHAN Scarcity Window",
      summary: "Similar properties at this price point get 2–3 inquiries within 48 hours. Decision timeline should be 7–14 days, not 60.",
      relevance_reason: "With scarcity + your 90-day timeline, momentum matters. First-mover advantage expires fast.",
      data_freshness: "Jan 2026",
      source_credibility: "high"
    }
  ],
  nri: [
    {
      id: "nri_001",
      category: "legal_tax",
      title: "NRI Tax Angle: Capital Gains & Primary Residence Exemption",
      summary: "Residential property held 2+ years = 20% flat tax on gains (vs 30% short-term). Claim primary residence exemption to eliminate gains tax completely.",
      relevance_reason: "As an NRI planning a 5–10 year hold, long-term capital gains rate + exemption planning matters for net returns.",
      data_freshness: "Jan 2026",
      source_credibility: "high"
    },
    {
      id: "nri_002",
      category: "comparison",
      title: "NRI Investment: Why Nagpur's Tier-2 Appeal",
      summary: "Lower entry price (45–65L vs Mumbai 1Cr+), stable rental yield (3.5–4%), mature areas with expat networks. Growing IT corridor adds upside.",
      relevance_reason: "You're comparing Nagpur to other cities; Tier-2 benefits: affordable + growth potential without Mumbai volatility.",
      data_freshness: "Jan 2026",
      source_credibility: "high"
    },
    {
      id: "nri_003",
      category: "locality_specific",
      title: "Wardha Road NRI Profile: Established Expat Network",
      summary: "Wardha Road has 150+ NRI families (verified data). Rental pool: IT professionals, corporate expats. Rental yield stable 3.5–4%.",
      relevance_reason: "You'll have community + predictable rental income. This area is NRI-proven.",
      data_freshness: "Jan 2026",
      source_credibility: "high"
    }
  ],
  homebuyer: [
    {
      id: "hb_001",
      category: "locality_specific",
      title: "Family-Friendly Neighborhoods: Schools & Hospitals",
      summary: "Wardha Road leads with 5 top schools within 2km. Besa growing fast with new hospital. Civil Lines for established infrastructure.",
      relevance_reason: "For families, proximity to schools and healthcare is non-negotiable. These areas score highest.",
      data_freshness: "Jan 2026",
      source_credibility: "high"
    },
    {
      id: "hb_002",
      category: "investment_mechanics",
      title: "Ready-to-Move vs Under-Construction: What's Better?",
      summary: "Ready homes: 10-15% premium but no risk. Under-construction: 15-20% savings but 2-3 year wait + builder risk.",
      relevance_reason: "Your timeline determines the right choice. Immediate need = ready homes. Can wait = under-construction savings.",
      data_freshness: "Jan 2026",
      source_credibility: "medium"
    }
  ],
  first_timer: [
    {
      id: "ft_001",
      category: "market_dynamics",
      title: "First-Timer's Guide: Understanding Nagpur Real Estate",
      summary: "Nagpur prices: ₹2,500-8,000/sqft depending on area. RERA mandatory. Always verify: title deed, encumbrance certificate, building approval.",
      relevance_reason: "As a first-timer, these basics protect you from 90% of common mistakes. Start here.",
      data_freshness: "Jan 2026",
      source_credibility: "high"
    },
    {
      id: "ft_002",
      category: "legal_tax",
      title: "Legal Checklist: What to Verify Before Buying",
      summary: "Must-check: RERA registration, clear title, no encumbrance, approved building plan, occupancy certificate (for ready homes).",
      relevance_reason: "Skip any of these = potential legal nightmare. We verify all properties against this checklist.",
      data_freshness: "Jan 2026",
      source_credibility: "high"
    }
  ],
  commercial: [
    {
      id: "com_001",
      category: "market_dynamics",
      title: "Commercial Real Estate: Hingna Industrial Zone",
      summary: "Hingna MIDC: 5.1% rental yields, growing industrial demand. IT Park Zone: 4.2% yields, tech company influx.",
      relevance_reason: "Commercial buyers get best yields in industrial zones. Retail/office in IT corridors.",
      data_freshness: "Jan 2026",
      source_credibility: "high"
    }
  ],
  explorer: [
    {
      id: "exp_001",
      category: "market_dynamics",
      title: "Nagpur 2026: The Transformation Story",
      summary: "Metro Phase 2 underway, IT Park approved, 15,000+ jobs coming. Property prices expected to rise 25-40% over 3-5 years.",
      relevance_reason: "Understanding the macro picture helps you decide if Nagpur fits your investment thesis.",
      data_freshness: "Jan 2026",
      source_credibility: "high"
    }
  ]
};

export function getPropertiesForSegment(segment: UserSegment): PropertyWithRelevance[] {
  switch (segment) {
    case "investor":
      return MOCK_PROPERTIES.filter(p => p.strategy_tags.includes("Investor") || p.strategy_tags.includes("High Growth"));
    case "nri":
      return MOCK_PROPERTIES.filter(p => p.strategy_tags.includes("NRI") || p.strategy_tags.includes("Premium"));
    case "homebuyer":
      return MOCK_PROPERTIES.filter(p => p.property_type === "Flat" || p.property_type === "Villa");
    case "first_timer":
      return MOCK_PROPERTIES.filter(p => p.strategy_tags.includes("First-Timer") || p.strategy_tags.includes("Affordable"));
    case "commercial":
      return MOCK_PROPERTIES.filter(p => p.strategy_tags.includes("Commercial") || p.strategy_tags.includes("High Yield"));
    default:
      return MOCK_PROPERTIES.slice(0, 4);
  }
}

export function getInsightsForSegment(segment: UserSegment): ResearchInsight[] {
  return MOCK_INSIGHTS[segment] || MOCK_INSIGHTS.explorer;
}
