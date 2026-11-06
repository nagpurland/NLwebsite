import { storage } from "../storage";
import type { BuyerEvent, Property, Lead, SearchRequirement, AiInsight } from "@shared/schema";

export interface BuyerProfile {
  sessionId: string;
  viewedProperties: number[];
  viewedLocalities: string[];
  budgetRange: { min: number; max: number } | null;
  preferredBHK: string[];
  preferredTypes: string[];
  engagementScore: number;
  intentSignals: string[];
  awarenessLevel: 'unaware' | 'problem_aware' | 'solution_aware' | 'product_aware' | 'most_aware';
}

export interface PropertyInsights {
  riskScore: number;
  investmentScore: number;
  riskFactors: string[];
  investmentFactors: string[];
  priceComparison: string;
  localityTrend: string;
}

export interface LocalityInsights {
  growthPotential: 'high' | 'medium' | 'low';
  demandLevel: 'high' | 'medium' | 'low';
  topBudgetRange: string;
  popularPropertyTypes: string[];
  investmentOutlook: string;
}

const NAGPUR_LOCALITY_DATA: Record<string, {
  avgPriceSqft: number;
  growthRate: number;
  demandScore: number;
  infrastructure: number;
  riskLevel: 'low' | 'medium' | 'high';
}> = {
  'Dharampeth': { avgPriceSqft: 8500, growthRate: 5, demandScore: 85, infrastructure: 90, riskLevel: 'low' },
  'Ramdaspeth': { avgPriceSqft: 9000, growthRate: 4, demandScore: 80, infrastructure: 88, riskLevel: 'low' },
  'Civil Lines': { avgPriceSqft: 10000, growthRate: 3, demandScore: 75, infrastructure: 95, riskLevel: 'low' },
  'MIHAN': { avgPriceSqft: 4500, growthRate: 15, demandScore: 90, infrastructure: 70, riskLevel: 'medium' },
  'Wardha Road': { avgPriceSqft: 4000, growthRate: 12, demandScore: 88, infrastructure: 65, riskLevel: 'medium' },
  'Besa': { avgPriceSqft: 3500, growthRate: 18, demandScore: 85, infrastructure: 55, riskLevel: 'medium' },
  'Manish Nagar': { avgPriceSqft: 4200, growthRate: 10, demandScore: 82, infrastructure: 60, riskLevel: 'medium' },
  'Hingna': { avgPriceSqft: 3000, growthRate: 20, demandScore: 78, infrastructure: 50, riskLevel: 'high' },
  'Koradi': { avgPriceSqft: 2500, growthRate: 8, demandScore: 60, infrastructure: 40, riskLevel: 'high' },
  'Gittikhadan': { avgPriceSqft: 3200, growthRate: 7, demandScore: 65, infrastructure: 55, riskLevel: 'medium' }
};

export class InsightEngine {
  
  async analyzeBuyerBehavior(sessionId: string): Promise<BuyerProfile> {
    const events = await storage.getEventsBySession(sessionId);
    
    const profile: BuyerProfile = {
      sessionId,
      viewedProperties: [],
      viewedLocalities: [],
      budgetRange: null,
      preferredBHK: [],
      preferredTypes: [],
      engagementScore: 0,
      intentSignals: [],
      awarenessLevel: 'unaware'
    };

    const propertyViews = events.filter(e => e.eventType === 'property_view');
    const localityViews = events.filter(e => e.eventType === 'locality_view');
    const searches = events.filter(e => e.eventType === 'search');
    const leadSubmissions = events.filter(e => e.eventType === 'lead_submit');
    const filterChanges = events.filter(e => e.eventType === 'filter_change');

    // Extract viewed properties
    profile.viewedProperties = propertyViews
      .filter(e => e.propertyId)
      .map(e => e.propertyId as number);

    // Calculate engagement score
    let engagementPoints = 0;
    engagementPoints += propertyViews.length * 5;
    engagementPoints += localityViews.length * 3;
    engagementPoints += searches.length * 2;
    engagementPoints += filterChanges.length * 1;
    engagementPoints += leadSubmissions.length * 20;

    // Time on site factor
    const totalTimeSpent = events.reduce((sum, e) => sum + (e.timeSpent || 0), 0);
    engagementPoints += Math.min(totalTimeSpent / 60, 30); // Max 30 points for time

    // Scroll depth factor
    const avgScrollDepth = events.reduce((sum, e) => sum + (e.scrollDepth || 0), 0) / (events.length || 1);
    engagementPoints += avgScrollDepth / 10;

    profile.engagementScore = Math.min(Math.round(engagementPoints), 100);

    // Determine awareness level based on behavior
    if (leadSubmissions.length > 0) {
      profile.awarenessLevel = 'most_aware';
      profile.intentSignals.push('Submitted inquiry form');
    } else if (propertyViews.length >= 5) {
      profile.awarenessLevel = 'product_aware';
      profile.intentSignals.push('Actively comparing properties');
    } else if (filterChanges.length >= 3) {
      profile.awarenessLevel = 'solution_aware';
      profile.intentSignals.push('Refining search criteria');
    } else if (searches.length >= 2) {
      profile.awarenessLevel = 'problem_aware';
      profile.intentSignals.push('Researching market');
    }

    // Extract preferences from event data
    for (const event of events) {
      const data = event.eventData as any;
      if (data?.budget) {
        profile.budgetRange = this.parseBudgetRange(data.budget);
      }
      if (data?.bhk && !profile.preferredBHK.includes(data.bhk)) {
        profile.preferredBHK.push(data.bhk);
      }
      if (data?.propertyType && !profile.preferredTypes.includes(data.propertyType)) {
        profile.preferredTypes.push(data.propertyType);
      }
      if (data?.locality && !profile.viewedLocalities.includes(data.locality)) {
        profile.viewedLocalities.push(data.locality);
      }
    }

    return profile;
  }

