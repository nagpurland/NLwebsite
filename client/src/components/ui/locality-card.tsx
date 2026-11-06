import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, MapPin, TrendingUp, ShieldCheck, ShieldAlert, Construction, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface Locality {
  name: string;
  slug: string;
  positioning: string;
  price_range: string;
  trend: string;
  trend_explanation: string;
  yield: string;
  legal_status: "clean" | "verify" | "risky";
  legal_text: string;
  infra_update: string;
  active_count: number;
  image?: string;
  color?: string;
}

export function LocalityCard({ loc }: { loc: Locality }) {
  const isLegalSafe = loc.legal_status === "clean";
  const legalColor = isLegalSafe ? "text-green-600 bg-green-50" : "text-yellow-600 bg-yellow-50";
  const legalIcon = isLegalSafe ? ShieldCheck : ShieldAlert;

  return (
    <Card className="group flex flex-col overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-[1.5rem] h-full bg-white relative">
      {loc.color && <div className={`h-2 ${loc.color} w-full`} />}
      
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">
              {loc.name}
            </h3>
            {loc.image && (
              <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200">
                <img src={loc.image} alt={loc.name} className="h-full w-full object-cover" />
              </div>
            )}
          </div>
          <p className="text-sm font-medium text-slate-500 leading-tight">
            {loc.positioning}
          </p>
        </div>

        {/* Price & Trend - Primary Visual Hierarchy */}
        <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-baseline gap-2 mb-1 flex-wrap">
            <span className="text-xl font-black text-slate-900">{loc.price_range}</span>
            <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              {loc.trend}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium italic">
            "{loc.trend_explanation}"
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid gap-3 mb-6">
          {/* Rental Yield */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wide text-blue-800">Rental Yield</span>
            </div>
            <span className="font-black text-lg text-blue-700">{loc.yield}</span>
          </div>

          {/* Legal Status */}
          <div className={cn("flex items-center gap-3 p-3 rounded-lg border", legalColor, isLegalSafe ? "border-green-100" : "border-yellow-100")}>
            <div className={cn("h-8 w-8 rounded-full flex items-center justify-center shrink-0", isLegalSafe ? "bg-green-100" : "bg-yellow-100")}>
              {isLegalSafe ? <ShieldCheck className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wide opacity-80">Legal Risk</div>
              <div className="text-xs font-bold leading-tight">{loc.legal_text}</div>
            </div>
          </div>

          {/* Infra Update */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <Construction className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Upcoming Infra</div>
              <div className="text-xs font-semibold text-slate-700 leading-tight">{loc.infra_update}</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <Home className="h-3 w-3" />
            {loc.active_count} active listings
          </div>
          
          <Link href={`/locality/${loc.slug}`}>
            <Button size="sm" className="font-bold rounded-lg group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              RUN SAFETY CHECK <ArrowRight className="ml-1.5 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
