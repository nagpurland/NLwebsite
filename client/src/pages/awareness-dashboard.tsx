import { useState, useEffect } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  User, 
  TrendingUp, 
  Users, 
  Building2, 
  Briefcase,
  Compass,
  ChevronRight,
  Eye,
  BarChart3,
  Zap,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

import { 
  AwarenessLevel, 
  UserSegment, 
  BlockNumber,
  AWARENESS_LEVEL_ORDER 
} from "@/lib/awareness-engine/types";
import { 
  getPropertiesForSegment, 
  getInsightsForSegment 
} from "@/lib/awareness-engine/mock-data";
import { 
  MarketContextBlock,
  StrategyIntroBlock,
  ValuePropositionBlock,
  StrategyDeepDiveBlock,
  SocialProofBlock,
  UrgencyBlock
} from "@/components/awareness/ContentBlocks";
import { PersonalizedPropertyGrid } from "@/components/awareness/PropertyGrid";
import { ResearchInsightsPanel } from "@/components/awareness/ResearchInsights";
import { AdaptiveCTAZone } from "@/components/awareness/AdaptiveCTA";

const SEGMENT_CONFIG: Record<UserSegment, { icon: any; label: string; color: string }> = {
  investor: { icon: TrendingUp, label: "Investor", color: "bg-amber-100 text-amber-700" },
  nri: { icon: Users, label: "NRI", color: "bg-blue-100 text-blue-700" },
  homebuyer: { icon: Building2, label: "Homebuyer", color: "bg-green-100 text-green-700" },
  first_timer: { icon: Zap, label: "First-Timer", color: "bg-purple-100 text-purple-700" },
  commercial: { icon: Briefcase, label: "Commercial", color: "bg-slate-100 text-slate-700" },
  explorer: { icon: Compass, label: "Explorer", color: "bg-indigo-100 text-indigo-700" }
};

const AWARENESS_BLOCK_MAP: Record<AwarenessLevel, { show: BlockNumber[], partial: BlockNumber[], hide: BlockNumber[] }> = {
  "Unaware": { show: [1, 2], partial: [6], hide: [3, 4, 5, 7, 8] },
  "Problem Aware": { show: [1, 2, 3, 6], partial: [4], hide: [5, 7, 8] },
  "Solution Aware": { show: [2, 3, 4, 6], partial: [5, 7], hide: [1, 8] },
  "Product Aware": { show: [4, 5, 6, 7], partial: [8], hide: [1, 2, 3] },
  "Most Aware": { show: [5, 6, 7, 8], partial: [], hide: [1, 2, 3, 4] }
};

