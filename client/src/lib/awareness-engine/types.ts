/**
 * Awareness Engine Type Definitions
 * 
 * Core types for the AI-powered content personalization system
 */

// ============================================================================
// AWARENESS LEVELS
// ============================================================================

export type AwarenessLevel = 
  | "Unaware"
  | "Problem Aware"
  | "Solution Aware"
  | "Product Aware"
  | "Most Aware";

export const AWARENESS_LEVEL_ORDER: AwarenessLevel[] = [
  "Unaware",
  "Problem Aware", 
  "Solution Aware",
  "Product Aware",
  "Most Aware"
];

// ============================================================================
// USER SEGMENTS
// ============================================================================

export type UserSegment = 
  | "investor"
  | "homebuyer"
  | "nri"
  | "first_timer"
  | "commercial"
  | "explorer";

export interface UserProfile {
  segment: UserSegment;
  budget_min?: number;
  budget_max?: number;
  timeline?: string;
  preferred_localities?: string[];
  property_types?: string[];
  utm_source?: string;
  utm_campaign?: string;
  device: "mobile" | "desktop" | "tablet";
  referrer?: string;
}

// ============================================================================
// CONTENT BLOCKS
// ============================================================================

export type BlockNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface BlockVisibility {
  show_blocks: BlockNumber[];
  partial_blocks: BlockNumber[];
  hide_blocks: BlockNumber[];
}

export interface ContentBlock {
  id: BlockNumber;
  name: string;
  purpose: string;
  component: string;
}

export const CONTENT_BLOCKS: ContentBlock[] = [
  { id: 1, name: "Market Context", purpose: "Why Nagpur is transforming", component: "MarketContextBlock" },
  { id: 2, name: "Strategy Intro", purpose: "Why investors/NRIs choose Nagpur", component: "StrategyIntroBlock" },
  { id: 3, name: "Value Proposition", purpose: "What NagpurLand offers", component: "ValuePropositionBlock" },
  { id: 4, name: "Strategy Deep-Dive", purpose: "Investment mechanics, timelines", component: "StrategyDeepDiveBlock" },
  { id: 5, name: "Property Listings", purpose: "Personalized property grid", component: "PropertyListingsBlock" },
  { id: 6, name: "Social Proof", purpose: "Stats, testimonials, network", component: "SocialProofBlock" },
  { id: 7, name: "Research Insights", purpose: "Contextual market intelligence", component: "ResearchInsightsBlock" },
  { id: 8, name: "Urgency/Scarcity", purpose: "Time-sensitive signals", component: "UrgencyBlock" },
];

// ============================================================================
// PROPERTY RELEVANCE
// ============================================================================

export interface PropertyRelevanceScore {
  base_score: number;
  budget_fit: number;
  locality_match: number;
  strategy_alignment: number;
  recency_bonus: number;
  scarcity_signal: number;
  engagement_boost: number;
  total_score: number;
}

export interface PropertyMicroInsight {
  type: "price" | "scarcity" | "trending" | "competition" | "value";
  text: string;
  sentiment: "positive" | "neutral" | "urgent";
}

export interface PropertyWithRelevance {
  property_id: string;
  title: string;
  price: string;
  price_numeric: number;
  locality: string;
  property_type: string;
  area_sqft: number;
  relevance_score: number;
  reason_for_inclusion: string;
  micro_insights: PropertyMicroInsight[];
  strategy_tags: string[];
  image_url?: string;
}

// ============================================================================
// RESEARCH INSIGHTS
// ============================================================================

export type InsightCategory = 
  | "market_dynamics"
  | "investment_mechanics"
  | "legal_tax"
  | "locality_specific"
  | "urgency_signal"
  | "comparison";

export interface ResearchInsight {
  id: string;
  category: InsightCategory;
  title: string;
  summary: string;
  relevance_reason: string;
  data_freshness: string;
  source_credibility: "high" | "medium";
}

// ============================================================================
// CTA SYSTEM
// ============================================================================

