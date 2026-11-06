# Awareness Engine - Design Document

## Overview

The Awareness Engine is an AI-powered content personalization system that dynamically adapts the user experience based on their journey stage, behavior signals, and conversion readiness. It transforms static property listings into intelligent, context-aware experiences.

---

## Core Concepts

### 1. Awareness Levels (5 Stages)

```
┌─────────────────────────────────────────────────────────────────────┐
│  UNAWARE → PROBLEM AWARE → SOLUTION AWARE → PRODUCT AWARE → MOST AWARE  │
└─────────────────────────────────────────────────────────────────────┘
```

| Level | Description | Content Strategy | CTA Strength |
|-------|-------------|------------------|--------------|
| **Unaware** | Don't know Nagpur opportunity exists | Lead with education, market context | Soft (Learn More) |
| **Problem Aware** | Know they want to invest, unsure where | Show why Nagpur, compare cities | Medium (Explore) |
| **Solution Aware** | Know Nagpur is good, evaluating options | Strategy-focused, locality comparison | Medium (Compare) |
| **Product Aware** | Looking at specific properties | Property details, legal, ROI | Strong (Get Details) |
| **Most Aware** | Ready to act, comparing final options | Urgency, scarcity, direct action | Strongest (Book Now) |

---

### 2. User Segments

```typescript
type UserSegment = 
  | "investor"           // Capital appreciation focus
  | "homebuyer"          // End-use residential
  | "nri"                // Overseas wealth parking
  | "first_timer"        // New to real estate
  | "commercial"         // Business/retail focus
  | "explorer";          // Casual browsing
```

---

## Architecture

### System Flow

```
┌──────────────┐     ┌─────────────────┐     ┌──────────────────┐
│  User Action │ ──▶ │ Behavior Logger │ ──▶ │ Awareness Engine │
└──────────────┘     └─────────────────┘     └──────────────────┘
                                                      │
                            ┌─────────────────────────┼─────────────────────────┐
                            ▼                         ▼                         ▼
                   ┌────────────────┐       ┌────────────────┐       ┌────────────────┐
                   │ Block Selector │       │ Property Ranker │       │ CTA Optimizer  │
                   └────────────────┘       └────────────────┘       └────────────────┘
                            │                         │                         │
                            └─────────────────────────┼─────────────────────────┘
                                                      ▼
                                            ┌──────────────────┐
                                            │ Personalized UI  │
                                            └──────────────────┘
```

---

## Content Block System

### Block Types (1-8)

| Block | Name | Purpose | When to Show |
|-------|------|---------|--------------|
| **1** | Market Context | "Why Nagpur is transforming" | Unaware, Problem Aware |
| **2** | Strategy Intro | "Why NRIs/Investors choose Nagpur" | Problem Aware, Solution Aware |
| **3** | Value Proposition | "What NagpurLand offers differently" | Solution Aware, Product Aware |
| **4** | Strategy Deep-Dive | Investment mechanics, timelines | Solution Aware, Product Aware |
| **5** | Property Listings | Personalized property grid | Product Aware, Most Aware |
| **6** | Social Proof | Stats, testimonials, network size | All levels (varies) |
| **7** | Research Insights | Contextual market intelligence | Solution+, on engagement |
| **8** | Urgency/Scarcity | Time-sensitive signals | Most Aware, high intent |

### Block Visibility Logic

```typescript
interface BlockVisibility {
  show_blocks: number[];      // Full visibility
  partial_blocks: number[];   // Collapsed/teaser state
  hide_blocks: number[];      // Hidden entirely
}

// Example for "Product Aware" user:
{
  show_blocks: [4, 5, 6, 7],
  partial_blocks: [8],
  hide_blocks: [1, 2, 3]
}
```

---

## Property Relevance Scoring

### Scoring Factors