export default function AwarenessDashboard() {
  const [segment, setSegment] = useState<UserSegment>("investor");
  const [awarenessLevel, setAwarenessLevel] = useState<AwarenessLevel>("Unaware");
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [conversionSignal, setConversionSignal] = useState<1 | 2 | 3>(1);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);

  const blockConfig = AWARENESS_BLOCK_MAP[awarenessLevel];
  const properties = getPropertiesForSegment(segment);
  const insights = getInsightsForSegment(segment);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setScrollDepth(depth);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (savedProperties.length >= 2 || timeOnPage > 180) {
      setConversionSignal(3);
    } else if (scrollDepth > 50 || timeOnPage > 60) {
      setConversionSignal(2);
    }
  }, [savedProperties.length, timeOnPage, scrollDepth]);

  const handleSaveProperty = (id: string) => {
    setSavedProperties(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setAwarenessLevel("Unaware");
    setSavedProperties([]);
    setConversionSignal(1);
    setTimeOnPage(0);
    setScrollDepth(0);
  };

  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-slate-950 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.15),transparent)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
              <Brain className="h-7 w-7 text-indigo-400" />
            </div>
            <div>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 mb-1">
                AI-Powered Experience
              </Badge>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Awareness Engine Dashboard
              </h1>
            </div>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl">
            Watch how content adapts in real-time based on user segment and awareness level. 
            This demo shows the personalization engine in action.
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Segment:</span>
              <div className="flex gap-1 flex-wrap">
                {(Object.keys(SEGMENT_CONFIG) as UserSegment[]).map((seg) => {
                  const config = SEGMENT_CONFIG[seg];
                  const Icon = config.icon;
                  return (
                    <Button
                      key={seg}
                      variant={segment === seg ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSegment(seg)}
                      className={cn(
                        "h-8 px-3 rounded-full text-xs font-bold",
                        segment === seg && "bg-slate-900"
                      )}
                      data-testid={`button-segment-${seg}`}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {config.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            
            <div className="h-6 w-px bg-slate-200 hidden md:block" />
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Awareness:</span>
              <div className="flex gap-1 flex-wrap">
                {AWARENESS_LEVEL_ORDER.map((level) => (
                  <Button
                    key={level}
                    variant={awarenessLevel === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAwarenessLevel(level)}
                    className={cn(
                      "h-8 px-3 rounded-full text-xs font-bold",
                      awarenessLevel === level && "bg-indigo-600"
                    )}
                    data-testid={`button-awareness-${level.replace(" ", "-").toLowerCase()}`}
                  >
                    {level.replace(" Aware", "")}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="ml-auto flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-8 px-3 text-xs font-bold"
                data-testid="button-reset"
              >
                <RefreshCw className="h-3 w-3 mr-1" /> Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 py-4 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-slate-400" />
              <span className="font-bold text-slate-900" data-testid="text-time-on-page">{timeOnPage}s</span>
              <span className="text-slate-500">on page</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-slate-400" />
              <span className="font-bold text-slate-900" data-testid="text-scroll-depth">{scrollDepth}%</span>
              <span className="text-slate-500">scroll depth</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-slate-400" />
              <span className="font-bold text-slate-900" data-testid="text-saved-count">{savedProperties.length}</span>
              <span className="text-slate-500">saved</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={cn(
                "font-bold",
                conversionSignal === 3 ? "bg-green-100 text-green-700" :
                conversionSignal === 2 ? "bg-amber-100 text-amber-700" :
                "bg-slate-100 text-slate-700"
              )} data-testid="text-conversion-signal">
                Signal: {conversionSignal}/3
              </Badge>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                Show: {blockConfig.show.join(", ")}
              </Badge>
              <Badge variant="outline" className="text-xs text-slate-400">
                Partial: {blockConfig.partial.join(", ") || "none"}
              </Badge>
              <Badge variant="outline" className="text-xs text-slate-300">
                Hide: {blockConfig.hide.join(", ")}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {blockConfig.show.includes(1) && (
            <div key="block-1">
              <MarketContextBlock segment={segment} />
            </div>
          )}
          
          {blockConfig.show.includes(2) && (
            <div key="block-2">
              <StrategyIntroBlock segment={segment} />
            </div>
          )}
          
          {blockConfig.show.includes(3) && (
            <div key="block-3">
              <ValuePropositionBlock segment={segment} />
            </div>
          )}
          
          {blockConfig.show.includes(4) && (
            <div key="block-4">
              <StrategyDeepDiveBlock segment={segment} />
            </div>
          )}
          
          {blockConfig.show.includes(5) && (
            <div key="block-5">
              <PersonalizedPropertyGrid
                properties={properties}
                savedIds={savedProperties}
                onSave={handleSaveProperty}
                onView={(id) => console.log("View property:", id)}
              />
            </div>
          )}
          
          {blockConfig.show.includes(6) && (
            <div key="block-6">
              <SocialProofBlock />
            </div>
          )}
          
          {blockConfig.show.includes(7) && (
            <div key="block-7">
              <ResearchInsightsPanel
                insights={insights}
                onInsightClick={(id) => console.log("Insight clicked:", id)}
              />
            </div>
          )}
          
          {blockConfig.show.includes(8) && (
            <div key="block-8">
              <UrgencyBlock />
            </div>
          )}

          <AdaptiveCTAZone
            strength={conversionSignal === 3 ? "strongest" : conversionSignal === 2 ? "strong" : "medium"}
            segment={segment}
            conversionSignal={conversionSignal}
            onAction={(action) => console.log("CTA action:", action)}
          />
        </div>
      </div>
    </PublicLayout>
  );
}
