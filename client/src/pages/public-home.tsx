import { PublicLayout } from "@/components/layout/PublicLayout";
import { useTranslation } from "@/lib/i18n/context";
import { NAGPUR_LOCALITIES, LOCALITY_COUNT } from "@/data/nagpur-localities";
import {
  Calculator,
  Map as MapIcon,
  ShieldCheck,
  ArrowRight,
  Building2,
  Building,
  Users,
  Search,
  LayoutGrid,
  MapPin,
  Home,
  TrendingUp,
  Zap,
  BookOpen,
  Info,
  Briefcase,
  Globe,
  Check,
  ArrowUpRight,
  BarChart3
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

function Jargon({ term, definition }: { term: string, definition: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-indigo-400 border-b border-indigo-400/30 cursor-help">{term}</span>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-900 border-slate-800 text-white p-3 max-w-xs">
          <p className="text-xs font-medium leading-relaxed">{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Trust Signals Component
function TrustSignals() {
  const signals = [
    { icon: ShieldCheck, number: "542", label: "Risky Plot Patterns Identified in Nagpur", color: "text-red-600", bg: "bg-red-50" },
    { icon: Users, number: "1,248+", label: "People Have Used This Protocol Themselves", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: MapIcon, number: "186", label: "People Applied This Protocol & Avoided Disaster", color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {signals.map((signal, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all p-6 md:p-10 flex flex-col items-center text-center rounded-2xl md:rounded-[2.5rem] bg-slate-50/50">
              <div className={cn("h-14 w-14 md:h-20 md:w-20 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 shadow-inner", signal.bg)}>
                <signal.icon className={cn("h-7 w-7 md:h-10 md:w-10", signal.color)} />
              </div>
              <h3 className="text-3xl md:text-5xl font-black mb-2 text-slate-900 tracking-tighter">{signal.number}</h3>
              <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">{signal.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Quick Search Component
function QuickSearch() {
  const [, setLocation] = useLocation();
  const [budget, setBudget] = useState([30, 80]); // In Lakhs
  const [locality, setLocality] = useState("MIHAN");
  const [intent, setIntent] = useState("capital_appreciation");

  const handleSearch = () => {
    setLocation(`/understand-nagpur?min=${budget[0]}&max=${budget[1]}&locality=${locality}&intent=${intent}`);
  };

  const handleBudgetChange = (val: number[]) => {
    setBudget(val);
  };

  return (
    <section id="search-section" className="py-12 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-6xl mx-auto border-none shadow-2xl rounded-[3.5rem] overflow-hidden bg-white">
          <div className="p-6 md:p-20">
            <div className="text-center mb-16">
              <Badge className="bg-indigo-100 text-indigo-700 mb-4 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none">
                Action Mode: Direct Search
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Execute Your Strategy</h2>
              <p className="text-slate-500 font-bold mt-4">Tell us your budget, location preference, and investment purpose. We cut through 99acres, Magicbricks, Housing, NoBroker and local sources to surface only the land plots that fit your requirements.</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-16 items-start">
              {/* Strategic Intent */}
              <div className="space-y-8">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-indigo-600" /> BUYER STRATEGY
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: "capital_appreciation", label: "High Growth / Investor" },
                    { id: "homebuyer", label: "End User / Family Home" },
                    { id: "rental_income", label: "Yield / Rental Income" },
                    { id: "commercial", label: "Business / Commercial" },
                    { id: "first_time", label: "First-Time Buyer" },
                    { id: "nri", label: "NRI / Overseas Buyer" },
                    { id: "retirement", label: "Retirement / Farmhouse" },
                    { id: "resale", label: "Quick Resale / Flip" }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setIntent(t.id)}
                      className={cn(
                        "w-full text-left px-6 py-4 rounded-2xl font-black transition-all text-sm border-2",
                        intent === t.id 
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-600/20" 
                          : "bg-white text-slate-600 border-slate-100 hover:border-indigo-100"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* High-Impact Localities */}
              <div className="space-y-8">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-600" /> STRATEGIC LOCALITY
                </label>
                <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-2">
                  {NAGPUR_LOCALITIES.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setLocality(a.name)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl font-bold transition-all border-2 flex justify-between items-center text-sm",
                        locality === a.name 
                          ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20" 
                          : "bg-white text-slate-600 border-slate-100 hover:border-indigo-100"
                      )}
                    >
                      <span>{a.name}</span>
                      <span className={cn(
                        "text-[8px] uppercase tracking-tighter opacity-60 font-bold",
                        locality === a.name ? "text-indigo-300" : "text-slate-400"
                      )}>{a.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget / Capital Entry */}
              <div className="space-y-8">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 text-indigo-600" /> CAPITAL ENTRY
                </label>
                <div className="pt-2">
                  <Slider
                    defaultValue={[30, 80]}
                    max={200}
                    min={10}
                    step={5}
                    onValueChange={handleBudgetChange}
                    className="mb-8"
                  />
                  <div className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
                    <span className="font-black text-2xl text-slate-900">₹{budget[0]}L</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">to</span>
                    <span className="font-black text-2xl text-slate-900">₹{budget[1]}L+</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold italic text-center uppercase tracking-widest">
                    *Actual inventory verified for this range
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20 flex justify-center">
              <Button 
                onClick={handleSearch}
                className="h-14 md:h-20 px-8 md:px-20 rounded-2xl md:rounded-3xl font-black text-lg md:text-2xl bg-indigo-600 hover:bg-indigo-500 shadow-2xl shadow-indigo-600/30 gap-2 md:gap-4 group"
              >
                <Search className="h-5 w-5 md:h-7 md:w-7 group-hover:scale-110 transition-transform" /> See My 5 Best Matches
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default function PublicHome() {
  const t = useTranslation();
  
  return (
    <PublicLayout>
      {/* SECTION 1: HERO - FEAR TO SAFETY */}
      <section className="pt-24 md:pt-40 pb-16 md:pb-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-red-500/10 text-red-400 mb-8 px-6 py-2 rounded-full font-black tracking-[0.3em] text-[10px] uppercase border border-red-500/20">
            {t.home.heroBadge}
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-10 leading-[0.85] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            {t.home.heroTitle} <br /> <span className="text-red-400">{t.home.heroTitleHighlight}</span>
          </h1>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-3xl mx-auto mb-10 backdrop-blur-md">
            <p className="text-xl md:text-2xl text-indigo-400 font-black mb-4 tracking-tight">
              Nagpur’s independent land due‑diligence and strategy engine – <span className="text-white">use this before talking to any broker.</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left">
              <div className="space-y-1">
                <div className="text-indigo-400 font-black text-xs uppercase tracking-widest">0% Commission</div>
                <p className="text-slate-400 text-xs font-bold leading-tight">We don't sell land; we sell truth. No bias towards any specific project.</p>
                <p className="text-slate-500 text-[10px] italic mt-1 hidden md:block">So that your future self never has to say "I wish I had checked this before."</p>
              </div>
              <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <div className="text-indigo-400 font-black text-xs uppercase tracking-widest">Broker Filters</div>
                <p className="text-slate-400 text-xs font-bold leading-tight">Our engine automatically flags inflated prices and common broker traps.</p>
              </div>
              <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <div className="text-indigo-400 font-black text-xs uppercase tracking-widest">Legal-First</div>
                <p className="text-slate-400 text-xs font-bold leading-tight">12-point automated legal audit before you even step on the site.</p>
              </div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-bold mt-8 mb-10 leading-relaxed hidden">
            {t.home.heroSubtitle}
          </p>

          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-slate-300 font-bold uppercase tracking-widest">
              <ShieldCheck className="text-green-400 h-5 w-5" />
              {t.home.trustSignal1}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300 font-bold uppercase tracking-widest">
              <ShieldCheck className="text-green-400 h-5 w-5" />
              {t.home.trustSignal2}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300 font-bold uppercase tracking-widest">
              <ShieldCheck className="text-green-400 h-5 w-5" />
              {t.home.trustSignal3}
            </div>
          </div>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium mt-10 mb-16 leading-relaxed italic">
            "{t.home.heroQuote}"
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <Link href="/4-step-system">
              <Button className="h-14 md:h-24 px-8 md:px-16 rounded-xl md:rounded-[2rem] font-black text-base md:text-2xl bg-indigo-600 hover:bg-indigo-500 shadow-2xl shadow-indigo-600/30 group">
                Explore the Safety Protocol <ArrowRight className="ml-2 md:ml-4 h-5 w-5 md:h-7 md:w-7 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
            <Link href="/step-3-safety-check">
              <Button 
                variant="outline"
                className="h-14 md:h-24 px-8 md:px-16 rounded-xl md:rounded-[2rem] font-black text-base md:text-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
              >
                {t.home.understandLegalSafety}
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Intel Last Updated: Jan 2026
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Globe className="h-3 w-3 text-indigo-400" />
              {LOCALITY_COUNT}+ Nagpur Localities Covered
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: THE 4-STEP SAFETY SYSTEM */}
      <section className="py-16 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-20">
            <Badge className="bg-indigo-100 text-indigo-700 mb-4 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none">
              The NagpurLand Protocol
            </Badge>
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
              The 4-Step System to <br /> <span className="text-indigo-600">Buy Land Without Regret</span>
            </h2>
            <p className="text-slate-500 font-bold mt-6 text-xl max-w-2xl mx-auto">
              Don't leave your life savings to chance. Follow this decision system used by smart Nagpur investors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 relative max-w-5xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block z-0" />
            {[
              {
                step: "01",
                title: "Scan Market Intel",
                desc: "Check the Price Index for your chosen locality. Are you buying at the peak or a fair value?",
                icon: TrendingUp,
                link: "/step-1-market-intel",
                btn: "Check Price Index"
              },
              {
                step: "02",
                title: "Filter Risky Options",
                desc: "Use our Decision Wizard to eliminate 80% of risky plots before you waste a single site visit.",
                icon: Search,
                link: "/step-2-filter-risky",
                btn: "Start Decision Wizard"
              },
              {
                step: "03",
                title: "Run Your 12-Point Check",
                desc: "Run a quick self-check on any plot. Spot litigation, TP schemes, and RERA status before you commit.",
                icon: ShieldCheck,
                link: "/step-3-safety-check",
                btn: "Check My Plot's Safety"
              },
              {
                step: "04",
                title: "Final Sanity Check",
                desc: "Before you sign, run through our last-minute legal and price red-flag checklist yourself.",
                icon: MapPin,
                link: "/step-4-decision-report",
                btn: "Run Final Check"
              }
            ].map((s, i) => (
              <Card key={i} className="relative z-10 p-4 md:p-8 border-none shadow-xl rounded-2xl md:rounded-[2.5rem] bg-white flex flex-col h-full group hover:shadow-2xl transition-all duration-500">
                <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-base md:text-xl mb-3 md:mb-6 shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                  {s.step}
                </div>
                <h3 className="text-base md:text-xl font-black text-slate-900 mb-2 md:mb-3 leading-tight">{s.title}</h3>
                <p className="text-xs md:text-sm text-slate-500 font-medium mb-4 md:mb-8 leading-relaxed flex-1">
                  {s.desc}
                </p>
                <Link href={s.link}>
                  <Button variant="outline" className="w-full rounded-xl font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {s.btn}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          {/* Optional Help - Visually Separate */}
          <div className="mt-16 text-center max-w-xl mx-auto">
            <div className="border-t border-slate-200 pt-10">
              <p className="text-slate-500 font-medium text-sm mb-3">
                Most people solve this themselves using the protocol.
              </p>
              <p className="text-slate-400 text-sm">
                Have a specific question?{" "}
                <Link href="/invest-safely" className="text-indigo-600 font-bold hover:underline">
                  Discuss your specific situation
                </Link>
                {" "}(optional)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Topics Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <Badge className="bg-indigo-100 text-indigo-700 mb-4 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none">
              What You'll Learn
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Master Nagpur Land Buying</h2>
            <p className="text-slate-500 font-bold mt-4 text-lg max-w-2xl mx-auto">
              Free educational resources to help you make smart land investment decisions in Nagpur
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="md:col-span-2 lg:col-span-4 bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-4 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Coverage</div>
                  <div className="text-sm font-black text-slate-900">45+ Nagpur Localities</div>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Recency</div>
                  <div className="text-sm font-black text-slate-900">Updated Every 6 Hours</div>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Accuracy</div>
                  <div className="text-sm font-black text-slate-900">12-Point Legal Verification</div>
                </div>
              </div>
            </div>
            {/* PRIMARY SAFETY TOOLS - Visually Larger */}
            <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
              <Link href="/step-3-safety-check">
                <Card className="p-8 border-2 border-amber-200 shadow-2xl rounded-3xl hover:shadow-3xl transition-all cursor-pointer h-full bg-gradient-to-br from-amber-50 to-white group">
                  <div className="h-16 w-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="font-black text-2xl text-slate-900 mb-3">Run a Quick Self-Check on Any Plot</h3>
                  <p className="text-slate-600 text-base font-medium mb-6">You're in control. We just show you the method to spot red flags yourself.</p>
                  <div className="flex items-center gap-2 text-amber-700 font-black text-sm uppercase tracking-widest">
                    Check My Plot's Safety <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
              </Link>
              <Link href="/step-4-decision-report">
                <Card className="p-8 border-2 border-purple-200 shadow-2xl rounded-3xl hover:shadow-3xl transition-all cursor-pointer h-full bg-gradient-to-br from-purple-50 to-white group">
                  <div className="h-16 w-16 rounded-2xl bg-purple-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                    <Briefcase className="h-8 w-8" />
                  </div>
                  <h3 className="font-black text-2xl text-slate-900 mb-3">Build Your Own Decision Report</h3>
                  <p className="text-slate-600 text-base font-medium mb-6">Active participation, not receiving a service. Walk through what to check before you sign.</p>
                  <div className="flex items-center gap-2 text-purple-700 font-black text-sm uppercase tracking-widest">
                    Build Your Report <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
              </Link>
            </div>
            {/* Secondary Intel Tools - Smaller */}
            {[
              { 
                icon: MapPin, 
                title: "Locality OS: MIHAN", 
                desc: "Strategic deep dive into MIHAN - price trends, infra & risk maps",
                href: "/locality/mihan",
                color: "bg-blue-50 text-blue-600"
              },
              { 
                icon: MapPin, 
                title: "Locality OS: Besa", 
                desc: "Master the Besa/Beltarodi residential hub intelligence",
                href: "/locality/besa",
                color: "bg-green-50 text-green-600"
              }
            ].map((topic, i) => (
              <Link key={i} href={topic.href}>
                <Card className="p-6 border-none shadow-lg rounded-2xl hover:shadow-xl transition-all cursor-pointer h-full">
                  <div className={`h-12 w-12 rounded-xl ${topic.color} flex items-center justify-center mb-4`}>
                    <topic.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-black text-lg text-slate-900 mb-2">{topic.title}</h3>
                  <p className="text-slate-500 text-sm font-medium">{topic.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial section hidden for now */}

      {/* Newsletter Signup */}
      <section className="py-24 px-4 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-white/20 text-white mb-6 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none">
            Weekly Patterns
          </Badge>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Subscribe to Nagpur Land Patterns Weekly
          </h3>
          <p className="text-indigo-100 font-bold text-xl mb-6 max-w-2xl mx-auto">
            Every week, we publish the 3 biggest patterns + 1 emerging risk in Nagpur land. Stay tuned.
          </p>
          
          <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-200 uppercase tracking-widest">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Built from 200+ Broker Listings
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-200 uppercase tracking-widest">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Updated Every 6 Hours
            </div>
          </div>
          
          <form 
            className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              // Mock submission
              alert("Subscribed!");
            }}
          >
            <Input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 h-18 bg-white border-none rounded-2xl px-8 text-slate-900 font-bold text-lg"
              required
            />
            <Select defaultValue="All Localities">
              <SelectTrigger className="h-18 bg-white/10 border-white/20 rounded-2xl px-8 text-white font-bold text-lg w-full md:w-64 backdrop-blur-md">
                <SelectValue placeholder="Locality" />
              </SelectTrigger>
              <SelectContent className="bg-white border-none rounded-xl max-h-64 overflow-y-auto">
                <SelectItem value="All Localities">All Localities</SelectItem>
                <SelectItem value="MIHAN">MIHAN</SelectItem>
                <SelectItem value="Besa">Besa</SelectItem>
                <SelectItem value="Wardha Road">Wardha Road</SelectItem>
                <SelectItem value="Hingna">Hingna</SelectItem>
                <SelectItem value="Civil Lines">Civil Lines</SelectItem>
                <SelectItem value="Manish Nagar">Manish Nagar</SelectItem>
                <SelectItem value="Koradi">Koradi</SelectItem>
                <SelectItem value="Kamptee">Kamptee</SelectItem>
                <SelectItem value="Wadi">Wadi</SelectItem>
                <SelectItem value="Trimurti Nagar">Trimurti Nagar</SelectItem>
                <SelectItem value="Dharampeth">Dharampeth</SelectItem>
                <SelectItem value="Ramdaspeth">Ramdaspeth</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="h-18 px-12 rounded-2xl font-black text-xl bg-white text-indigo-600 hover:bg-slate-100 shadow-2xl shadow-black/20 shrink-0">
              Get Weekly Patterns
            </Button>
          </form>
          <p className="text-indigo-100 text-sm font-bold mt-4 italic">
            Join 1,200+ people learning to spot Nagpur land patterns themselves.
          </p>
          
          <p className="text-xs text-indigo-200 mt-6 font-bold uppercase tracking-widest opacity-60">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* SECTION 4: TRUST SIGNALS */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-12 text-slate-400">
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Data Sources:</span>
          </div>
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <Building className="h-5 w-5" />
            <span className="text-sm font-black">99acres</span>
          </div>
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <Building2 className="h-5 w-5" />
            <span className="text-sm font-black">Magicbricks</span>
          </div>
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <Home className="h-5 w-5" />
            <span className="text-sm font-black">Housing.com</span>
          </div>
          <div className="flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <Briefcase className="h-5 w-5" />
            <span className="text-sm font-black">200+ Local Brokers</span>
          </div>
        </div>
      </section>
      <TrustSignals />

      {/* SECTION 5: STRATEGIC CURATION */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <Badge className="bg-green-500/10 text-green-700 mb-4 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none">
                {t.home.marketAssetsBadge}
              </Badge>
              <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">{t.home.marketAssetsTitle}</h2>
              <p className="text-slate-500 font-bold mt-4 text-xl mb-4">{t.home.marketAssetsDesc}</p>
              <p className="text-indigo-600 font-black text-sm uppercase tracking-widest mb-8 bg-indigo-50 inline-block px-4 py-2 rounded-full">
                These are not for sale anywhere on this site. They're patterns we've observed. Use them as a template.
              </p>
              
              <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-black text-indigo-900 uppercase tracking-widest">Our 12-Point Independent Audit Includes:</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8">
                  {[
                    "7/12 Title Trace",
                    "NA/TP Order Check",
                    "Litigation Scan",
                    "RERA Validity",
                    "Approach Road",
                    "FSI Capacity",
                    "Demarcation",
                    "Mortgage Check",
                    "Circle Rate Gap",
                    "Utility Access",
                    "Zone Verification",
                    "Possession Scan"
                  ].map((check, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-black text-indigo-700/70 uppercase tracking-tight">
                      <Check className="h-3 w-3 text-indigo-500" />
                      {check}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/step-3-safety-check">
              <Button className="h-16 px-10 rounded-2xl font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20">
                Check If Your Plot Matches These Patterns <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "MIHAN Transit Hubs",
                criteria: "Directly in the path of Metro Phase 2 expansion.",
                insight: "We approve plots within 1.5km of planned Metro stations. These currently show a 15-18% yearly appreciation premium.",
                anonymizedExample: "1500 sqft residential plot near Khapri Station",
                color: "from-indigo-500 to-purple-600"
              },
              {
                icon: Users,
                title: "Besa Residential Safe-Zones",
                criteria: "NA approved, clear title, near IT Park development.",
                insight: "We look for plots in Besa that are fully NMRDA sanctioned and have at least a 30ft approach road for long-term resale value.",
                anonymizedExample: "1200 sqft plot in gated layout, Besa Beltarodi",
                color: "from-green-500 to-emerald-600"
              },
              {
                icon: Globe,
                title: "Central Legacy Plots",
                criteria: "Established localities with proven legal records.",
                insight: "In areas like Civil Lines or Ramdaspeth, we only approve plots with a verified 30-year title trace to ensure zero litigation risk.",
                anonymizedExample: "Premium corner plot near Japanese Garden",
                color: "from-blue-500 to-cyan-600"
              },
              {
                icon: Building,
                title: "Wardha Road Growth Axis",
                criteria: "High FSI zones with infrastructure projects nearby.",
                insight: "We prioritize large parcels that have already been converted for non-agricultural use and have clear utility access points.",
                anonymizedExample: "NA-converted land parcel near Outer Ring Road",
                color: "from-orange-500 to-red-600"
              }
            ].map((persona, i) => (
              <Card key={i} className="group border-none shadow-xl rounded-[2rem] overflow-hidden bg-white hover:shadow-2xl transition-all duration-500">
                <div className={`h-32 bg-gradient-to-br ${persona.color} flex items-center justify-center`}>
                  <persona.icon className="h-12 w-12 text-white" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-black text-slate-900 mb-2">{persona.title}</h3>
                  <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Example Pattern</div>
                    <div className="text-sm font-black text-slate-900">{persona.anonymizedExample}</div>
                  </div>
                  
                  <p className="text-sm text-slate-600 font-medium mb-4 leading-relaxed">
                    {persona.insight}
                  </p>
                  
                  <div className="bg-indigo-50/50 p-4 rounded-xl">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 leading-none">Primary Approval Criteria</div>
                    <div className="text-[11px] font-bold text-indigo-900">{persona.criteria}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: BOTTOM CTA */}
      <section className="py-40 bg-slate-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(79,70,229,0.1),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-12 max-w-4xl mx-auto leading-none">
            Ready to find your <br /> <span className="text-indigo-400">Strategic Asset?</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Link href="/understand-nagpur">
              <Button className="h-24 px-16 rounded-[2.5rem] font-black text-2xl bg-indigo-600 hover:bg-indigo-500 shadow-2xl shadow-indigo-600/30">
                Explore Market Insights
              </Button>
            </Link>
            <Link href="/understand-nagpur">
              <Button variant="outline" className="h-24 px-16 rounded-[2.5rem] font-black text-2xl border-white/10 bg-white/5 hover:bg-white/10">
                Learn Nagpur Strategy
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