```typescript
interface PropertyRelevanceScore {
  base_score: number;           // 0-100 based on filter match
  budget_fit: number;           // How close to stated budget
  locality_match: number;       // Matches preferred areas
  strategy_alignment: number;   // Fits investment strategy
  recency_bonus: number;        // New listings get boost
  scarcity_signal: number;      // Limited availability bonus
  engagement_boost: number;     // Previously viewed/saved
}
```

### Micro-Insights per Property

```typescript
interface PropertyMicroInsights {
  property_id: string;
  insights: string[];  // Max 3 per property
  // Examples:
  // "Price 8% below market"
  // "Only 1 other in this budget"
  // "3 inquiries in last 48 hours"
  // "Price trending up +12%"
  strategy_tags: string[];
  // Examples: ["Investor", "Time-sensitive", "Scarcity signal"]
}
```

---

## Research Insights System

### Insight Categories

```typescript
type InsightCategory = 
  | "market_dynamics"     // Supply/demand, price trends
  | "investment_mechanics" // ROI, hold periods, exit strategy
  | "legal_tax"           // RERA, capital gains, compliance
  | "locality_specific"   // Area-specific intelligence
  | "urgency_signal"      // Time-sensitive opportunities
  | "comparison";         // vs other cities/options
```

### Insight Structure

```typescript
interface ResearchInsight {
  id: string;
  category: InsightCategory;
  title: string;           // Bold headline
  summary: string;         // 2-3 sentence explanation
  relevance_reason: string; // Why this matters to THIS user
  data_freshness: Date;    // When data was last verified
  source_credibility: "high" | "medium"; // Data source quality
}
```

---

## Adaptive CTA System

### CTA Strength Levels

| Strength | Visual Style | Placement | Examples |
|----------|--------------|-----------|----------|
| **Soft** | Ghost/outline button | End of section | "Learn More", "Explore" |
| **Medium** | Filled secondary | Inline after content | "Compare Options", "Save for Later" |
| **Strong** | Primary filled, prominent | Inline after listings | "Get Legal Checkup", "Schedule Visit" |
| **Strongest** | Accent color, urgency styling | Sticky/floating | "Book Now", "Claim This Deal" |

### CTA Personalization

```typescript
interface CTAConfig {
  strength: "soft" | "medium" | "strong" | "strongest";
  placement: "section_end" | "inline_after_listings" | "sticky_bottom" | "floating";
  primary_label: string;
  secondary_label?: string;
  tertiary_label?: string;  // Usually WhatsApp
  urgency_styling: boolean;
  conversion_action: string; // Analytics tracking
}
```

---

## Behavior Tracking

### Tracked Signals

```typescript
interface BehaviorSignal {
  interaction_type: 
    | "page_load" 
    | "scroll_depth" 
    | "property_view" 
    | "property_saved" 
    | "filter_applied" 
    | "research_insight_clicked"
    | "cta_click"
    | "time_on_page";
  
  conversion_signal: 1 | 2 | 3;  // 1=low, 2=medium, 3=high intent
  timestamp: Date;
  session_id: string;
  
  // Optional context
  property_id?: string;
  insight_id?: string;
  filter_values?: Record<string, any>;
  time_spent?: number;
  scroll_percentage?: number;
}
```

### Conversion Signal Calculation

```
Signal 1 (Low):     Page view, <30s, <25% scroll
Signal 2 (Medium):  60s+, 50%+ scroll, 1+ property views
Signal 3 (High):    Property saved, CTA clicked, filter applied, 3min+
```

---

## UI Component Structure

### Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    AWARENESS HEADER                          │
│  (Personalized headline based on segment + awareness)        │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    DYNAMIC CONTENT BLOCKS                    │
│  Block 1: [HIDDEN/SHOWN based on awareness]                  │
│  Block 2: [HIDDEN/SHOWN based on awareness]                  │
│  ...                                                         │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    PROPERTY GRID                             │
│  Personalized listings with relevance scores + micro-insights│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    RESEARCH INSIGHTS                         │
│  Contextual cards based on user behavior                     │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    ADAPTIVE CTA ZONE                         │
│  Primary + Secondary + Tertiary actions                      │
└─────────────────────────────────────────────────────────────┘
```

---

## State Management

### Awareness State

```typescript
interface AwarenessState {
  // User context
  session_id: string;
  segment: UserSegment;
  
