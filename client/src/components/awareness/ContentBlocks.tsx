import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Building2, 
  Users, 
  ShieldCheck, 
  Zap, 
  MapPin,
  Clock,
  ChevronRight,
  Star,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BlockNumber, UserSegment } from "@/lib/awareness-engine/types";

interface BlockProps {
  segment?: UserSegment;
  isPartial?: boolean;
  onExpand?: () => void;
}

export function MarketContextBlock({ segment, isPartial }: BlockProps) {
  return (
    <div className={cn("relative transition-all duration-300", isPartial && "max-h-48 overflow-hidden")}>
      <div className="bg-primary rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary blur-3xl rounded-full" />
        <Badge className="bg-primary text-white/80 border-primary/20 mb-6">
          Block 1: Market Context
        </Badge>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
          Why Nagpur is <span className="text-primary">Transforming</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Building2, title: "Metro Phase 2", desc: "₹10,000 Cr investment, operational by 2027" },
            { icon: Users, title: "15,000+ Jobs", desc: "IT Park bringing TCS, HCL, Cognizant" },
            { icon: TrendingUp, title: "25-40% Growth", desc: "Expected price appreciation over 3-5 years" }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {isPartial && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background " />
      )}
    </div>
  );
}

export function StrategyIntroBlock({ segment }: BlockProps) {
  const getContent = () => {
    switch (segment) {
      case "investor":
        return { title: "Why Investors Choose Nagpur", subtitle: "Capital appreciation play with 8-12% CAGR potential" };
      case "nri":
        return { title: "Why NRIs Choose Nagpur", subtitle: "Tax-smart wealth parking with family connection" };
      case "homebuyer":
        return { title: "Why Families Choose Nagpur", subtitle: "Affordable living with top schools and hospitals" };
      default:
        return { title: "Why Smart Buyers Choose Nagpur", subtitle: "The opportunity before prices rise" };
    }
  };
  
  const content = getContent();
  
  return (
    <div className="transition-all duration-300">
      <Card className="p-8 md:p-10 border-2 border-primary/20 bg-primary/5 rounded-[2rem]">
        <Badge className="bg-primary/5 text-primary border-none mb-4">
          Block 2: Strategy Intro
        </Badge>
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-3">{content.title}</h3>
        <p className="text-lg text-slate-600 font-medium mb-6">{content.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          {["Metro Connectivity", "IT Job Boom", "Tier-2 Pricing", "Legal Clarity"].map((tag) => (
            <Badge key={tag} variant="outline" className="px-4 py-2 font-bold text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function ValuePropositionBlock({ segment }: BlockProps) {
  return (
    <div className="transition-all duration-300">
      <Card className="p-8 md:p-10 rounded-[2rem] border-none shadow-xl bg-white">
        <Badge className="bg-slate-100 text-slate-600 border-none mb-4">
          Block 3: Value Proposition
        </Badge>
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
          What <span className="text-primary">NagpurLand</span> Offers
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: ShieldCheck, title: "Legal Verification", desc: "Every property RERA-checked" },
            { icon: TrendingUp, title: "Market Intelligence", desc: "Real-time pricing data" },
            { icon: MapPin, title: "Locality Insights", desc: "Deep area knowledge" },
            { icon: Zap, title: "AI-Powered Matching", desc: "Properties ranked for you" }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-primary">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function StrategyDeepDiveBlock({ segment }: BlockProps) {
  return (
    <div className="transition-all duration-300">
      <Card className="p-8 md:p-10 rounded-[2rem] border-2 border-amber-100 bg-amber-50/30">
        <Badge className="bg-amber-100 text-amber-700 border-none mb-4">
          Block 4: Strategy Deep-Dive
        </Badge>
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
          Investment Mechanics & Timeline
        </h3>
        <div className="space-y-4">
          {[
            { label: "Entry Window", value: "2024-2026", note: "Before metro completion" },
            { label: "Hold Period", value: "3-8 years", note: "For optimal returns" },
            { label: "Expected CAGR", value: "8-15%", note: "Based on similar tier-2 cities" },
            { label: "Exit Strategy", value: "Resale / Rental", note: "Multiple options" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-amber-100">
              <div>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                <p className="text-xs text-slate-400">{item.note}</p>
              </div>
              <span className="text-xl font-semibold text-amber-700">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function SocialProofBlock() {
  return (
    <div className="transition-all duration-300">
      <div className="bg-primary rounded-[2rem] p-8 md:p-10 text-white">
        <Badge className="bg-white/10 text-white border-white/20 mb-6">
          Block 6: Social Proof
        </Badge>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "542", label: "Verified Properties" },
            { value: "1,248", label: "Happy Buyers" },
            { value: "186", label: "Successful Exits" },
            { value: "89", label: "Investor Network" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-semibold mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-10 w-10 rounded-full bg-primary border-2 border-slate-900" />
              ))}
            </div>
            <p className="text-sm text-slate-400">
              <span className="text-white font-bold">+120 investors</span> joined this month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UrgencyBlock() {
  return (
    <div className="transition-all duration-300">
      <Card className="p-6 md:p-8 rounded-[2rem] border-2 border-red-200 bg-background ">
        <Badge className="bg-red-100 text-red-700 border-none mb-4">
          Block 8: Urgency Signal
        </Badge>
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center shrink-0 animate-pulse">
            <Clock className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-primary mb-2">
              Scarcity Window: 30-60 Days
            </h4>
            <p className="text-slate-600 mb-4">
              MIHAN inventory down 12% YoY. Similar properties receive 2-3 inquiries within 48 hours. 
              First-mover advantage is real.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-red-600 text-white border-none">Limited Supply</Badge>
              <Badge className="bg-accent-strong text-white border-none">Prices Rising</Badge>
              <Badge className="bg-amber-500 text-white border-none">Act Now</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface ContentBlockRendererProps {
  blockNumber: BlockNumber;
  segment?: UserSegment;
  isPartial?: boolean;
  onExpand?: () => void;
}

export function ContentBlockRenderer({ blockNumber, segment, isPartial, onExpand }: ContentBlockRendererProps) {
  switch (blockNumber) {
    case 1:
      return <MarketContextBlock segment={segment} isPartial={isPartial} />;
    case 2:
      return <StrategyIntroBlock segment={segment} />;
    case 3:
      return <ValuePropositionBlock segment={segment} />;
    case 4:
      return <StrategyDeepDiveBlock segment={segment} />;
    case 6:
      return <SocialProofBlock />;
    case 8:
      return <UrgencyBlock />;
    default:
      return null;
  }
}
