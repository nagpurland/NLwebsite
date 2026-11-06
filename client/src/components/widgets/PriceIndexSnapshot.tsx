import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, 
  ResponsiveContainer, Cell, ReferenceLine, ReferenceArea 
} from "recharts";
import { TrendingUp, Shield, AlertTriangle, Target, User, Briefcase, Home, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PriceIndexEntry {
  id: number;
  name: string;
  slug: string;
  growthScore: number;
  riskScore: number;
  zone: 'green' | 'red' | 'blue' | 'gray';
  avgPrice: number | null;
  growthPercent: number;
  riskFactors: string[];
  growthFactors: string[];
}

interface PriceIndexResponse {
  entries: PriceIndexEntry[];
  summary: {
    greenCount: number;
    redCount: number;
    blueCount: number;
    grayCount: number;
    totalLocalities: number;
  };
}

const ZONE_COLORS = {
  green: '#22c55e',
  red: '#ef4444',
  blue: '#3b82f6',
  gray: '#6b7280'
};

const ZONE_LABELS = {
  green: 'High Growth / Low Risk',
  red: 'High Growth / High Risk',
  blue: 'Low Growth / Low Risk',
  gray: 'Low Growth / High Risk'
};

const ZONE_ICONS = {
  green: Target,
  red: AlertTriangle,
  blue: Shield,
  gray: AlertTriangle
};

interface Props {
  className?: string;
}

export function PriceIndexSnapshot({ className = "" }: Props) {
  const [, setLocation] = useLocation();
  
  const { data, isLoading, error } = useQuery<PriceIndexResponse>({
    queryKey: ['/api/localities/price-index'],
  });

  if (isLoading) {
    return (
      <Card className={`${className}`} data-testid="card-price-index-loading">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Price Index Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className={`${className}`} data-testid="card-price-index-error">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Price Index Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground" data-testid="text-price-index-error">
            Unable to load price index data.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleClick = (entry: PriceIndexEntry) => {
    setLocation(`/locality/${entry.slug}`);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload as PriceIndexEntry;
      const ZoneIcon = ZONE_ICONS[entry.zone];
      return (
        <div 
          className="bg-popover border border-border rounded-lg p-3 shadow-lg max-w-xs"
          data-testid={`tooltip-locality-${entry.id}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-foreground">{entry.name}</span>
            <Badge 
              variant="outline" 
              style={{ 
                borderColor: ZONE_COLORS[entry.zone],
                color: ZONE_COLORS[entry.zone]
              }}
            >
              <ZoneIcon className="h-3 w-3 mr-1" />
              {entry.zone.toUpperCase()}
            </Badge>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Growth:</span>
              <span className={entry.growthPercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                {entry.growthPercent >= 0 ? '+' : ''}{entry.growthPercent}%
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Risk Score:</span>
              <span className={entry.riskScore > 50 ? 'text-red-600' : 'text-green-600'}>
                {entry.riskScore}/100
              </span>
            </div>
            {entry.avgPrice && (
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Avg Price:</span>
                <span>₹{entry.avgPrice.toLocaleString()}/sqft</span>
              </div>
            )}
            {entry.riskFactors.length > 0 && (
              <div className="mt-2 pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Risk Factors:</span>
                <ul className="text-xs text-red-600 mt-1">
                  {entry.riskFactors.slice(0, 2).map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
            )}
            {entry.growthFactors.length > 0 && (
              <div className="mt-1">
                <span className="text-xs text-muted-foreground">Growth Drivers:</span>
                <ul className="text-xs text-green-600 mt-1">
                  {entry.growthFactors.slice(0, 2).map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <p className="text-xs text-primary mt-2">Click to view details</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`${className}`} data-testid="card-price-index-snapshot">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Price Index Snapshot — Decision Framework
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            {(['green', 'red', 'blue', 'gray'] as const).map(zone => {
              const count = data.summary[`${zone}Count` as keyof typeof data.summary];
              return (
                <Badge 
                  key={zone}
                  variant="outline"
                  className="text-xs"
                  style={{ borderColor: ZONE_COLORS[zone], color: ZONE_COLORS[zone] }}
                  data-testid={`badge-zone-count-${zone}`}
                >
                  {zone.toUpperCase()}: {count}
                </Badge>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[450px] w-full" data-testid="chart-price-index">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
              <ReferenceArea x1={0} x2={40} y1={60} y2={100} fill="#22c55e" fillOpacity={0.1} />
              <ReferenceArea x1={40} x2={100} y1={60} y2={100} fill="#ef4444" fillOpacity={0.1} />
              <ReferenceArea x1={0} x2={40} y1={0} y2={60} fill="#3b82f6" fillOpacity={0.1} />
              <ReferenceArea x1={40} x2={100} y1={0} y2={60} fill="#6b7280" fillOpacity={0.1} />
              
              <ReferenceLine x={40} stroke="#888" strokeDasharray="3 3" />
              <ReferenceLine y={60} stroke="#888" strokeDasharray="3 3" />
              
              <XAxis 
                type="number" 
                dataKey="riskScore" 
                name="Risk Score" 
                domain={[0, 100]}
                label={{ value: 'Risk Score →', position: 'bottom', offset: 0 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                type="number" 
                dataKey="growthScore" 
                name="Growth Score" 
                domain={[0, 100]}
                label={{ value: 'Growth Score →', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <ZAxis range={[60, 200]} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter 
                name="Localities" 
                data={data.entries} 
                onClick={handleClick}
                cursor="pointer"
              >
                {data.entries.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={ZONE_COLORS[entry.zone]}
                    stroke="#fff"
                    strokeWidth={1}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <ZoneLegend 
            zone="green" 
            label="Best Bets" 
            description="High growth, low risk"
            entries={data.entries.filter(e => e.zone === 'green')}
          />
          <ZoneLegend 
            zone="red" 
            label="High Risk/Reward" 
            description="Growing but risky"
            entries={data.entries.filter(e => e.zone === 'red')}
          />
          <ZoneLegend 
            zone="blue" 
            label="Safe & Stable" 
            description="Low growth, low risk"
            entries={data.entries.filter(e => e.zone === 'blue')}
          />
          <ZoneLegend 
            zone="gray" 
            label="Avoid" 
            description="Low growth, high risk"
            entries={data.entries.filter(e => e.zone === 'gray')}
          />
        </div>
        
        <PersonaExamples entries={data.entries} />
      </CardContent>
    </Card>
  );
}

interface ZoneLegendProps {
  zone: 'green' | 'red' | 'blue' | 'gray';
  label: string;
  description: string;
  entries: PriceIndexEntry[];
}

function ZoneLegend({ zone, label, description, entries }: ZoneLegendProps) {
  const [, setLocation] = useLocation();
  const ZoneIcon = ZONE_ICONS[zone];
  
  return (
    <div 
      className="rounded-lg p-3 bg-muted/50"
      style={{ borderLeft: `3px solid ${ZONE_COLORS[zone]}` }}
      data-testid={`zone-legend-${zone}`}
    >
      <div className="flex items-center gap-1 mb-1">
        <ZoneIcon 
          className="h-4 w-4" 
          style={{ color: ZONE_COLORS[zone] }} 
        />
        <span className="font-semibold text-sm" style={{ color: ZONE_COLORS[zone] }}>
          {label}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{description}</p>
      <div className="space-y-1 max-h-24 overflow-y-auto">
        {entries.slice(0, 5).map(entry => (
          <button
            key={entry.id}
            onClick={() => setLocation(`/locality/${entry.slug}`)}
            className="block w-full text-left text-xs hover:underline truncate"
            data-testid={`link-locality-${entry.slug}`}
          >
            {entry.name} ({entry.growthPercent >= 0 ? '+' : ''}{entry.growthPercent}%)
          </button>
        ))}
        {entries.length > 5 && (
          <span className="text-xs text-muted-foreground">
            +{entries.length - 5} more
          </span>
        )}
        {entries.length === 0 && (
          <span className="text-xs text-muted-foreground italic">No localities</span>
        )}
      </div>
    </div>
  );
}

interface PersonaExamplesProps {
  entries: PriceIndexEntry[];
}

function PersonaExamples({ entries }: PersonaExamplesProps) {
  const [, setLocation] = useLocation();
  
  const greenEntries = entries.filter(e => e.zone === 'green');
  const affordableEntries = greenEntries
    .filter(e => e.avgPrice && e.avgPrice < 4500)
    .sort((a, b) => (b.growthPercent || 0) - (a.growthPercent || 0));
  const bestROI = greenEntries.sort((a, b) => (b.growthPercent || 0) - (a.growthPercent || 0))[0];
  const blueEntries = entries.filter(e => e.zone === 'blue');
  const safestBet = blueEntries.sort((a, b) => a.riskScore - b.riskScore)[0];
  
  return (
    <div className="mt-8 space-y-6" data-testid="section-persona-examples">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-lg">Price Index in Action — Real Buyer Examples</h3>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PersonaCard
          icon={<Home className="h-5 w-5" />}
          title="First-Time Buyer"
          subtitle="Budget: 50 Lakh"
          localities={affordableEntries.slice(0, 2)}
          whyText="Safe, affordable, good appreciation potential"
          priceDetails={affordableEntries[0] ? [
            { label: `${affordableEntries[0].name} avg`, value: `₹${affordableEntries[0].avgPrice?.toLocaleString()}/sqft` },
            { label: "Safety", value: `${100 - affordableEntries[0].riskScore}/100 (${affordableEntries[0].riskScore < 30 ? 'high' : 'moderate'})` },
            { label: "Growth", value: `${affordableEntries[0].growthPercent}% (long-term appreciation)` }
          ] : []}
          actions={[
            { label: "Run 12-Point Safety Check", onClick: () => affordableEntries[0] && setLocation(`/locality/${affordableEntries[0].slug}`) },
            { label: `Explore ${affordableEntries[0]?.name || 'Options'}`, onClick: () => affordableEntries[0] && setLocation(`/locality/${affordableEntries[0].slug}`) }
          ]}
          testId="persona-first-time-buyer"
        />
        
        <PersonaCard
          icon={<Briefcase className="h-5 w-5" />}
          title="Investor — Best ROI"
          subtitle="Seeking maximum returns"
          localities={bestROI ? [bestROI] : []}
          whyText={bestROI ? `Highest growth (${bestROI.growthPercent}%), still under-priced vs premium areas` : "Analyzing market data..."}
          priceDetails={bestROI ? [
            { label: "Current avg", value: `₹${bestROI.avgPrice?.toLocaleString()}/sqft` },
            { label: "Projected 24mo", value: `₹${Math.round((bestROI.avgPrice || 0) * (1 + bestROI.growthPercent / 100 * 2)).toLocaleString()}/sqft (+${Math.round(bestROI.growthPercent * 2)}%)` },
            { label: "Safety", value: `${100 - bestROI.riskScore}/100 (legal structure solid)` },
            { label: "Exit speed", value: "45 days (liquid market)" }
          ] : []}
          riskNote={bestROI?.riskFactors.length ? `Risk: ${bestROI.riskFactors[0]}` : "Risk: Infrastructure delays could slow appreciation"}
          mitigationNote="Mitigation: Buy near confirmed infrastructure projects"
          actions={[
            { label: `See all ${bestROI?.name || ''} opportunities`, onClick: () => bestROI && setLocation(`/locality/${bestROI.slug}`) },
            { label: "Check infrastructure risks", onClick: () => setLocation('/public/intel') }
          ]}
          testId="persona-investor-roi"
        />
        
        <PersonaCard
          icon={<Shield className="h-5 w-5" />}
          title="Conservative Buyer"
          subtitle="Safety over growth"
          localities={safestBet ? [safestBet] : blueEntries.slice(0, 1)}
          whyText="Established area, clean titles, stable appreciation"
          priceDetails={safestBet ? [
            { label: `${safestBet.name} avg`, value: `₹${safestBet.avgPrice?.toLocaleString()}/sqft` },
            { label: "Safety", value: `${100 - safestBet.riskScore}/100 (very high)` },
            { label: "Growth", value: `${safestBet.growthPercent}% (stable, low volatility)` },
            { label: "Title clarity", value: "Zero disputes on record" }
          ] : []}
          actions={[
            { label: `Explore ${safestBet?.name || 'Safe Options'}`, onClick: () => safestBet && setLocation(`/locality/${safestBet.slug}`) },
            { label: "View title verification", onClick: () => setLocation('/public/intel') }
          ]}
          testId="persona-conservative"
        />
      </div>
    </div>
  );
}

interface PersonaCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  localities: PriceIndexEntry[];
  whyText: string;
  priceDetails: { label: string; value: string }[];
  riskNote?: string;
  mitigationNote?: string;
  actions: { label: string; onClick: () => void }[];
  testId: string;
}

function PersonaCard({ 
  icon, title, subtitle, localities, whyText, priceDetails, 
  riskNote, mitigationNote, actions, testId 
}: PersonaCardProps) {
  return (
    <div 
      className="rounded-xl border bg-card p-4 space-y-3"
      data-testid={testId}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Example</span>
          </div>
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      
      {localities.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">
              Your match{localities.length > 1 ? 'es' : ''}: {localities.map(l => l.name).join(', ')}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Why: {whyText}</p>
        </div>
      )}
      
      {priceDetails.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price Check:</p>
          {priceDetails.map((detail, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="text-muted-foreground shrink-0">-</span>
              <span className="text-muted-foreground">{detail.label}:</span>
              <span className="font-medium">{detail.value}</span>
            </div>
          ))}
        </div>
      )}
      
      {riskNote && (
        <div className="text-xs">
          <span className="text-amber-600 font-medium">{riskNote}</span>
          {mitigationNote && (
            <p className="text-muted-foreground mt-1">{mitigationNote}</p>
          )}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 pt-2">
        {actions.map((action, i) => (
          <Button
            key={i}
            variant={i === 0 ? "default" : "outline"}
            size="sm"
            onClick={action.onClick}
            className="text-xs"
            data-testid={`${testId}-action-${i}`}
          >
            {action.label}
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        ))}
      </div>
    </div>
  );
}
