import { useParams, Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Building2, 
  ArrowUpRight, 
  AlertTriangle,
  ArrowRight,
  Info,
  CheckCircle2,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PricePredictionWidget } from "@/components/widgets/PricePredictionWidget";
import { WatchlistButton } from "@/components/widgets/WatchlistButton";
import { PriceAlertModal } from "@/components/widgets/PriceAlertModal";

const LOCALITY_DATA: Record<string, any> = {
  "mihan": {
    name: "MIHAN",
    fullName: "Multi-modal International Cargo Hub and Airport at Nagpur",
    confidenceScore: 9.2,
    priceBands: {
      residential: "₹2,800 - ₹4,500 per sqft",
      commercial: "₹6,000 - ₹12,000 per sqft",
    },
    trends: [
      { year: "2019", price: 1800 },
      { year: "2021", price: 2400 },
      { year: "2023", price: 3200 },
      { year: "2025", price: 4200 },
    ],
    infra: [
      { title: "Metro Phase 2", desc: "Operational by 2027, connecting MIHAN to city center", status: "Ongoing" },
      { title: "IT Expansion", desc: "New campuses by Infosys and HCL", status: "Active" },
      { title: "Cargo Terminal", desc: "Expansion of cargo handling capacity", status: "Planned" }
    ],
    risks: [
      { title: "Title Verification", desc: "Watch for old agricultural land titles", severity: "Medium" },
      { title: "TP Schemes", desc: "Verify latest layout sanctions near metro", severity: "Low" }
    ],
    profiles: [
      { role: "Investors", reason: "High appreciation potential due to IT jobs" },
      { role: "NRIs", reason: "Stable, high-quality development zone" }
    ]
  },
  "besa": {
    name: "Besa",
    fullName: "Besa - Beltarodi Residential Hub",
    confidenceScore: 8.4,
    priceBands: {
      residential: "₹3,200 - ₹5,200 per sqft",
      commercial: "₹8,000 - ₹15,000 per sqft",
    },
    trends: [
      { year: "2019", price: 2200 },
      { year: "2021", price: 2800 },
      { year: "2023", price: 4000 },
      { year: "2025", price: 5000 },
    ],
    infra: [
      { title: "Outer Ring Road", desc: "Excellent connectivity to highway", status: "Completed" },
      { title: "Retail Hubs", desc: "New malls and supermarkets planned", status: "Planned" }
    ],
    risks: [
      { title: "Drainage Issues", desc: "Check specific plot elevation", severity: "Medium" },
      { title: "Unauthorized Layouts", desc: "Check for NMRDA sanctions", severity: "High" }
    ],
    profiles: [
      { role: "Homebuyers", reason: "Established residential community" },
      { role: "Investors", reason: "Consistent 12-15% annual growth" }
    ]
  }
};

export default function LocalityOS() {
  const { id } = useParams();
  const data = LOCALITY_DATA[id?.toLowerCase() || "mihan"] || LOCALITY_DATA["mihan"];

  return (
    <PublicLayout>
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
              <div>
                <Badge className="bg-indigo-100 text-indigo-700 mb-4 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none">
                  Locality OS
                </Badge>
                <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">{data.name}</h1>
                <p className="text-slate-500 font-bold text-xl">{data.fullName}</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <WatchlistButton localityName={data.name} />
                  <PriceAlertModal localityName={data.name} currentPrice={data.trends[data.trends.length - 1]?.price}>
                    <Button variant="outline" size="default" data-testid="button-set-alert">
                      <Bell className="h-4 w-4 mr-2" />
                      Set Price Alert
                    </Button>
                  </PriceAlertModal>
                </div>
              </div>
              <Card className="p-8 border-none shadow-xl rounded-[2rem] bg-indigo-600 text-white flex flex-col items-center">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Confidence Score</div>
                <div className="text-5xl font-black">{data.confidenceScore}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] mt-2 bg-white/20 px-3 py-1 rounded-full">High Trust Zone</div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Price Bands & Trends */}
                <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
                  <CardHeader className="p-10 pb-0">
                    <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <TrendingUp className="h-6 w-6 text-indigo-600" /> Price Intelligence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Residential Plot Range</div>
                        <div className="text-lg font-black text-slate-900">{data.priceBands.residential}</div>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Commercial Plot Range</div>
                        <div className="text-lg font-black text-slate-900">{data.priceBands.commercial}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Trend (Price per sqft)</div>
                      <div className="h-48 flex items-end gap-4">
                        {data.trends.map((t: any, i: number) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div 
                              className="w-full bg-indigo-600 rounded-t-xl transition-all duration-1000" 
                              style={{ height: `${(t.price / 5500) * 100}%` }}
                            />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.year}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Infrastructure */}
                <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
                  <CardHeader className="p-10 pb-0">
                    <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <Building2 className="h-6 w-6 text-indigo-600" /> Upcoming Infrastructure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-10 grid md:grid-cols-2 gap-6">
                    {data.infra.map((item: any, i: number) => (
                      <div key={i} className="p-6 rounded-2xl border border-slate-100 space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-black text-slate-900">{item.title}</h4>
                          <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest">{item.status}</Badge>
                        </div>
                        <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                {/* AI Price Prediction */}
                <PricePredictionWidget localityName={data.name} />

                {/* Risk Map */}
                <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-red-50 border border-red-100">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <h3 className="text-xl font-black text-red-900">Locality Risk Map</h3>
                  </div>
                  <div className="space-y-6">
                    {data.risks.map((risk: any, i: number) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-red-800 uppercase tracking-widest">{risk.title}</span>
                          <span className={cn(
                            "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                            risk.severity === "High" ? "bg-red-200 text-red-900" : "bg-amber-200 text-amber-900"
                          )}>{risk.severity} Risk</span>
                        </div>
                        <p className="text-xs font-bold text-red-700/70">{risk.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/invest-safely">
                    <Button variant="outline" className="w-full mt-8 border-red-200 text-red-700 hover:bg-red-100 font-bold rounded-xl">
                      Read Full Legal Guide
                    </Button>
                  </Link>
                </Card>

                {/* Recommended Profiles */}
                <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-white">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-xl font-black text-slate-900">Recommended For</h3>
                  </div>
                  <div className="space-y-6">
                    {data.profiles.map((profile: any, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-sm leading-none mb-1">{profile.role}</h4>
                          <p className="text-xs font-bold text-slate-500">{profile.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-slate-900 text-white overflow-hidden relative">
                  <div className="relative z-10">
                    <h3 className="text-xl font-black mb-4">Want a specific audit for this area?</h3>
                    <p className="text-sm font-bold text-slate-400 mb-8 leading-relaxed">
                      Run the 12-point checkup for any plot in {data.name} before you commit.
                    </p>
                    <Link href="/plot-checkup">
                      <Button className="w-full h-16 rounded-2xl font-black text-lg bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30">
                        Run 12-Point Audit
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
