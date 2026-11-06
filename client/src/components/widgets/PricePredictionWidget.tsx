import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, AlertCircle, Building2, Scale } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface PredictionFactor {
  name: string;
  type: string;
  status: number;
  expectedImpact: string;
}

interface PredictionData {
  currentPrice: number;
  predictedMin: number;
  predictedMax: number;
  confidence: number;
  months: number;
  factors: {
    infraProjects: PredictionFactor[];
    demandTrend: string;
    supplyTrend: string;
    legalRisk: string;
  };
  reasoning: string;
  generatedAt: string;
}

interface EngagementResponse {
  prediction: PredictionData | null;
  inWatchlist: boolean;
}

interface PricePredictionWidgetProps {
  localityName: string;
  className?: string;
}

function getSessionId(): string {
  let sessionId = localStorage.getItem("buyer_session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("buyer_session_id", sessionId);
  }
  return sessionId;
}

export function PricePredictionWidget({ localityName, className }: PricePredictionWidgetProps) {
  const { data, isLoading, error } = useQuery<EngagementResponse>({
    queryKey: ['/api/locality', localityName, 'engagement'],
    queryFn: async () => {
      const sessionId = getSessionId();
      const res = await fetch(`/api/locality/${encodeURIComponent(localityName)}/engagement`, {
        headers: { 'x-session-id': sessionId }
      });
      if (!res.ok) throw new Error('Failed to fetch engagement data');
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <Card className={`border-none shadow-xl rounded-[2rem] bg-gradient-to-br from-violet-600 to-indigo-700 text-white ${className}`} data-testid="card-price-prediction-loading">
        <CardContent className="p-8">
          <Skeleton className="h-8 w-48 bg-white/20 mb-4" />
          <Skeleton className="h-12 w-full bg-white/20 mb-2" />
          <Skeleton className="h-6 w-32 bg-white/20" />
        </CardContent>
      </Card>
    );
  }

  if (error || !data?.prediction) {
    return (
      <Card className={`border-none shadow-xl rounded-[2rem] bg-gradient-to-br from-slate-600 to-slate-700 text-white ${className}`} data-testid="card-price-prediction-empty">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Predictive Pricing Model
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-white/70 text-sm" data-testid="text-prediction-unavailable">Price prediction data not available for this locality yet.</p>
        </CardContent>
      </Card>
    );
  }

  const { prediction } = data;
  const priceChange = prediction.predictedMin - (prediction.currentPrice || 0);
  const priceChangePercent = prediction.currentPrice 
    ? ((priceChange / prediction.currentPrice) * 100).toFixed(1) 
    : '0';

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-emerald-500';
    if (confidence >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getDemandBadge = (trend: string) => {
    switch (trend) {
      case 'high':
        return <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">High Demand</Badge>;
      case 'declining':
        return <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Declining</Badge>;
      default:
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Stable</Badge>;
    }
  };

  const getLegalRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <Badge className="bg-red-500/20 text-red-300 border-red-500/30">High Risk</Badge>;
      case 'moderate':
        return <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Moderate</Badge>;
      default:
        return <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Low Risk</Badge>;
    }
  };

  return (
    <Card className={`border-none shadow-xl rounded-[2rem] bg-gradient-to-br from-violet-600 to-indigo-700 text-white overflow-hidden ${className}`} data-testid="card-price-prediction">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Predictive Pricing Model
          </CardTitle>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getConfidenceColor(prediction.confidence)} text-white text-xs font-bold`}>
            {prediction.confidence}% Confidence
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
        <div className="text-center py-4">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-2">
            In {prediction.months} months, {localityName} likely at
          </p>
          <div className="text-4xl font-black" data-testid="text-predicted-price">
            ₹{prediction.predictedMin.toLocaleString()} - ₹{prediction.predictedMax.toLocaleString()}
            <span className="text-lg font-medium text-white/70">/sqft</span>
          </div>
          {prediction.currentPrice && (
            <div className={`mt-2 text-sm font-semibold ${priceChange >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
              <TrendingUp className={`inline h-4 w-4 mr-1 ${priceChange < 0 ? 'rotate-180' : ''}`} />
              {priceChange >= 0 ? '+' : ''}{priceChangePercent}% from current ₹{prediction.currentPrice}/sqft
            </div>
          )}
        </div>

        <div className="bg-white/10 rounded-xl p-4 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-white/60">Based on</p>
          
          <div className="flex flex-wrap gap-2">
            {getDemandBadge(prediction.factors.demandTrend)}
            {getLegalRiskBadge(prediction.factors.legalRisk)}
          </div>

          {prediction.factors.infraProjects.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <Building2 className="h-3 w-3" />
                <span>{prediction.factors.infraProjects.length} infrastructure projects</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {prediction.factors.infraProjects.slice(0, 3).map((project, i) => (
                  <Badge key={i} variant="outline" className="text-xs border-white/20 text-white/80">
                    {project.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-start gap-2 text-xs text-white/60 bg-white/5 rounded-lg p-3">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>{prediction.reasoning}</p>
        </div>
      </CardContent>
    </Card>
  );
}