  analyzeProperty(property: Property): PropertyInsights {
    const locality = property.locality;
    const localityData = NAGPUR_LOCALITY_DATA[locality] || {
      avgPriceSqft: 4000,
      growthRate: 8,
      demandScore: 70,
      infrastructure: 60,
      riskLevel: 'medium'
    };

    const riskFactors: string[] = [];
    const investmentFactors: string[] = [];
    let riskScore = 50;
    let investmentScore = 50;

    // Calculate price per sqft
    const pricePerSqft = property.priceNumeric && property.areaNumeric
      ? property.priceNumeric / property.areaNumeric
      : localityData.avgPriceSqft;

    // Price comparison
    const priceDiff = ((pricePerSqft - localityData.avgPriceSqft) / localityData.avgPriceSqft) * 100;
    let priceComparison: string;
    
    if (priceDiff < -15) {
      priceComparison = 'Significantly below market rate - verify details';
      riskFactors.push('Price significantly below market average');
      riskScore += 15;
    } else if (priceDiff < -5) {
      priceComparison = 'Below market rate - good value';
      investmentFactors.push('Priced below market average');
      investmentScore += 10;
    } else if (priceDiff <= 10) {
      priceComparison = 'At market rate';
    } else {
      priceComparison = 'Above market rate';
      riskFactors.push('Premium pricing compared to locality');
    }

    // Verification status
    if (!property.isVerified) {
      riskFactors.push('Property not yet verified');
      riskScore += 10;
    } else {
      investmentFactors.push('Verified property');
      investmentScore += 10;
    }

    // Locality factors
    if (localityData.growthRate > 12) {
      investmentFactors.push(`High growth area (${localityData.growthRate}% YoY)`);
      investmentScore += 15;
    }

    if (localityData.demandScore > 80) {
      investmentFactors.push('High demand locality');
      investmentScore += 10;
    }

    if (localityData.infrastructure < 50) {
      riskFactors.push('Developing infrastructure');
      riskScore += 10;
    } else if (localityData.infrastructure > 80) {
      investmentFactors.push('Well-developed infrastructure');
      investmentScore += 5;
    }

    if (localityData.riskLevel === 'high') {
      riskFactors.push('Emerging area with higher risk');
      riskScore += 15;
    }

    // Normalize scores
    riskScore = Math.min(Math.max(riskScore, 0), 100);
    investmentScore = Math.min(Math.max(investmentScore, 0), 100);

    // Locality trend
    let localityTrend: string;
    if (localityData.growthRate > 15) {
      localityTrend = 'Rapidly appreciating';
    } else if (localityData.growthRate > 10) {
      localityTrend = 'Strong growth';
    } else if (localityData.growthRate > 5) {
      localityTrend = 'Steady growth';
    } else {
      localityTrend = 'Stable market';
    }

    return {
      riskScore,
      investmentScore,
      riskFactors,
      investmentFactors,
      priceComparison,
      localityTrend
    };
  }