export type CTAStrength = "soft" | "medium" | "strong" | "strongest";
export type CTAPlacement = "section_end" | "inline_after_listings" | "sticky_bottom" | "floating";

export interface CTAConfig {
  strength: CTAStrength;
  placement: CTAPlacement;
  primary_label: string;
  primary_action: string;
  secondary_label?: string;
  secondary_action?: string;
  tertiary_label?: string;
  tertiary_action?: string;
  urgency_styling: boolean;
  conversion_action: string;
}

// ============================================================================
// BEHAVIOR TRACKING
// ============================================================================

export type InteractionType = 
  | "page_load"
  | "page_load_direct_search"
  | "page_load_ad"
  | "scroll_depth"
  | "property_view"
  | "property_saved"
  | "filter_applied"
  | "research_insight_clicked"
  | "cta_click"
  | "time_on_page"
  | "multi_action";

export type ConversionSignal = 1 | 2 | 3;

export interface BehaviorSignal {
  interaction_type: InteractionType;
  conversion_signal: ConversionSignal;
  timestamp: string;
  session_id: string;
  property_id?: string;
  insight_id?: string;
  filter_values?: Record<string, any>;
  time_spent?: number;
  scroll_percentage?: number;
  cta_label?: string;
  properties_saved?: number;
  research_insight_engaged?: boolean;
}

// ============================================================================
// UI GUIDANCE
// ============================================================================

export type ContentPacing = 
  | "slow_educational"
  | "medium_5_sections"
  | "fast_all_sections";

export type VisualFraming = 
  | "lead_with_education"
  | "lead_with_proof"
  | "lead_with_listings"
  | "lead_with_urgency";

export type Tone = 
  | "educational"
  | "advisory"
  | "urgency-driven";

export type PersonalizationLevel = 
  | "anonymous"
  | "segment-aware"
  | "individual-aware";

export interface UIGuidance {
  cta_strength: CTAStrength;
  cta_placement: CTAPlacement;
  content_pacing: ContentPacing;
  visual_framing: VisualFraming;
  tone: Tone;
  personalization_level: PersonalizationLevel;
}

// ============================================================================
// AWARENESS ENGINE OUTPUT
// ============================================================================

export interface AwarenessEngineOutput {
  // Awareness assessment
  awareness_level: AwarenessLevel;
  awareness_confidence: number;
  awareness_change_signal: "static" | "progressing" | "regressing" | "clarified";
  
  // Content decisions
  content_depth: "low" | "medium" | "medium-high" | "high";
  show_blocks: BlockNumber[];
  partial_blocks: BlockNumber[];
  hide_blocks: BlockNumber[];
  
  // Personalized content
  selected_property_listings: PropertyWithRelevance[];
  research_insights: ResearchInsight[];
  
  // UI configuration
  ui_guidance: UIGuidance;
  cta_config: CTAConfig;
  
  // Behavior logging
  behavior_data_to_log: Partial<BehaviorSignal>;
}

// ============================================================================
// AWARENESS STATE (Context)
// ============================================================================

export interface AwarenessState {
  // Session
  session_id: string;
  user_profile: UserProfile;
  
  // Current awareness
  current_output: AwarenessEngineOutput;
  
  // Behavior history
  behavior_log: BehaviorSignal[];
  total_time_on_site: number;
  properties_viewed: string[];
  properties_saved: string[];
  
  // Computed
  conversion_signal: ConversionSignal;
}

// ============================================================================
// ENGINE INPUT
// ============================================================================

export interface AwarenessEngineInput {
  interaction_id: string;
  user_input: string;
  page_section?: string;
  session_id: string;
  device?: "mobile" | "desktop" | "tablet";
  referrer?: string;
  utm_source?: string;
  utm_campaign?: string;
  time_spent?: number;
  scroll_depth?: number;
  filters_applied?: Record<string, any>;
  timestamp: string;
  
  // Action-specific
  actions?: Array<{
    action: string;
    property_id?: string;
    insight_id?: string;
  }>;
  insight_clicked?: string;
  time_on_insight?: number;
  cta_label?: string;
  properties_saved_count?: number;
}
