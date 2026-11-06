import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { LocalityCard } from "@/components/ui/locality-card";
import { PriceIndexSnapshot } from "@/components/widgets/PriceIndexSnapshot";

// Shared data for consistency
const LOCALITIES = [
  {
    name: "MIHAN",
    slug: "mihan",
    positioning: "Investor corridor with upcoming Metro Phase 2",
    price_range: "₹3,500–5,500 psf",
    trend: "+15.2%",
    trend_explanation: "Metro Phase 2 news drove demand",
    yield: "4.2% annually",
    legal_status: "clean" as const,
    legal_text: "No major legal flags found",
    infra_update: "Metro Phase 2: Expected 2027 (25% complete)",
    active_count: 12,
    color: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Wardha Road",
    slug: "wardha-road",
    positioning: "Premium residential corridor near airport",
    price_range: "₹5,500–7,200 psf",
    trend: "+8.1%",
    trend_explanation: "Steady demand from IT sector",
    yield: "3.5% annually",
    legal_status: "clean" as const,
    legal_text: "Verified layouts, low risk",
    infra_update: "Airport Expansion: Land acquisition phase",
    active_count: 15,
    color: "bg-green-500",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop"
  },
  {
    name: "Besa-Pipla",
    slug: "besa-pipla",
    positioning: "Affordable luxury belt for young families",
    price_range: "₹3,800–4,800 psf",
    trend: "+12.4%",
    trend_explanation: "New ring road connection boost",
    yield: "4.1% annually",
    legal_status: "verify" as const,
    legal_text: "Manual verification needed: 3 recent NA disputes",
    infra_update: "Ring Road Conn: Under construction, 60% complete",
    active_count: 8,
    color: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
  },
  {
    name: "Civil Lines",
    slug: "civil-lines",
    positioning: "Nagpur's most exclusive residential address",
    price_range: "₹8,000–12,000 psf",
    trend: "+4.5%",
    trend_explanation: "Stable appreciation, limited inventory",
    yield: "2.8% annually",
    legal_status: "clean" as const,
    legal_text: "Clean titles, zero disputes",
    infra_update: "Smart City Roads: Completed",
    active_count: 4,
    color: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Hingna",
    slug: "hingna",
    positioning: "Emerging industrial & educational hub",
    price_range: "₹2,200–3,500 psf",
    trend: "+18.5%",
    trend_explanation: "New IT Park announcement",
    yield: "5.1% annually",
    legal_status: "verify" as const,
    legal_text: "Check TP scheme status carefully",
    infra_update: "Metro Phase 2: Proposed extension",
    active_count: 22,
    color: "bg-yellow-500",
    image: "https://images.unsplash.com/photo-1449824913929-4b8a6143236c?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Manish Nagar",
    slug: "manish-nagar",
    positioning: "Established residential area with high connectivity",
    price_range: "₹4,500–6,000 psf",
    trend: "+6.2%",
    trend_explanation: "ROB completion improved access",
    yield: "3.2% annually",
    legal_status: "clean" as const,
    legal_text: "Mostly RL approved plots",
    infra_update: "Railway Underpass: Completed",
    active_count: 9,
    color: "bg-cyan-500",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop"
  }
];

export default function LocalityGuides() {
  return (
    <PublicLayout>
      <div className="relative py-32 overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.2),transparent_70%)]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="bg-white/10 text-white border-none mb-6 px-4 py-1.5 rounded-full font-bold tracking-widest text-[10px] uppercase">
            Market Intelligence
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            NAGPUR LOCALITY <span className="text-accent italic">INSIGHTS</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium">
            Proprietary data on investment corridors, infrastructure milestones, and legal compliance benchmarks.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 -mt-12 relative z-20">
        <PriceIndexSnapshot className="mb-12" />
        
        <h2 className="text-2xl font-bold mb-6">All Localities</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {LOCALITIES.map((loc) => (
            <LocalityCard key={loc.slug} loc={loc} />
          ))}
        </div>

        <div className="mt-32 glass rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
          <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">INVESTMENT SECURITY <span className="text-primary">FIRST</span></h2>
            <p className="text-muted-foreground text-xl font-medium leading-relaxed">
              Our guides go beyond market prices. We track <strong>RERA status, NA compliance, and TP schemes</strong> across Nagpur to ensure your capital is deployed safely.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl font-black text-base border-2 hover:bg-muted">
                DOWNLOAD BUYER'S CHECKLIST
              </Button>
              <Button 
                size="lg" 
                className="h-16 px-10 rounded-2xl font-black text-base bg-green-600 hover:bg-green-700 shadow-xl shadow-green-600/20"
                onClick={() => window.open("https://wa.me/918857801966?text=Hi%2C%20I%20need%20expert%20advice%20on%20Nagpur%20localities.", "_blank")}
              >
                WHATSAPP AN EXPERT
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-32 grid md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
          <div className="space-y-4">
            <div className="text-4xl font-black text-primary">24%</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Avg. Yearly Appreciation</div>
          </div>
          <div className="space-y-4">
            <div className="text-4xl font-black text-primary">50+</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Verified Projects</div>
          </div>
          <div className="space-y-4">
            <div className="text-4xl font-black text-primary">100%</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Legal Transparency</div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