  analyzeLocality(localityName: string): LocalityInsights {
    const data = NAGPUR_LOCALITY_DATA[localityName];
    
    if (!data) {
      return {
        growthPotential: 'medium',
        demandLevel: 'medium',
        topBudgetRange: '40 Lac - 80 Lac',
        popularPropertyTypes: ['Apartment', 'Plot'],
        investmentOutlook: 'Moderate investment potential with steady growth expected.'
      };
    }

    const growthPotential = data.growthRate > 12 ? 'high' : data.growthRate > 6 ? 'medium' : 'low';
    const demandLevel = data.demandScore > 80 ? 'high' : data.demandScore > 60 ? 'medium' : 'low';

    // Calculate budget range from avg price
    const minBudget = data.avgPriceSqft * 800; // Assuming 800 sqft minimum
    const maxBudget = data.avgPriceSqft * 2000; // Assuming 2000 sqft maximum
    const topBudgetRange = `${this.formatBudget(minBudget)} - ${this.formatBudget(maxBudget)}`;

    // Popular types based on price range
    let popularPropertyTypes: string[];
    if (data.avgPriceSqft > 7000) {
      popularPropertyTypes = ['Apartment', 'Villa'];
    } else if (data.avgPriceSqft > 4000) {
      popularPropertyTypes = ['Apartment', 'Independent House'];
    } else {
      popularPropertyTypes = ['Plot', 'Apartment', 'Independent House'];
    }

    let investmentOutlook: string;
    if (growthPotential === 'high' && demandLevel === 'high') {
      investmentOutlook = `Excellent investment opportunity with ${data.growthRate}% YoY appreciation. Strong rental demand and infrastructure development.`;
    } else if (growthPotential === 'high') {
      investmentOutlook = `High growth potential with ${data.growthRate}% appreciation expected. Early investment recommended.`;
    } else if (demandLevel === 'high') {
      investmentOutlook = 'Stable investment with consistent demand. Good for end-use buyers.';
    } else {
      investmentOutlook = 'Moderate investment potential. Suitable for long-term investors.';
    }

    return {
      growthPotential,
      demandLevel,
      topBudgetRange,
      popularPropertyTypes,
      investmentOutlook
    };
  }

  async generateLeadScore(lead: Lead): Promise<{
    intentScore: number;
    awarenessLevel: string;
    priorityLevel: 'hot' | 'warm' | 'cold';
    recommendedActions: string[];
  }> {
    let intentScore = 30; // Base score
    const recommendedActions: string[] = [];

    // Budget indicates serious intent
    if (lead.budget) {
      const budgetNum = this.extractBudgetNumber(lead.budget);
      if (budgetNum > 10000000) {
        intentScore += 20;
      } else if (budgetNum > 5000000) {
        intentScore += 15;
      } else if (budgetNum > 0) {
        intentScore += 10;
      }
    }

    // Specific locality preference shows research
    if (lead.locality) {
      intentScore += 15;
    }

    // Detailed message indicates engagement
    if (lead.message && lead.message.length > 50) {
      intentScore += 10;
    }

    // Check if lead has viewed properties (from interested property)
    if (lead.interestedPropertyId) {
      intentScore += 20;
      recommendedActions.push('Follow up with similar property recommendations');
    }

    // Source-based scoring
    if (lead.source === 'property_inquiry') {
      intentScore += 15;
    } else if (lead.source === 'search_requirement') {
      intentScore += 10;
    }

    intentScore = Math.min(intentScore, 100);

    // Determine awareness level
    let awarenessLevel: string;
    if (intentScore >= 70) {
      awarenessLevel = 'most_aware';
    } else if (intentScore >= 50) {
      awarenessLevel = 'product_aware';
    } else if (intentScore >= 30) {
      awarenessLevel = 'solution_aware';
    } else {
      awarenessLevel = 'problem_aware';
    }

    // Priority level
    let priorityLevel: 'hot' | 'warm' | 'cold';
    if (intentScore >= 70) {
      priorityLevel = 'hot';
      recommendedActions.push('Call within 24 hours');
      recommendedActions.push('Prepare personalized property shortlist');
    } else if (intentScore >= 40) {
      priorityLevel = 'warm';
      recommendedActions.push('Send property recommendations via email');
      recommendedActions.push('Schedule follow-up in 3 days');
    } else {
      priorityLevel = 'cold';
      recommendedActions.push('Add to nurturing email sequence');
      recommendedActions.push('Share locality guides and market updates');
    }

    return {
      intentScore,
      awarenessLevel,
      priorityLevel,
      recommendedActions
    };
  }

