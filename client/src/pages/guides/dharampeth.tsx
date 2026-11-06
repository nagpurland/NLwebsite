import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, ShieldCheck, Construction, TrainFront, School, Hospital } from "lucide-react";

export default function DharampethGuide() {
  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="h-[300px] md:h-[400px] relative bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590059232328-912c49987019?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Badge className="bg-indigo-600 text-white mb-4 px-4 py-1 rounded-full font-bold uppercase tracking-widest border-none">Area Guide</Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Dharampeth</h1>
              <p className="text-slate-300 font-bold text-xl mt-4">The Heart of Premium Nagpur</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-12 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-8 border-none shadow-xl rounded-[2rem] bg-white">
                <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Executive Summary</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Dharampeth is Nagpur's most prestigious residential and commercial hub. Known for its upscale boutiques, iconic cafes, and elite educational institutions, it offers the highest standard of living in the city. For investors, it remains a low-volatility, high-prestige asset class.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Avg. PSF</div>
                    <div className="font-black text-2xl text-slate-900">₹12,500+</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Demand</div>
                    <div className="font-black text-2xl text-green-600">Ultra High</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Risk</div>
                    <div className="font-black text-2xl text-blue-600">Zero</div>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 border-none shadow-lg rounded-2xl">
                  <h3 className="font-black text-xl mb-6 flex items-center gap-2">
                    <TrainFront className="h-5 w-5 text-indigo-600" /> Connectivity
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-indigo-500" />
                      Metro: Jhansi Rani Sq. (0.5 km)
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-indigo-500" />
                      Nagpur Station: 3.5 km
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-indigo-500" />
                      Airport: 8 km
                    </li>
                  </ul>
                </Card>
                <Card className="p-6 border-none shadow-lg rounded-2xl">
                  <h3 className="font-black text-xl mb-6 flex items-center gap-2">
                    <School className="h-5 w-5 text-indigo-600" /> Lifestyle
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-pink-500" />
                      Walkable to CP & Berar School
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-pink-500" />
                      Traffic-Park: 0.2 km
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-pink-500" />
                      Premium Dining: Walker's Street
                    </li>
                  </ul>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-8 border-none shadow-xl rounded-[2rem] bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp className="h-24 w-24" />
                </div>
                <h3 className="font-black text-xl mb-6 relative z-10">Investment Signal</h3>
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Growth Forecast</span>
                    <span className="text-green-400 font-black">Stable (6-8%)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Rental Yield</span>
                    <span className="text-indigo-400 font-black">2.5 - 3.2%</span>
                  </div>
                  <div className="pt-4">
                    <Badge className="w-full justify-center h-10 bg-indigo-600 text-white font-black rounded-xl border-none">ELITE ASSET CLASS</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-none shadow-lg rounded-2xl bg-white">
                <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" /> Legal Context
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Most properties here are old redevelopment projects. Ensure title clearance and sanctioned floor plans from NMC are verified.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