  // Awareness tracking
  awareness_level: AwarenessLevel;
  awareness_confidence: number;  // 0-100
  awareness_change_signal: "static" | "progressing" | "regressing";
  
  // Content decisions
  content_depth: "low" | "medium" | "high";
  visible_blocks: BlockVisibility;
  
  // Personalization
  selected_properties: PropertyWithRelevance[];
  research_insights: ResearchInsight[];
  cta_config: CTAConfig;
  
  // Behavior history
  behavior_log: BehaviorSignal[];
  total_time_on_site: number;
  properties_viewed: string[];
  properties_saved: string[];
}
```

---

## Component Hierarchy

```
AwarenessProvider (Context)
├── AwarenessHeader
├── ContentBlockContainer
│   ├── MarketContextBlock (1)
│   ├── StrategyIntroBlock (2)
│   ├── ValuePropositionBlock (3)
│   ├── StrategyDeepDiveBlock (4)
│   ├── SocialProofBlock (6)
│   └── UrgencyBlock (8)
├── PersonalizedPropertyGrid (5)
│   └── PropertyCardWithInsights
│       ├── RelevanceScore
│       ├── MicroInsights
│       └── StrategyTags
├── ResearchInsightsPanel (7)
│   └── InsightCard
└── AdaptiveCTAZone
    ├── PrimaryCTA
    ├── SecondaryCTA
    └── WhatsAppCTA
```

---

## Visual Design Tokens

### Awareness Level Colors

```css
--awareness-unaware: slate-400
--awareness-problem: amber-500
--awareness-solution: blue-500
--awareness-product: indigo-600
--awareness-most: green-500
```

### CTA Strength Styles

```css
/* Soft */
.cta-soft { @apply border border-slate-300 text-slate-700 bg-transparent hover:bg-slate-50; }

/* Medium */
.cta-medium { @apply bg-slate-900 text-white hover:bg-slate-800; }

/* Strong */
.cta-strong { @apply bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg; }

/* Strongest */
.cta-strongest { @apply bg-green-600 text-white hover:bg-green-700 shadow-xl animate-pulse-subtle; }
```

### Urgency Styling

```css
.urgency-badge { @apply bg-red-100 text-red-700 border border-red-200; }
.scarcity-signal { @apply text-orange-600 font-bold; }
.trending-up { @apply text-green-600; }
.trending-down { @apply text-red-600; }
```

---

## Implementation Phases

### Phase 1: Core Infrastructure
- [ ] AwarenessContext provider
- [ ] Behavior tracking hooks
- [ ] Block visibility logic

### Phase 2: Content Blocks
- [ ] All 8 content block components
- [ ] Block animation/transitions
- [ ] Mobile-optimized layouts

### Phase 3: Property Personalization
- [ ] Relevance scoring algorithm
- [ ] Micro-insights generation
- [ ] Strategy tag system

### Phase 4: Research Insights
- [ ] Insight card component
- [ ] Category-based styling
- [ ] Relevance matching

### Phase 5: CTA System
- [ ] Adaptive CTA component
- [ ] Strength-based styling
- [ ] Conversion tracking

### Phase 6: User Journey Flows
- [ ] Investor journey
- [ ] NRI journey
- [ ] Homebuyer journey
- [ ] First-timer journey

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Avg. time on site | 2m 30s | 4m+ |
| Scroll depth | 45% | 70%+ |
| Property saves | 0.3/session | 1.5+/session |
| CTA click rate | 2% | 8%+ |
| Lead conversion | 1% | 5%+ |

---

## Next Steps

1. **Review this design** with stakeholders
2. **Prioritize** which user segment to build first (recommend: Investor)
3. **Create component library** for all UI elements
4. **Implement Phase 1** core infrastructure
5. **Build one complete journey** end-to-end as proof of concept
