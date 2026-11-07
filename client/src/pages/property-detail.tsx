import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EmiCalculatorWidget } from "@/components/widgets/EmiCalculatorWidget";
import { MetroConnectivityBadge } from "@/components/widgets/MetroConnectivityBadge";
import { InvestmentRoiWidget } from "@/components/widgets/InvestmentRoiWidget";
import { RecentlyViewedProperties } from "@/components/widgets/RecentlyViewedProperties";
import { 
  MapPin, 
  Home, 
  Ruler, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  Construction, 
  ArrowUpRight, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  ExternalLink,
  AlertTriangle,
  Zap,
  Mail,
  BarChart3,
  Info,
  LayoutGrid
} from "lucide-react";
import { useParams, useLocation, Link } from "wouter";
import { PROPERTIES } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { generatePropertyReport, getWhatsAppShareUrl } from "@/lib/brand";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Utility for property audit
const generatePropertyAudit = (property: any, market: any) => {
  const isTPChecked = property.locality === "MIHAN" || property.locality === "Wardha Road";
  const riskFlag = isTPChecked ? "Low Risk" : "Verify TP Scheme";
  const riskColor = isTPChecked ? "text-green-600" : "text-yellow-600";
  
  const priceDiff = ((market.avg_psf - property.price_psf) / market.avg_psf) * 100;
  let opportunityFlag = "Standard Value";
  if (priceDiff > 20) opportunityFlag = "Undervalued";
  else if (market.yield > 4) opportunityFlag = "High Rental";
  
  const bestFor = property.property_type === "Plot" ? "Investor" : "End User";
  
  return { riskFlag, riskColor, opportunityFlag, bestFor };
};

// Mock function for newsletter
const subscribeNewsletter = async (data: any) => {
  console.log("Newsletter subscription:", data);
  return { success: true };
};

// Mock data enrichments for the detail page
const INFRA_UPDATES = {
  "MIHAN": [
    { name: "Metro Phase 2", status: "Expected 2027", progress: 25, dist: "2 km" },
    { name: "Ring Road Conn.", status: "Under Construction", progress: 60, dist: "1.5 km" },
    { name: "New IT Park", status: "Announced 2025", progress: 0, dist: "3 km" }
  ],
  "Besa": [
    { name: "Ring Road Conn.", status: "Under Construction", progress: 60, dist: "0.5 km" },
    { name: "Water Pipeline", status: "Completed", progress: 100, dist: "0 km" }
  ],
  "Wardha Road": [
    { name: "Airport Expansion", status: "Land Acquisition", progress: 15, dist: "3 km" },
    { name: "Metro Phase 2", status: "Approved", progress: 10, dist: "1 km" }
  ]
};

const MARKET_STATS = {
  "MIHAN": { avg_psf: 4200, yield: 4.2, trend: 15.2, supply: 12 },
  "Besa": { avg_psf: 4100, yield: 3.9, trend: 12.4, supply: 8 },
  "Wardha Road": { avg_psf: 6500, yield: 3.5, trend: 8.1, supply: 15 },
  "Civil Lines": { avg_psf: 11000, yield: 2.8, trend: 4.5, supply: 4 }
};

