import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ArrowLeft,
  MapPin,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  Home,
  Building,
  Zap,
  Clock,
  ShieldCheck,
  Users,
  Briefcase,
  Globe,
  Scale,
  Target,
  ChevronRight,
  X,
  Calculator,
  Star,
  DollarSign,
  Droplets
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const buyerProfiles = [
  { id: "first-time", label: "First-Time Home Buyer", icon: Home, desc: "Looking for safe, affordable land to build" },
  { id: "investor-short", label: "Investor (3-5 year hold)", icon: TrendingUp, desc: "Capital appreciation focused" },
  { id: "investor-long", label: "Investor (5+ years)", icon: Target, desc: "Long-term wealth building" },
  { id: "commercial", label: "Commercial / Large Parcel", icon: Building, desc: "Business or development use" },
  { id: "nri", label: "NRI / Non-Local Buyer", icon: Globe, desc: "Remote investment, need extra due diligence" }
];

const localityDetails: Record<string, {
  name: string;
  slug: string;
  currentPrice: number;
  priceRange: [number, number];
  median: number;
  yoyGrowth: number;
  sixMonthGrowth: number;
  circleRate: number;
  fairValueVerdict: string;
  shouldBuyNow: string;
  activeListings: number;
  newListings30d: number;
  sold30d: number;
  inventoryTurnover: number;
  buyerInterest: string;
  timeToSell: number;
  naStatus: number;
  tpScheme: string;
  litigationRate: number;
  registrationDays: string;
  riskScore: number;
  riskLevel: string;
  recentNews: string;
  growthDrivers: string[];
  projectedGrowth: string;
  bestFor: string;
  decisions: {
    firstTime: { verdict: string; reason: string };
    investorShort: { verdict: string; reason: string };
    investorLong: { verdict: string; reason: string };
    commercial: { verdict: string; reason: string };
  };
  comparedToAvg: {
    priceGrowth: { locality: number; avg: number; diff: string };
    timeToSell: { locality: number; avg: number; diff: string };
    risk: { locality: string; avg: string; diff: string };
  };
  color: string;
  priceHistory: { month: string; price: number }[];
}> = {
  besa: {
    name: "Besa / Beltarodi",
    slug: "besa",
    currentPrice: 3480,
    priceRange: [3100, 3800],
    median: 3420,
    yoyGrowth: 24.3,
    sixMonthGrowth: 12,
    circleRate: 2780,
    fairValueVerdict: "FAIRLY PRICED",
    shouldBuyNow: "Green light - prices stabilizing after rapid growth",
    activeListings: 98,
    newListings30d: 15,
    sold30d: 12,
    inventoryTurnover: 3.2,
    buyerInterest: "HIGH",
    timeToSell: 38,
    naStatus: 96,
    tpScheme: "Finalized & stable",
    litigationRate: 1.2,
    registrationDays: "16-20",
    riskScore: 93,
    riskLevel: "Low",
    recentNews: "NMRDA fast-tracked approvals (Jan 3)",
    growthDrivers: [
      "IT Park development nearby (Nagpur Smart City Phase 2)",
      "Metro Phase 2 indirect benefit (2.5km radius)",
      "Schools & hospitals: 8 major institutions within 2km"
    ],
    projectedGrowth: "18-22%",
    bestFor: "Investors (3-5 year hold) + First-time buyers",
    decisions: {
      firstTime: { verdict: "STRONG BUY", reason: "safe + affordable + growth" },
      investorShort: { verdict: "MODERATE", reason: "growth moderating from 24% peak" },
      investorLong: { verdict: "STRONG BUY", reason: "long-term appreciation likely" },
      commercial: { verdict: "CHECK ZONE", reason: "not all plots are commercial" }
    },
    comparedToAvg: {
      priceGrowth: { locality: 24.3, avg: 18.4, diff: "+31% better" },
      timeToSell: { locality: 38, avg: 58, diff: "36% faster" },
      risk: { locality: "LOW", avg: "MEDIUM", diff: "safer here" }
    },
    color: "#10b981",
    priceHistory: [
      { month: "Jan", price: 2800 }, { month: "Feb", price: 2850 }, { month: "Mar", price: 2920 },
      { month: "Apr", price: 2980 }, { month: "May", price: 3050 }, { month: "Jun", price: 3100 },
      { month: "Jul", price: 3180 }, { month: "Aug", price: 3220 }, { month: "Sep", price: 3280 },
      { month: "Oct", price: 3350 }, { month: "Nov", price: 3400 }, { month: "Dec", price: 3480 }
    ]
  },
  hingna: {
    name: "Hingna",
    slug: "hingna",
    currentPrice: 2150,
    priceRange: [1900, 2400],
    median: 2080,
    yoyGrowth: 19.4,
    sixMonthGrowth: 9.5,
    circleRate: 1650,
    fairValueVerdict: "GOOD VALUE",
    shouldBuyNow: "Yellow light - emerging area, higher risk/reward",
    activeListings: 134,
    newListings30d: 22,
    sold30d: 8,
    inventoryTurnover: 5.8,
    buyerInterest: "MODERATE",
    timeToSell: 68,
    naStatus: 78,
    tpScheme: "Partially finalized",
    litigationRate: 3.8,
    registrationDays: "25-35",
    riskScore: 72,
    riskLevel: "Medium",
    recentNews: "Industrial zone expansion planned (Q2 2026)",
    growthDrivers: [
      "Industrial corridor expansion",
      "Lower entry price attracts budget buyers",
      "Outer Ring Road connectivity"
    ],
    projectedGrowth: "15-20%",
    bestFor: "Long-term investors + Budget-conscious first-time buyers",
    decisions: {
      firstTime: { verdict: "MODERATE", reason: "affordable but needs more due diligence" },
      investorShort: { verdict: "RISKY", reason: "slower liquidity, 68 days to sell" },
      investorLong: { verdict: "STRONG BUY", reason: "high upside potential at low entry" },
      commercial: { verdict: "GOOD FIT", reason: "industrial zone benefits" }
    },
    comparedToAvg: {
      priceGrowth: { locality: 19.4, avg: 18.4, diff: "+5% better" },
      timeToSell: { locality: 68, avg: 58, diff: "17% slower" },
      risk: { locality: "MEDIUM", avg: "MEDIUM", diff: "average" }
    },
    color: "#8b5cf6",
    priceHistory: [
      { month: "Jan", price: 1800 }, { month: "Feb", price: 1820 }, { month: "Mar", price: 1850 },
      { month: "Apr", price: 1880 }, { month: "May", price: 1920 }, { month: "Jun", price: 1950 },
      { month: "Jul", price: 1980 }, { month: "Aug", price: 2010 }, { month: "Sep", price: 2050 },
      { month: "Oct", price: 2080 }, { month: "Nov", price: 2110 }, { month: "Dec", price: 2150 }
    ]
  },
  "wardha-road": {
    name: "Wardha Road",
    slug: "wardha-road",
    currentPrice: 2920,
    priceRange: [2600, 3200],
    median: 2850,
    yoyGrowth: 21.7,
    sixMonthGrowth: 11.2,
    circleRate: 2200,
    fairValueVerdict: "FAIRLY PRICED",
    shouldBuyNow: "Yellow light - verify TP scheme status before purchase",
    activeListings: 187,
    newListings30d: 28,
    sold30d: 15,
    inventoryTurnover: 4.1,
    buyerInterest: "HIGH",
    timeToSell: 52,
    naStatus: 82,
    tpScheme: "Revision expected Q2 2026",
    litigationRate: 4.2,
    registrationDays: "20-28",
    riskScore: 68,
    riskLevel: "Medium",
    recentNews: "TP scheme revision expected - verify plot status",
    growthDrivers: [
      "Airport corridor development",
      "Large parcel availability",
      "Commercial zone expansion"
    ],
    projectedGrowth: "16-22%",
    bestFor: "Investors willing to do extra due diligence",
    decisions: {
      firstTime: { verdict: "CAUTION", reason: "TP scheme uncertainty adds risk" },
      investorShort: { verdict: "MODERATE", reason: "good growth but verify legal status" },
      investorLong: { verdict: "STRONG BUY", reason: "airport corridor long-term value" },
      commercial: { verdict: "STRONG BUY", reason: "commercial zone expansion" }
    },
    comparedToAvg: {
      priceGrowth: { locality: 21.7, avg: 18.4, diff: "+18% better" },
      timeToSell: { locality: 52, avg: 58, diff: "10% faster" },
      risk: { locality: "MEDIUM", avg: "MEDIUM", diff: "average" }
    },
    color: "#ef4444",
    priceHistory: [
      { month: "Jan", price: 2400 }, { month: "Feb", price: 2450 }, { month: "Mar", price: 2480 },
      { month: "Apr", price: 2520 }, { month: "May", price: 2580 }, { month: "Jun", price: 2620 },
      { month: "Jul", price: 2680 }, { month: "Aug", price: 2720 }, { month: "Sep", price: 2780 },
      { month: "Oct", price: 2820 }, { month: "Nov", price: 2860 }, { month: "Dec", price: 2920 }
    ]
  },
  mihan: {
    name: "MIHAN",
    slug: "mihan",
    currentPrice: 4000,
    priceRange: [3600, 4400],
    median: 3920,
    yoyGrowth: 25,
    sixMonthGrowth: 11.1,
    circleRate: 3200,
    fairValueVerdict: "PREMIUM BUT JUSTIFIED",
    shouldBuyNow: "Green light - Metro Phase 2 catalyst imminent",
    activeListings: 145,
    newListings30d: 18,
    sold30d: 14,
    inventoryTurnover: 3.8,
    buyerInterest: "VERY HIGH",
    timeToSell: 45,
    naStatus: 98,
    tpScheme: "Finalized & stable",
    litigationRate: 0.8,
    registrationDays: "12-18",
    riskScore: 95,
    riskLevel: "Very Low",
    recentNews: "Metro Phase 2 route finalized - 30% premium near Khapri",
    growthDrivers: [
      "Metro Phase 2 expansion (operational 2027)",
      "IT/SEZ job growth (15,000+ jobs)",
      "Premium infrastructure and connectivity"
    ],
    projectedGrowth: "20-28%",
    bestFor: "All buyer types - premium but safest option",
    decisions: {
      firstTime: { verdict: "STRONG BUY", reason: "safest legal status in Nagpur" },
      investorShort: { verdict: "STRONG BUY", reason: "Metro catalyst will drive prices" },
      investorLong: { verdict: "STRONG BUY", reason: "IT hub long-term fundamentals" },
      commercial: { verdict: "EXCELLENT", reason: "SEZ and IT park proximity" }
    },
    comparedToAvg: {
      priceGrowth: { locality: 25, avg: 18.4, diff: "+36% better" },
      timeToSell: { locality: 45, avg: 58, diff: "22% faster" },
      risk: { locality: "VERY LOW", avg: "MEDIUM", diff: "much safer" }
    },
    color: "#6366f1",
    priceHistory: [
      { month: "Jan", price: 3200 }, { month: "Feb", price: 3280 }, { month: "Mar", price: 3350 },
      { month: "Apr", price: 3400 }, { month: "May", price: 3520 }, { month: "Jun", price: 3600 },
      { month: "Jul", price: 3680 }, { month: "Aug", price: 3720 }, { month: "Sep", price: 3780 },
      { month: "Oct", price: 3850 }, { month: "Nov", price: 3920 }, { month: "Dec", price: 4000 }
    ]
  }
};

