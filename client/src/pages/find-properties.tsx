import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Filter, ArrowRight, LayoutGrid, Zap, Scale } from "lucide-react";
import { PROPERTIES } from "@/lib/mockData";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { PropertyComparisonWidget } from "@/components/widgets/PropertyComparisonWidget";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function FindProperties() {
  const [filter, setFilter] = useState("all");

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 block">Locality</label>
        <select className="w-full h-10 rounded-lg border-input bg-background px-3 py-2 text-sm">
          <option>All Localities</option>
          <option>MIHAN</option>
          <option>Wardha Road</option>
          <option>Besa</option>
          <option>Civil Lines</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 block">Budget</label>
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span>₹10L</span>
            <span>₹5Cr</span>
          </div>
          <input type="range" className="w-full accent-primary" />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 block">Plot Type</label>
        <div className="space-y-2">
          {["Residential Plot", "Commercial Plot", "Agricultural Land", "NA Converted"].map(type => (
            <div key={type} className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" id={type} />
              <label htmlFor={type} className="text-sm font-medium">{type}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 block">Land Features</label>
        <div className="space-y-2">
          {["Title Clear", "NA Approved", "No Court Cases", "Corner Plot"].map(opt => (
            <div key={opt} className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" id={opt} />
              <label htmlFor={opt} className="text-sm font-medium">{opt}</label>
            </div>
          ))}
        </div>
      </div>
      <Button className="w-full font-bold">Apply Filters</Button>
    </div>
  );

  return (
    <PublicLayout>
      <ScrollToTop />
      <PropertyComparisonWidget />
      <div className="bg-slate-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Find Your Next Nagpur Land</h1>
          <p className="text-xl text-slate-300 max-w-2xl font-medium">
            Browse filtered, verified plots from multiple sources. Undervalued land deals auto-flagged. Every plot shows why it matches your investment goals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 font-black h-14 rounded-2xl border-slate-200">
                  <Filter className="h-5 w-5" /> Filter Plots
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] rounded-t-[2.5rem] p-8 overflow-y-auto">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-2xl font-black text-slate-900">Refine Your Strategy</SheetTitle>
                </SheetHeader>
                <FilterContent />
              </SheetContent>
            </Sheet>
          </div>

          {/* Filters Sidebar (Desktop) */}
          <div className="hidden lg:block w-72 shrink-0 space-y-8">
            <Card className="p-6 rounded-2xl border-none shadow-lg sticky top-24">
              <FilterContent />
            </Card>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  { id: "all", label: "Best Match" },
                  { id: "undervalued", label: "Undervalued Deals" },
                  { id: "high-yield", label: "High Yield" },
                  { id: "newest", label: "Newest" }
                ].map(opt => (
                  <Button 
                    key={opt.id} 
                    variant={filter === opt.id ? "default" : "outline"} 
                    className="rounded-full px-4 h-9 text-sm font-bold"
                    onClick={() => setFilter(opt.id)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
              <span className="text-sm font-bold text-muted-foreground whitespace-nowrap hidden sm:inline-block">
                Showing {PROPERTIES.length} Plots
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {PROPERTIES.map(prop => (
                <Card key={prop.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-none shadow-md rounded-[1.5rem] flex flex-col">
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                    {/* Placeholder image logic */}
                    <div className="absolute inset-0 bg-slate-200 animate-pulse group-hover:bg-slate-300 transition-colors" />
                    
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-white/90 text-slate-900 font-bold backdrop-blur-sm shadow-sm hover:bg-white">
                        {prop.property_type}
                      </Badge>
                    </div>
                    {prop.is_undervalued && (
                      <div className="absolute bottom-0 left-0 right-0 bg-green-600/90 text-white p-2 text-center text-xs font-bold backdrop-blur-md">
                        ✅ Below market by ~12%
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg leading-tight line-clamp-1">{prop.project_name}</h3>
                      <span className="font-black text-lg text-primary">₹{(prop.price_total / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-xs font-bold uppercase tracking-wider mb-4">
                      <MapPin className="h-3 w-3 mr-1" /> {prop.locality}
                    </div>

                    <div className="space-y-2 mb-6 flex-1">
                      <div className="flex items-center gap-2 text-xs font-medium bg-green-50 text-green-700 p-2 rounded-lg">
                        <ArrowRight className="h-3 w-3" />
                        Fits your 5% yield target
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium bg-blue-50 text-blue-700 p-2 rounded-lg">
                        <ArrowRight className="h-3 w-3" />
                        Safe locality, low risk
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/50 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="px-3 rounded-xl border-indigo-100 text-indigo-600 hover:bg-indigo-50 font-bold"
                        onClick={() => window.dispatchEvent(new CustomEvent('add-to-compare', { detail: prop.id }))}
                      >
                        <Scale className="h-4 w-4" />
                      </Button>
                      <Link href={`/property/${prop.id}`} className="flex-1">
                        <Button className="w-full font-bold rounded-xl" size="sm">
                          View Plot Details
                        </Button>
                      </Link>
                      <Button variant="outline" className="px-3 rounded-xl" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