export default function PropertyDetail() {
  const { id } = useParams();
  const [_, setLocation] = useLocation();
  
  // Find property from mock data or use fallback
  const property = PROPERTIES.find(p => p.id === Number(id)) || PROPERTIES[0];
  const market = MARKET_STATS[property.locality as keyof typeof MARKET_STATS] || MARKET_STATS["MIHAN"];
  const infra = INFRA_UPDATES[property.locality as keyof typeof INFRA_UPDATES] || [];
  
  // Calculate specific metrics
  const isUndervalued = property.price_psf < market.avg_psf;
  const discount = isUndervalued ? Math.round(((market.avg_psf - property.price_psf) / market.avg_psf) * 100) : 0;
  const projectedYield = property.property_type === "Flat" ? (market.yield + 0.5).toFixed(1) : market.yield;
  const monthlyRent = Math.round((property.price_total * (Number(projectedYield) / 100)) / 12);

  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Header Image Section */}
        <div className="h-[300px] md:h-[400px] relative bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-e32c1b9b6dfd?q=80&w=2076&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4 md:p-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
                <div className="w-full md:w-auto">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md text-[10px] md:text-xs">
                      {property.property_type}
                    </Badge>
                    <Badge className="bg-green-500/80 hover:bg-green-500 text-white border-none backdrop-blur-md text-[10px] md:text-xs">
                      Active
                    </Badge>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight">{property.project_name}</h1>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-2">
                    <div className="flex items-center text-slate-300 text-sm md:text-lg font-medium">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-1" /> {property.locality}, Nagpur
                    </div>
                    <MetroConnectivityBadge distance="1.2 km" />
                  </div>
                </div>
                <div className="text-left md:text-right w-full md:w-auto bg-white/10 backdrop-blur-md p-3 rounded-xl md:bg-transparent md:p-0 md:rounded-none">
                  <div className="text-2xl md:text-4xl font-black text-white">₹{(property.price_total / 100000).toFixed(1)}L</div>
                  <div className="text-slate-300 text-xs md:text-sm font-medium">₹{property.price_psf.toLocaleString()} / sq.ft</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-6 md:-mt-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              
              {/* Key Specs Bar */}
              <Card className="p-4 md:p-6 border-none shadow-lg flex justify-between items-center rounded-2xl overflow-x-auto gap-4">
                <div className="text-center flex-1 min-w-[80px] border-r border-slate-100 last:border-0">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Area</div>
                  <div className="font-black text-sm md:text-xl flex items-center justify-center gap-1">
                    <Ruler className="h-3 w-3 md:h-4 md:w-4 text-primary" /> {property.area} <span className="text-[10px] md:text-sm font-medium text-slate-400">{property.unit}</span>
                  </div>
                </div>
                <div className="text-center flex-1 min-w-[80px] border-r border-slate-100 last:border-0">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Type</div>
                  <div className="font-black text-sm md:text-xl flex items-center justify-center gap-1">
                    <Home className="h-3 w-3 md:h-4 md:w-4 text-primary" /> {property.property_type}
                  </div>
                </div>
                <div className="text-center flex-1 min-w-[80px]">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Listed</div>
                  <div className="font-black text-sm md:text-xl flex items-center justify-center gap-1 whitespace-nowrap">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 text-primary" /> {property.last_seen}
                  </div>
                </div>
              </Card>

              {/* Empowerment Section */}
              <Card className="overflow-hidden border-none shadow-lg rounded-2xl">
                <div className="bg-indigo-600 p-4 text-white font-bold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  WHY THIS PROPERTY FITS YOU
                </div>
                <div className="p-6 bg-white space-y-4">
                  {isUndervalued && (
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <TrendingUp className="h-4 w-4 text-green-700" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900">Undervalued by {discount}% vs area average</span>
                        <p className="text-sm text-slate-600">You pay ₹{property.price_psf}/psf vs the area average of ₹{market.avg_psf}/psf.</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Construction className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Near major infrastructure</span>
                      <p className="text-sm text-slate-600">{infra[0]?.name} is just {infra[0]?.dist} away, driving future appreciation.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Safe Locality</span>
                      <p className="text-sm text-slate-600">No major legal disputes found in this sector for the last 5 years.</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Area Comparison */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-none shadow-md rounded-2xl">
                  <h3 className="font-black text-lg mb-4 text-slate-900">Area Comparison</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Price (PSF)</span>
                      <div className="text-right">
                        <span className="block font-bold">₹{property.price_psf} vs ₹{market.avg_psf}</span>
                        {isUndervalued ? (
                          <span className="text-xs font-bold text-green-600">{discount}% Cheaper</span>
                        ) : (
                          <span className="text-xs font-bold text-orange-600">Premium Pricing</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: `${(property.price_psf / (market.avg_psf * 1.2)) * 100}%` }} />
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-medium text-slate-600">Rental Yield</span>
                      <div className="text-right">
                        <span className="block font-bold">{projectedYield}% vs {market.yield}%</span>
                        <span className="text-xs font-bold text-green-600">Better Returns</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-medium text-slate-600">Market Trend</span>
                      <div className="text-right">
                        <span className="block font-bold text-green-600">+{market.trend}% YoY</span>
                        <span className="text-xs font-medium text-slate-400">Strong Growth</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-none shadow-md rounded-2xl">
                  <h3 className="font-black text-lg mb-4 text-slate-900">Legal Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="font-bold text-sm text-green-900">NA Verified</span>
                      </div>
                      <span className="text-xs font-bold text-green-700 bg-white px-2 py-1 rounded-md shadow-sm">Clean</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="font-bold text-sm text-green-900">Title Clear</span>
                      </div>
                      <span className="text-xs font-bold text-green-700 bg-white px-2 py-1 rounded-md shadow-sm">Verified</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                      <div className="flex items-center gap-3">
                        <ShieldAlert className="h-5 w-5 text-yellow-600" />
                        <span className="font-bold text-sm text-yellow-900">TP Scheme</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-3 w-3 text-slate-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-slate-900 border-slate-800 text-white p-3 max-w-xs">
                              <p className="text-xs font-medium leading-relaxed">Town Planning Scheme – Municipal process for property development. 'Check' means verify with local authorities before buying.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <span className="text-xs font-bold text-yellow-700 bg-white px-2 py-1 rounded-md shadow-sm">Check</span>
                    </div>
                  </div>
                </Card>

                {/* Document Verification Progress */}
                <Card className="p-6 border-none shadow-md rounded-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black text-lg text-slate-900">Document Maturity</h3>
                    <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                      8/12 Verified
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <Progress value={66} className="h-2" />
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: "7/12 Extract", status: "Verified" },
                        { name: "Sale Deed", status: "Verified" },
                        { name: "Tax Receipts", status: "Verified" },
                        { name: "N.A. Order", status: "Verified" },
                        { name: "TP Map", status: "In Review" },
                        { name: "Zone Cert.", status: "Pending" }
                      ].map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight text-slate-500">
                          <div className={cn("h-1.5 w-1.5 rounded-full", doc.status === "Verified" ? "bg-green-500" : doc.status === "In Review" ? "bg-yellow-500" : "bg-slate-300")} />
                          {doc.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* FEATURE 1: Doctor's Property Audit */}
              {(() => {
                const audit = generatePropertyAudit(property, market);
                return (
                  <Card className="p-8 border-none shadow-xl rounded-[2rem] bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16" />
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <Badge className="bg-red-100 text-red-700 mb-3 px-3 py-0.5 rounded-full font-black tracking-widest text-[10px] uppercase border-none animate-pulse">
                          Critical Safety Check
                        </Badge>
                        <h3 className="font-black text-3xl text-slate-900 tracking-tight">The "Anti-Scam" Shield</h3>
                      </div>
                      <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center">
                        <ShieldAlert className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">
                      Nagpur real estate is full of <span className="text-red-600 font-bold">hidden traps</span>: properties with <span className="text-red-600 font-bold">legal fights</span>, land owned by <span className="text-red-600 font-bold">someone else</span>, and paperwork that <span className="text-red-600 font-bold">isn't actually real</span>. Our shield is the only thing standing between your <span className="text-red-600 font-bold">life savings</span> and a permanent <span className="text-red-600 font-bold">legal nightmare</span>.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Risk Flag</div>
                        <div className={cn("font-black text-lg flex items-center gap-2", audit.riskColor)}>
                          <AlertTriangle className="h-4 w-4" /> {audit.riskFlag}
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Opportunity</div>
                        <div className="flex">
                          <Badge className="bg-green-100 text-green-700 font-black px-3 py-1 rounded-lg border-none">
                            {audit.opportunityFlag}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Best For</div>
                        <div className="flex">
                          <Badge className="bg-slate-900 text-white font-black px-3 py-1 rounded-lg border-none">
                            {audit.bestFor}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Link href={`/insights/property-audit?id=${property.id}`}>
                      <Button className="w-full h-16 rounded-2xl font-black text-lg bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/20">
                        Get Full Audit (Paid) <ArrowUpRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </Card>
                );
              })()}

              {/* Amenities Score */}
              <Card className="p-6 border-none shadow-md rounded-2xl">
                <h3 className="font-black text-lg mb-6 text-slate-900 flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5 text-indigo-600" /> Amenities Score
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "Connectivity", score: 85 },
                    { name: "Lifestyle", score: 70 },
                    { name: "Daily Needs", score: 90 },
                    { name: "Greenery", score: 65 }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                        <span>{item.name}</span>
                        <span>{item.score}/100</span>
                      </div>
                      <Progress value={item.score} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Infra Timeline */}
              <Card className="p-6 border-none shadow-md rounded-2xl">
                <h3 className="font-black text-lg mb-6 flex items-center gap-2">
                  <Construction className="h-5 w-5 text-orange-500" />
                  Upcoming Infrastructure <span className="text-sm font-normal text-slate-500 ml-2">(Why prices may rise)</span>
                </h3>
                <div className="space-y-6">
                  {infra.map((item, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-slate-200 last:border-0">
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-2 border-primary" />
                      <div className="flex justify-between items-start -mt-1">
                        <div>
                          <h4 className="font-bold text-slate-900">{item.name}</h4>
                          <p className="text-sm text-slate-500">{item.status} • {item.dist} away</p>
                        </div>
                        <Badge variant="secondary" className="font-bold">
                          {item.progress}% Done
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {infra.length === 0 && (
                    <p className="text-slate-500 italic">No major infrastructure updates tracked for this specific micro-market.</p>
                  )}
                </div>
              </Card>

              {/* FEATURE 3: Weekly Nagpur Insights Newsletter */}
              <Card className="p-6 md:p-10 border-none shadow-2xl rounded-[2rem] md:rounded-[3rem] bg-slate-950 text-white relative overflow-hidden mt-8 md:mt-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.15),transparent)] pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="h-12 w-12 md:h-16 md:w-16 rounded-[1.5rem] md:rounded-[2rem] bg-indigo-500/10 flex items-center justify-center mb-4 md:mb-6 border border-indigo-500/20">
                    <Mail className="h-6 w-6 md:h-8 md:w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-3 md:mb-4">Weekly Nagpur Insights</h3>
                  <p className="text-slate-400 font-bold text-sm md:text-lg mb-6 md:mb-10 max-w-xl">
                    Get locality trends, deal alerts, and strategy tips delivered to your inbox every Sunday.
                  </p>
                  
                  <form 
                    className="flex flex-col gap-3 md:gap-4 w-full max-w-2xl"
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Subscribed!",
                        description: "You're now on the insider list for Nagpur real estate.",
                      });
                    }}
                  >
                    <Input 
                      type="email" 
                      placeholder="your@email.com" 
                      required
                      className="h-14 md:h-16 bg-white/5 border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 text-white font-bold text-base md:text-lg focus:bg-white/10"
                    />
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                      <Select defaultValue={property.locality}>
                        <SelectTrigger className="h-14 md:h-16 bg-white/5 border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 text-white font-bold text-base md:text-lg w-full md:w-64 focus:bg-white/10">
                          <SelectValue placeholder="Locality" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-800 text-white rounded-xl">
                          {Object.keys(MARKET_STATS).map(loc => (
                            <SelectItem key={loc} value={loc} className="font-bold hover:bg-slate-800 focus:bg-slate-800">{loc}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button type="submit" className="h-14 md:h-16 px-6 md:px-10 rounded-xl md:rounded-2xl font-black text-base md:text-lg bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 shrink-0">
                        Subscribe Free
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>

            </div>

            {/* Sidebar / CTAs */}
            <div className="space-y-6">
              <RecentlyViewedProperties />
              <EmiCalculatorWidget />
              <InvestmentRoiWidget price={property.price_total} growth={Number(market.trend)} />
              
              {/* Rental Card */}
              <Card className="p-6 border-none shadow-lg rounded-2xl bg-slate-900 text-white">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Rental Potential
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-slate-400 text-sm">Monthly Rent</span>
                    <span className="font-black text-xl">₹{monthlyRent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-slate-400 text-sm">Gross Yield</span>
                    <span className="font-black text-xl text-green-400">{projectedYield}%</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-400 text-sm">Demand</span>
                    <Badge className="bg-green-500 text-white hover:bg-green-600 border-none">High</Badge>
                  </div>
                </div>
              </Card>

              {/* Engagement Metrics */}
              <Card className="p-6 border-none shadow-lg rounded-2xl bg-slate-800 text-white">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Engagement Analytics</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Viewed by</span>
                    <span className="font-black text-green-400">247 buyers</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Saved by</span>
                    <span className="font-black text-green-400">84 buyers</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Inquiries</span>
                    <span className="font-black text-green-400">31 questions</span>
                  </div>
                </div>
              </Card>

              {/* Sticky Mobile Action Bar */}
              <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-100 p-4 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <Button className="flex-1 h-14 rounded-xl font-black text-base bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 gap-2">
                  <MessageSquare className="h-5 w-5" /> Enquire
                </Button>
                <Button variant="outline" className="flex-1 h-14 rounded-xl font-black text-base border-2 border-slate-200 gap-2">
                  <Zap className="h-5 w-5 text-indigo-600" /> WhatsApp
                </Button>
              </div>

              {/* Action Buttons */}
              <Card className="p-6 border-none shadow-lg rounded-2xl space-y-3 sticky top-24">
                {/* FEATURE 4: Your Shortlist Insights */}
                <div className="pb-4 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-indigo-600" />
                    </div>
                    <p className="text-sm font-bold text-slate-900">Your Shortlist Insights</p>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">You've shortlisted 3 properties. Seeing patterns in Besa & MIHAN.</p>
                  <Link href="/dashboard/shortlist-insights">
                    <Button variant="outline" className="w-full h-10 font-bold text-xs rounded-xl border-indigo-100 bg-indigo-50/30 text-indigo-700 hover:bg-indigo-50">
                      View My Insights <ArrowUpRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>

                <Button className="w-full h-12 font-bold text-base rounded-xl bg-slate-900 hover:bg-slate-800">
                  Schedule Site Visit
                </Button>
                <Button 
                  className="w-full h-12 font-bold text-base rounded-xl bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open(`https://wa.me/918857801966?text=Hi%2C%20I%27m%20interested%20in%20${property.project_name}%20at%20${property.locality}`, "_blank")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask an Expert
                </Button>

                {/* FEATURE 2: Compare Similar Properties */}
                <div className="mt-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-slate-600" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">See Similar Properties</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
                    See how this {property.property_type} in {property.locality} stacks against others in your budget.
                  </p>
                  <Link href={`/find-properties?type=${property.property_type}&locality=${property.locality}&budget=45L&compare=${property.id}`}>
                    <Button className="w-full h-10 font-bold text-xs rounded-xl bg-slate-900 hover:bg-slate-800 text-white">
                      Compare Now
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    className="h-10 font-bold rounded-xl border-green-200 text-green-700 hover:bg-green-50"
                    data-testid="button-share-whatsapp-property"
                    onClick={() => {
                      const report = generatePropertyReport({
                        title: property.project_name,
                        locality: property.locality,
                        price: property.price_total,
                        area: property.area,
                        propertyType: property.property_type,
                        aiScore: 85,
                      });
                      const url = getWhatsAppShareUrl(report);
                      window.open(url, '_blank');
                    }}
                  >
                    <SiWhatsapp className="mr-2 h-4 w-4" /> Share
                  </Button>
                  <Button variant="outline" className="h-10 font-bold rounded-xl border-slate-200">
                    <Bookmark className="mr-2 h-4 w-4" /> Save
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-bold uppercase tracking-widest">Source</span>
                    <span>{property.source}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Listed on {property.last_seen}. Price and availability subject to change. Verify independently.
                  </p>
                  <Link href="/find-properties" className="flex items-center gap-1 text-xs font-bold text-primary mt-3 hover:underline">
                    View more properties <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