const profileRecommendations: Record<string, { localities: string[]; reasoning: string }> = {
  "first-time": {
    localities: ["besa", "hingna", "mihan"],
    reasoning: "For first-time buyers, we prioritize safety (low litigation), affordability, and growth potential."
  },
  "investor-short": {
    localities: ["mihan", "besa", "wardha-road"],
    reasoning: "For 3-5 year investors, we prioritize growth momentum, liquidity (days to sell), and upcoming catalysts."
  },
  "investor-long": {
    localities: ["hingna", "besa", "mihan"],
    reasoning: "For long-term investors, we prioritize low entry price, high upside potential, and infrastructure pipeline."
  },
  "commercial": {
    localities: ["wardha-road", "mihan", "hingna"],
    reasoning: "For commercial buyers, we prioritize zone classification, large parcel availability, and business corridor access."
  },
  "nri": {
    localities: ["mihan", "besa", "wardha-road"],
    reasoning: "For NRI buyers, we prioritize legal safety (clear titles), established developers, and easy remote verification."
  }
};

const profileScores: Record<string, Record<string, { score: number; breakdown: { safety: number; affordable: number; liquid: number; growth: number } }>> = {
  "first-time": {
    besa: { score: 8.5, breakdown: { safety: 9, affordable: 8, liquid: 9, growth: 8 } },
    hingna: { score: 7.2, breakdown: { safety: 7, affordable: 9, liquid: 6, growth: 7 } },
    mihan: { score: 8.0, breakdown: { safety: 10, affordable: 6, liquid: 8, growth: 8 } },
    "wardha-road": { score: 6.5, breakdown: { safety: 6, affordable: 7, liquid: 7, growth: 7 } }
  },
  "investor-short": {
    besa: { score: 7.8, breakdown: { safety: 9, affordable: 7, liquid: 9, growth: 7 } },
    hingna: { score: 6.0, breakdown: { safety: 7, affordable: 9, liquid: 5, growth: 6 } },
    mihan: { score: 9.2, breakdown: { safety: 10, affordable: 5, liquid: 10, growth: 10 } },
    "wardha-road": { score: 7.5, breakdown: { safety: 6, affordable: 8, liquid: 7, growth: 9 } }
  },
  "investor-long": {
    besa: { score: 8.8, breakdown: { safety: 9, affordable: 8, liquid: 9, growth: 9 } },
    hingna: { score: 8.5, breakdown: { safety: 7, affordable: 10, liquid: 6, growth: 10 } },
    mihan: { score: 9.0, breakdown: { safety: 10, affordable: 6, liquid: 9, growth: 10 } },
    "wardha-road": { score: 8.0, breakdown: { safety: 6, affordable: 8, liquid: 8, growth: 10 } }
  },
  "commercial": {
    besa: { score: 6.5, breakdown: { safety: 9, affordable: 7, liquid: 6, growth: 5 } },
    hingna: { score: 8.0, breakdown: { safety: 7, affordable: 10, liquid: 7, growth: 8 } },
    mihan: { score: 9.5, breakdown: { safety: 10, affordable: 6, liquid: 10, growth: 10 } },
    "wardha-road": { score: 8.8, breakdown: { safety: 6, affordable: 9, liquid: 8, growth: 10 } }
  },
  "nri": {
    besa: { score: 8.2, breakdown: { safety: 9, affordable: 8, liquid: 8, growth: 8 } },
    hingna: { score: 6.5, breakdown: { safety: 7, affordable: 9, liquid: 5, growth: 7 } },
    mihan: { score: 9.5, breakdown: { safety: 10, affordable: 6, liquid: 10, growth: 10 } },
    "wardha-road": { score: 7.0, breakdown: { safety: 6, affordable: 8, liquid: 7, growth: 8 } }
  }
};