  async generateSearchInsights(requirement: any): Promise<{
    recommendedLocalities: string[];
    marketSentiment: string;
    investmentScore: number;
    nextSteps: string[];
    riskFactors: string[];
    opportunityScore: number;
    localMarketTrends: string[];
  }> {
    const insights = {
      recommendedLocalities: [] as string[],
      marketSentiment: 'Neutral',
      investmentScore: 50,
      nextSteps: [] as string[],
      riskFactors: [] as string[],
      opportunityScore: 50,
      localMarketTrends: [
        'MIHAN showing 12% YoY appreciation',
        'Wardha Road infrastructure improving with Metro expansion',
        'New IT parks boosting demand in Hingna corridor'
      ]
    };

    // Budget-based locality recommendations
    const budgetNum = this.extractBudgetNumber(requirement.budget || '');
    
    if (budgetNum < 5000000) {
      insights.recommendedLocalities = ['Besa', 'Hingna', 'Koradi'];
      insights.investmentScore = 65;
      insights.marketSentiment = 'Affordable segment - Good entry point';
    } else if (budgetNum < 10000000) {
      insights.recommendedLocalities = ['MIHAN', 'Wardha Road', 'Manish Nagar'];
      insights.investmentScore = 80;
      insights.marketSentiment = 'High Growth Potential - Emerging corridors';
    } else if (budgetNum < 20000000) {
      insights.recommendedLocalities = ['Dharampeth', 'Ramdaspeth', 'Gittikhadan'];
      insights.investmentScore = 70;
      insights.marketSentiment = 'Premium Segment - Stable appreciation';
    } else {
      insights.recommendedLocalities = ['Civil Lines', 'Dharampeth', 'Ramdaspeth'];
      insights.investmentScore = 60;
      insights.marketSentiment = 'Ultra-Premium - Limited inventory, stable demand';
    }

    // Timeline-based recommendations
    const timeline = (requirement.timeline || '').toLowerCase();
    if (timeline.includes('immediate') || timeline.includes('1 month')) {
      insights.nextSteps.push('Schedule site visits for verified layouts');
      insights.nextSteps.push('Check RERA approval status');
      insights.opportunityScore = 85;
    } else if (timeline.includes('3 month') || timeline.includes('6 month')) {
      insights.nextSteps.push('Monitor price trends in shortlisted areas');
      insights.nextSteps.push('Compare builder track records');
      insights.opportunityScore = 70;
    } else {
      insights.nextSteps.push('Subscribe to locality price alerts');
      insights.nextSteps.push('Track upcoming infrastructure projects');
      insights.opportunityScore = 55;
    }

    // Category-based insights
    const category = (requirement.category || '').toLowerCase();
    if (category.includes('investment')) {
      insights.riskFactors.push('Market volatility in emerging areas');
      insights.riskFactors.push('Builder credibility verification needed');
      insights.nextSteps.push('Analyze rental yield potential (3-4% in Nagpur)');
    } else if (category.includes('end use') || category.includes('home')) {
      insights.nextSteps.push('Check proximity to schools and hospitals');
      insights.nextSteps.push('Verify water and electricity supply');
    }

    return insights;
  }

  async storeInsight(
    sessionId: string | null,
    type: string,
    title: string,
    description: string,
    data: any,
    confidence: number
  ): Promise<AiInsight> {
    return await storage.createInsight({
      sessionId,
      insightType: type,
      title,
      description,
      data,
      confidence
    });
  }

  private parseBudgetRange(budget: string): { min: number; max: number } | null {
    const num = this.extractBudgetNumber(budget);
    if (num > 0) {
      return { min: num * 0.8, max: num * 1.2 };
    }
    return null;
  }

  private extractBudgetNumber(budget: string): number {
    const lower = budget.toLowerCase();
    const numMatch = lower.match(/[\d.]+/);
    if (!numMatch) return 0;

    const num = parseFloat(numMatch[0]);
    if (lower.includes('cr') || lower.includes('crore')) {
      return num * 10000000;
    } else if (lower.includes('lac') || lower.includes('lakh')) {
      return num * 100000;
    }
    return num;
  }

  private formatBudget(amount: number): string {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(0)} Lac`;
    }
    return amount.toString();
  }
}

export const insightEngine = new InsightEngine();
