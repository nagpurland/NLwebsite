import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Scale, 
  FileText, 
  MapPin, 
  Clock, 
  BarChart3,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ResearchInsight, InsightCategory } from "@/lib/awareness-engine/types";

const CATEGORY_CONFIG: Record<InsightCategory, { icon: any; color: string; label: string }> = {
  market_dynamics: { icon: TrendingUp, color: "bg-blue-100 text-blue-700", label: "Market Dynamics" },
  investment_mechanics: { icon: BarChart3, color: "bg-purple-100 text-purple-700", label: "Investment Mechanics" },
  legal_tax: { icon: FileText, color: "bg-amber-100 text-amber-700", label: "Legal & Tax" },
  locality_specific: { icon: MapPin, color: "bg-green-100 text-green-700", label: "Locality Intel" },
  urgency_signal: { icon: Clock, color: "bg-red-100 text-red-700", label: "Urgency Signal" },
  comparison: { icon: Scale, color: "bg-indigo-100 text-indigo-700", label: "Comparison" }
};

interface InsightCardProps {
  insight: ResearchInsight;
  onClick?: (id: string) => void;
}

export function ResearchInsightCard({ insight, onClick }: InsightCardProps) {
  const config = CATEGORY_CONFIG[insight.category];
  const Icon = config.icon;
  
  return (
    <div
      onClick={() => onClick?.(insight.id)}
      className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
    >
      <Card className="p-5 rounded-2xl border-2 border-transparent hover:border-indigo-200 transition-all duration-300 hover:shadow-lg bg-white">
        <div className="flex items-start gap-4">
          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", config.color)}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={cn("text-[9px] font-bold uppercase tracking-wider border-none", config.color)}>
                {config.label}
              </Badge>
              <Badge variant="outline" className="text-[9px] text-slate-400">
                {insight.data_freshness}
              </Badge>
            </div>
            <h4 className="font-black text-slate-900 text-sm mb-2 line-clamp-2">{insight.title}</h4>
            <p className="text-xs text-slate-600 mb-3 line-clamp-3">{insight.summary}</p>
            <div className="bg-slate-50 rounded-lg p-3 border-l-2 border-indigo-400">
              <p className="text-[11px] font-bold text-indigo-700">
                {insight.relevance_reason}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface ResearchInsightsPanelProps {
  insights: ResearchInsight[];
  onInsightClick?: (id: string) => void;
}

export function ResearchInsightsPanel({ insights, onInsightClick }: ResearchInsightsPanelProps) {
  if (insights.length === 0) return null;
  
  return (
    <div className="space-y-6 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-purple-100 text-purple-700 border-none mb-2">
            Block 7: Research Insights
          </Badge>
          <h3 className="text-2xl font-black text-slate-900">Contextual Intelligence</h3>
          <p className="text-slate-500 text-sm">Insights personalized to your journey</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <ResearchInsightCard
            key={insight.id}
            insight={insight}
            onClick={onInsightClick}
          />
        ))}
      </div>
    </div>
  );
}