function PriceSanityChecker() {
  const [locality, setLocality] = useState<string>("");
  const [plotSize, setPlotSize] = useState<string>("");
  const [askingPrice, setAskingPrice] = useState<string>("");
  const [result, setResult] = useState<{ verdict: string; color: string; comparison: string; details: string } | null>(null);

  const checkPrice = () => {
    if (!locality || !plotSize || !askingPrice) return;
    
    const loc = localityDetails[locality];
    if (!loc) return;

    const size = parseFloat(plotSize);
    const price = parseFloat(askingPrice);
    const pricePerSqft = price * 100000 / size; // Convert lakhs to rupees
    
    const avgPrice = loc.currentPrice;
    const minPrice = loc.priceRange[0];
    const maxPrice = loc.priceRange[1];
    
    let verdict = "";
    let color = "";
    let comparison = "";
    let details = "";
    
    if (pricePerSqft < minPrice * 0.9) {
      verdict = "UNDERPRICED";
      color = "text-emerald-600";
      comparison = `${Math.round((1 - pricePerSqft / avgPrice) * 100)}% below market average`;
      details = "This is significantly below market rate. Verify legal status carefully - very low prices often indicate hidden issues.";
    } else if (pricePerSqft > maxPrice * 1.1) {
      verdict = "OVERPRICED";
      color = "text-red-600";
      comparison = `${Math.round((pricePerSqft / avgPrice - 1) * 100)}% above market average`;
      details = "This is above the typical price range. Unless there's a special reason (corner plot, road-facing), consider negotiating.";
    } else if (pricePerSqft >= avgPrice * 0.95 && pricePerSqft <= avgPrice * 1.05) {
      verdict = "FAIR PRICE";
      color = "text-emerald-600";
      comparison = "Within 5% of market average";
      details = "This price is in line with current market rates for this locality.";
    } else if (pricePerSqft < avgPrice) {
      verdict = "GOOD VALUE";
      color = "text-emerald-600";
      comparison = `${Math.round((1 - pricePerSqft / avgPrice) * 100)}% below market average`;
      details = "This is a reasonable deal. Still run the 12-point safety check before proceeding.";
    } else {
      verdict = "SLIGHTLY HIGH";
      color = "text-amber-600";
      comparison = `${Math.round((pricePerSqft / avgPrice - 1) * 100)}% above market average`;
      details = "This is slightly above average but within range. May be justified for premium features.";
    }
    
    setResult({ verdict, color, comparison, details });
  };

  return (
    <Card className="border-2 border-indigo-200 shadow-xl rounded-3xl bg-gradient-to-br from-indigo-50 to-white overflow-hidden">
      <CardHeader className="bg-indigo-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" /> Price Sanity Checker
        </CardTitle>
        <p className="text-indigo-100 text-sm font-medium">Enter your plot details to see if the asking price is fair</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Locality</Label>
            <Select value={locality} onValueChange={setLocality}>
              <SelectTrigger data-testid="select-sanity-locality">
                <SelectValue placeholder="Select locality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="besa">Besa / Beltarodi</SelectItem>
                <SelectItem value="mihan">MIHAN</SelectItem>
                <SelectItem value="hingna">Hingna</SelectItem>
                <SelectItem value="wardha-road">Wardha Road</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Plot Size (sqft)</Label>
            <Input 
              type="number" 
              placeholder="e.g. 1500" 
              value={plotSize}
              onChange={(e) => setPlotSize(e.target.value)}
              data-testid="input-plot-size"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Asking Price (Lakhs)</Label>
            <Input 
              type="number" 
              placeholder="e.g. 52" 
              value={askingPrice}
              onChange={(e) => setAskingPrice(e.target.value)}
              data-testid="input-asking-price"
            />
          </div>
        </div>
        
        <Button 
          onClick={checkPrice} 
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold"
          disabled={!locality || !plotSize || !askingPrice}
          data-testid="button-check-price"
        >
          <DollarSign className="h-4 w-4 mr-2" /> Check Price Sanity
        </Button>

        {result && (
          <div className="mt-6 p-6 bg-white rounded-2xl border-2 border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Verdict</p>
                <p className={`text-3xl font-black ${result.color}`}>{result.verdict}</p>
              </div>
              <Badge className={`text-lg px-4 py-2 font-bold ${
                result.verdict === "FAIR PRICE" || result.verdict === "GOOD VALUE" || result.verdict === "UNDERPRICED" 
                  ? "bg-emerald-100 text-emerald-700" 
                  : result.verdict === "OVERPRICED" 
                    ? "bg-red-100 text-red-700" 
                    : "bg-amber-100 text-amber-700"
              }`}>
                {result.comparison}
              </Badge>
            </div>
            <p className="text-slate-600 font-medium mb-4">{result.details}</p>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Compared to 50+ similar plots in {localityDetails[locality]?.name}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-black text-slate-900">₹{localityDetails[locality]?.priceRange[0]}</p>
                  <p className="text-xs text-slate-500">Min/sqft</p>
                </div>
                <div>
                  <p className="text-lg font-black text-indigo-600">₹{localityDetails[locality]?.currentPrice}</p>
                  <p className="text-xs text-slate-500">Avg/sqft</p>
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900">₹{localityDetails[locality]?.priceRange[1]}</p>
                  <p className="text-xs text-slate-500">Max/sqft</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function PublicIntel() {
  const [step, setStep] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [selectedLocality, setSelectedLocality] = useState<string | null>(null);

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId);
    setStep(2);
  };

  const handleLocalitySelect = (localitySlug: string) => {
    setSelectedLocality(localitySlug);
    setStep(3);
  };

  const handleBack = () => {
    if (step === 3) {
      setSelectedLocality(null);
      setStep(2);
    } else if (step === 2) {
      setSelectedProfile(null);
      setStep(1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedProfile(null);
    setSelectedLocality(null);
  };

  const recommendations = selectedProfile ? profileRecommendations[selectedProfile] : null;
  const locality = selectedLocality ? localityDetails[selectedLocality] : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-6 px-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight">NagpurLand Intel</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Price Index</p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-800 px-4 py-2 rounded-full">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Updated: Jan 10, 2026
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-slate-800" data-testid="button-back-home">
                <Home className="h-4 w-4 mr-2" /> Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: "Your Profile" },
              { num: 2, label: "Matches" },
              { num: 3, label: "Deep Dive" }
            ].map((s, i) => (
              <div key={i} className="flex items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black text-sm ${
                  step >= s.num ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"
                }`}>
                  {step > s.num ? <CheckCircle className="h-5 w-5" /> : s.num}
                </div>
                <span className={`ml-3 font-bold text-sm hidden sm:block ${
                  step >= s.num ? "text-slate-900" : "text-slate-400"
                }`}>{s.label}</span>
                {i < 2 && <ChevronRight className="h-5 w-5 text-slate-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* STEP 1: Quick Self-Assessment */}
        {step === 1 && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-indigo-100 text-indigo-700 mb-4 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none">
                Step 1 of 3
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Should You Buy in Nagpur?
              </h1>
              <p className="text-slate-500 font-bold text-lg">
                In 10 seconds, tell us who you are. We'll show you the best localities for your situation.
              </p>
            </div>

            <div className="space-y-4 mb-12">
              {buyerProfiles.map((profile) => (
                <Card 
                  key={profile.id}
                  className="border-2 border-slate-200 hover:border-indigo-500 shadow-lg rounded-2xl cursor-pointer transition-all hover:shadow-xl group"
                  onClick={() => handleProfileSelect(profile.id)}
                  data-testid={`profile-${profile.id}`}
                >
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                      <profile.icon className="h-8 w-8 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-900 mb-1">{profile.label}</h3>
                      <p className="text-slate-500 font-medium">{profile.desc}</p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Price Sanity Checker Tool */}
            <div className="border-t border-slate-200 pt-12">
              <div className="text-center mb-8">
                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-2">Already Looking at a Plot?</p>
                <h2 className="text-2xl font-black text-slate-900">Check if the Price is Fair</h2>
              </div>
              <PriceSanityChecker />
            </div>
          </div>
        )}

        {/* STEP 2: Recommended Localities */}
        {step === 2 && recommendations && (
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors"
              data-testid="button-back-step2"
            >
              <ArrowLeft className="h-4 w-4" /> Change Profile
            </button>

            <div className="text-center mb-12">
              <Badge className="bg-indigo-100 text-indigo-700 mb-4 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none">
                Step 2 of 3
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Top Matches for You
              </h1>
              <p className="text-slate-500 font-bold text-lg max-w-xl mx-auto">
                {recommendations.reasoning}
              </p>
            </div>

            <div className="space-y-6">
              {recommendations.localities.map((slug, i) => {
                const loc = localityDetails[slug];
                if (!loc) return null;
                return (
                  <Card 
                    key={slug}
                    className="border-2 border-slate-200 hover:border-indigo-500 shadow-xl rounded-3xl cursor-pointer transition-all hover:shadow-2xl group overflow-hidden"
                    onClick={() => handleLocalitySelect(slug)}
                    data-testid={`locality-${slug}`}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-16 p-6 flex items-center justify-center font-black text-3xl text-white" style={{ backgroundColor: loc.color }}>
                          {i + 1}
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-2xl font-black text-slate-900">{loc.name}</h3>
                              <p className="text-slate-500 font-medium">{loc.bestFor}</p>
                            </div>
                            <div className="flex gap-3">
                              <Badge className={`border-none font-bold ${
                                loc.riskLevel === "Very Low" || loc.riskLevel === "Low" 
                                  ? "bg-emerald-100 text-emerald-700" 
                                  : "bg-amber-100 text-amber-700"
                              }`}>
                                {loc.riskLevel} Risk
                              </Badge>
                              {loc.tpScheme.includes("Revision") && (
                                <Badge className="bg-amber-100 text-amber-700 border-none font-bold">
                                  <AlertTriangle className="h-3 w-3 mr-1" /> TP Alert
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-6">
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price/sqft</p>
                              <p className="text-xl font-black text-slate-900">₹{loc.currentPrice.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">YoY Growth</p>
                              <p className="text-xl font-black text-emerald-600">+{loc.yoyGrowth}%</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Days to Sell</p>
                              <p className="text-xl font-black text-slate-900">{loc.timeToSell}</p>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-16 p-6 flex items-center justify-center bg-slate-50 group-hover:bg-indigo-50 transition-colors">
                          <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <Button 
                variant="ghost" 
                className="text-slate-500 hover:text-slate-900 font-bold"
                onClick={() => setStep(1)}
                data-testid="button-show-all"
              >
                Show All Localities
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Locality Deep Dive */}
        {step === 3 && locality && (
          <div className="max-w-5xl mx-auto">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors"
              data-testid="button-back-step3"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Matches
            </button>

            {/* Locality Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <Badge className="mb-4 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none text-white" style={{ backgroundColor: locality.color }}>
                  Step 3 of 3 - Deep Dive
                </Badge>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <MapPin className="h-10 w-10" style={{ color: locality.color }} />
                  {locality.name}
                </h1>
              </div>
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="font-bold"
                data-testid="button-start-over"
              >
                <X className="h-4 w-4 mr-2" /> Start Over
              </Button>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Price Analysis */}
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="pb-0" style={{ backgroundColor: locality.color }}>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" /> Price Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Avg</p>
                      <p className="text-2xl font-black text-slate-900">₹{locality.currentPrice.toLocaleString()}/sqft</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price Range</p>
                      <p className="text-2xl font-black text-slate-900">₹{locality.priceRange[0]} - ₹{locality.priceRange[1]}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500"><span className="font-bold">YoY Growth:</span> <span className="text-emerald-600 font-black">+{locality.yoyGrowth}%</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500"><span className="font-bold">6-Month:</span> <span className="text-emerald-600 font-black">+{locality.sixMonthGrowth}%</span></p>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-sm text-slate-500 mb-2"><span className="font-bold">Circle Rate:</span> ₹{locality.circleRate}/sqft</p>
                    <p className="text-sm text-slate-500 mb-2"><span className="font-bold">Gap:</span> {Math.round((locality.currentPrice - locality.circleRate) / locality.circleRate * 100)}%</p>
                    <Badge className={`font-bold border-none ${locality.fairValueVerdict.includes("FAIRLY") || locality.fairValueVerdict.includes("GOOD") ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {locality.fairValueVerdict}
                    </Badge>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <p className="text-sm font-bold text-indigo-900">Should You Buy Now?</p>
                    <p className="text-indigo-700 text-sm">{locality.shouldBuyNow}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Market Health */}
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="pb-0 bg-slate-900">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5" /> Market Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Listings</p>
                      <p className="text-2xl font-black text-slate-900">{locality.activeListings}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sold (30 days)</p>
                      <p className="text-2xl font-black text-slate-900">{locality.sold30d}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500"><span className="font-bold">Inventory Turnover:</span> {locality.inventoryTurnover} months</p>
                    <p className="text-sm text-slate-500"><span className="font-bold">Buyer Interest:</span> <span className="font-black">{locality.buyerInterest}</span></p>
                    <p className="text-sm text-slate-500"><span className="font-bold">Time to Sell:</span> <span className="font-black">{locality.timeToSell} days avg</span></p>
                  </div>
                </CardContent>
              </Card>

              {/* Legal & Safety */}
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="pb-0 bg-emerald-600">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Scale className="h-5 w-5" /> Legal & Safety
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">NA Status</p>
                      <p className="text-2xl font-black text-emerald-600">{locality.naStatus}% approved</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Risk Score</p>
                      <p className="text-2xl font-black" style={{ color: locality.color }}>{locality.riskScore}/100</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500"><span className="font-bold">TP Scheme:</span> {locality.tpScheme}</p>
                    <p className="text-sm text-slate-500"><span className="font-bold">Litigation Rate:</span> {locality.litigationRate}%</p>
                    <p className="text-sm text-slate-500"><span className="font-bold">Registration:</span> {locality.registrationDays} days</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-sm font-bold text-blue-900">Recent News</p>
                    <p className="text-blue-700 text-sm">{locality.recentNews}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Growth Drivers */}
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="pb-0 bg-amber-500">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="h-5 w-5" /> Growth Drivers
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-3">
                    {locality.growthDrivers.map((driver, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700 font-medium">{driver}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-sm text-slate-500"><span className="font-bold">Projected Growth (24 mo):</span> <span className="text-emerald-600 font-black">{locality.projectedGrowth}</span></p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Buyer Profile Match Score */}
            {selectedProfile && profileScores[selectedProfile] && profileScores[selectedProfile][selectedLocality || ""] && (
              <Card className="border-2 border-indigo-200 shadow-xl rounded-3xl mb-12 overflow-hidden bg-gradient-to-br from-indigo-50 to-white">
                <CardHeader className="bg-indigo-600">
                  <CardTitle className="text-white flex items-center gap-2 text-xl">
                    <Star className="h-6 w-6" /> Your Profile Match Score
                  </CardTitle>
                  <p className="text-indigo-100 text-sm font-medium">
                    How well {locality.name} matches your {buyerProfiles.find(p => p.id === selectedProfile)?.label} profile
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Overall Score */}
                    <div className="text-center md:w-1/3">
                      <div className="relative inline-flex items-center justify-center">
                        <div className="h-32 w-32 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-5xl font-black text-indigo-600">
                            {profileScores[selectedProfile][selectedLocality || ""]?.score.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-600 mt-3">out of 10</p>
                      <Badge className={`mt-2 font-bold border-none ${
                        profileScores[selectedProfile][selectedLocality || ""]?.score >= 8 
                          ? "bg-emerald-100 text-emerald-700" 
                          : profileScores[selectedProfile][selectedLocality || ""]?.score >= 6 
                            ? "bg-amber-100 text-amber-700" 
                            : "bg-red-100 text-red-700"
                      }`}>
                        {profileScores[selectedProfile][selectedLocality || ""]?.score >= 8 
                          ? "EXCELLENT MATCH" 
                          : profileScores[selectedProfile][selectedLocality || ""]?.score >= 6 
                            ? "GOOD MATCH" 
                            : "MODERATE MATCH"}
                      </Badge>
                    </div>
                    
                    {/* Breakdown */}
                    <div className="flex-1 w-full space-y-4">
                      <p className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Score Breakdown</p>
                      {[
                        { key: "safety", label: "Legal Safety", icon: ShieldCheck, desc: "Title clarity, litigation rate, NA status" },
                        { key: "affordable", label: "Affordability", icon: DollarSign, desc: "Entry price vs. budget expectations" },
                        { key: "liquid", label: "Liquidity", icon: Droplets, desc: "Days to sell, buyer interest" },
                        { key: "growth", label: "Growth Potential", icon: TrendingUp, desc: "YoY appreciation, infrastructure pipeline" }
                      ].map((metric) => {
                        const score = profileScores[selectedProfile][selectedLocality || ""]?.breakdown[metric.key as keyof typeof profileScores[typeof selectedProfile][string]["breakdown"]];
                        return (
                          <div key={metric.key} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <metric.icon className="h-4 w-4 text-indigo-600" />
                                <span className="font-bold text-slate-700">{metric.label}</span>
                              </div>
                              <span className="font-black text-indigo-600">{score}/10</span>
                            </div>
                            <Progress value={score * 10} className="h-2" />
                            <p className="text-xs text-slate-400">{metric.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Decision Matrix */}
            <Card className="border-none shadow-xl rounded-3xl mb-12 overflow-hidden">
              <CardHeader className="bg-slate-900">
                <CardTitle className="text-white flex items-center gap-2 text-xl">
                  <Target className="h-6 w-6" /> Your Decision Matrix
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200">
                  {[
                    { key: "firstTime", label: "First-Time Buyer", icon: Home },
                    { key: "investorShort", label: "Short-Term Investor", icon: TrendingUp },
                    { key: "investorLong", label: "Long-Term Investor", icon: Target },
                    { key: "commercial", label: "Commercial", icon: Building }
                  ].map((type) => {
                    const decision = locality.decisions[type.key as keyof typeof locality.decisions];
                    const isStrong = decision.verdict.includes("STRONG");
                    const isCaution = decision.verdict.includes("CAUTION") || decision.verdict.includes("RISKY");
                    return (
                      <div key={type.key} className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <type.icon className="h-5 w-5 text-slate-400" />
                          <span className="font-bold text-sm text-slate-700">{type.label}</span>
                        </div>
                        <Badge className={`font-black mb-2 ${
                          isStrong ? "bg-emerald-100 text-emerald-700" :
                          isCaution ? "bg-red-100 text-red-700" :
                          "bg-amber-100 text-amber-700"
                        }`}>
                          {isStrong && <CheckCircle className="h-3 w-3 mr-1" />}
                          {isCaution && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {decision.verdict}
                        </Badge>
                        <p className="text-xs text-slate-500 mt-2">{decision.reason}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Compared to Average */}
            <Card className="border-none shadow-lg rounded-2xl mb-12">
              <CardHeader>
                <CardTitle className="text-lg">Compared to Nagpur Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-2">Price Growth</p>
                    <p className="text-2xl font-black" style={{ color: locality.color }}>{locality.comparedToAvg.priceGrowth.locality}%</p>
                    <p className="text-xs text-slate-400">vs {locality.comparedToAvg.priceGrowth.avg}% avg</p>
                    <Badge className="bg-emerald-100 text-emerald-700 mt-2 font-bold">{locality.comparedToAvg.priceGrowth.diff}</Badge>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-2">Time to Sell</p>
                    <p className="text-2xl font-black" style={{ color: locality.color }}>{locality.comparedToAvg.timeToSell.locality} days</p>
                    <p className="text-xs text-slate-400">vs {locality.comparedToAvg.timeToSell.avg} days avg</p>
                    <Badge className={`mt-2 font-bold ${locality.comparedToAvg.timeToSell.diff.includes("faster") ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{locality.comparedToAvg.timeToSell.diff}</Badge>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-2">Legal Risk</p>
                    <p className="text-2xl font-black" style={{ color: locality.color }}>{locality.comparedToAvg.risk.locality}</p>
                    <p className="text-xs text-slate-400">vs {locality.comparedToAvg.risk.avg} avg</p>
                    <Badge className={`mt-2 font-bold ${locality.comparedToAvg.risk.diff.includes("safer") ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>{locality.comparedToAvg.risk.diff}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Chart */}
            <Card className="border-none shadow-xl rounded-3xl mb-12">
              <CardHeader>
                <CardTitle>12-Month Price Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={locality.priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 600 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 12, fontWeight: 600 }} stroke="#94a3b8" tickFormatter={(v) => `₹${v}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "12px", color: "#fff" }}
                        formatter={(value: number) => [`₹${value}/sqft`, "Price"]}
                      />
                      <Line type="monotone" dataKey="price" stroke={locality.color} strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-black text-white mb-4">Ready to Check a Specific Plot?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link href="/plot-checkup">
                  <Button className="h-14 px-8 rounded-2xl font-black text-lg bg-emerald-500 hover:bg-emerald-600 text-white" data-testid="button-safety-check">
                    <ShieldCheck className="h-5 w-5 mr-2" /> Check My Plot's Safety
                  </Button>
                </Link>
                <Link href="/pre-purchase-wizard">
                  <Button variant="outline" className="h-14 px-8 rounded-2xl font-black text-lg border-white/30 text-white hover:bg-white/10" data-testid="button-decision-report">
                    <Briefcase className="h-5 w-5 mr-2" /> Build Decision Report
                  </Button>
                </Link>
              </div>
              <p className="text-slate-400 text-sm">
                Most people solve this themselves using the price index + safety checkup.
                <br />
                <span className="text-slate-500">Have a specific concern? <Link href="/contact" className="text-slate-300 hover:text-white underline">Contact us</Link> (optional)</span>
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 font-medium text-sm mb-2">
            Data sourced from 200+ broker listings across Nagpur. Updated every 6 hours.
          </p>
          <p className="text-slate-500 text-xs">
            This data is for educational purposes only. Always verify independently before making purchase decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}
