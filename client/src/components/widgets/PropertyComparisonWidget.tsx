import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Scale, ArrowRight, ShieldCheck, TrendingUp, Ruler } from "lucide-react";
import { PROPERTIES } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function PropertyComparisonWidget() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Listen for custom comparison events
  useEffect(() => {
    const handleCompare = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      const id = customEvent.detail;
      setSelectedIds(prev => {
        if (prev.includes(id)) return prev.filter(i => i !== id);
        if (prev.length >= 4) return prev;
        return [...prev, id];
      });
      setIsOpen(true);
    };
    window.addEventListener('add-to-compare', handleCompare);
    return () => window.removeEventListener('add-to-compare', handleCompare);
  }, []);

  const selectedProperties = PROPERTIES.filter(p => selectedIds.includes(p.id));

  if (selectedIds.length === 0) return null;

  return (
    <>
      {/* Floating Bar */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-2xl">
        <Card className="p-4 bg-slate-900 text-white border-indigo-500/30 shadow-2xl rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <div className="flex -space-x-2">
              {selectedProperties.map(prop => (
                <Tooltip key={prop.id}>
                  <TooltipTrigger asChild>
                    <div className="h-10 w-10 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-black shrink-0 cursor-pointer hover:bg-indigo-500 transition-colors">
                      {prop.id}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-slate-900 text-white border-slate-700 max-w-[200px]">
                    <p className="font-bold text-xs">{prop.project_name}</p>
                    <p className="text-[10px] text-slate-400">{prop.locality} • ₹{(prop.price_total / 100000).toFixed(1)}L</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <span className="text-xs font-bold whitespace-nowrap">{selectedIds.length} Plots Selected</span>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" variant="ghost" onClick={() => setSelectedIds([])} className="text-slate-400 hover:text-white">Clear</Button>
            <Button size="sm" onClick={() => setIsOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 font-bold">Compare Now</Button>
          </div>
        </Card>
      </div>

      {/* Comparison Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white rounded-[2.5rem] flex flex-col relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 h-12 w-12 rounded-full hover:bg-slate-100 z-10"
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="p-8 border-b border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                <Scale className="h-8 w-8 text-indigo-600" /> Land Comparison
              </h2>
            </div>

            <div className="flex-1 overflow-x-auto p-8">
              <div className="min-w-[800px] grid grid-cols-5 gap-8">
                {/* Labels Column */}
                <div className="space-y-12 pt-48">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400 h-10 flex items-center">Price Total</div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400 h-10 flex items-center">Area (PSF)</div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400 h-10 flex items-center">Legal Status</div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400 h-10 flex items-center">Investment</div>
                </div>

                {/* Property Columns */}
                {selectedProperties.map(prop => (
                  <div key={prop.id} className="space-y-12">
                    <div className="h-44 flex flex-col">
                      <div className="h-24 w-full bg-slate-100 rounded-2xl mb-4 overflow-hidden relative">
                        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                        <Badge className="absolute top-2 left-2 bg-white/90 text-slate-900 font-bold text-[10px]">{prop.property_type}</Badge>
                      </div>
                      <h4 className="font-black text-sm text-slate-900 line-clamp-1">{prop.project_name}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">{prop.locality}</p>
                    </div>

                    <div className="h-10 flex items-center font-black text-xl text-indigo-600">₹{(prop.price_total / 100000).toFixed(1)}L</div>
                    
                    <div className="h-10 flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-slate-400" />
                      <span className="font-bold text-sm">₹{prop.price_psf}</span>
                    </div>

                    <div className="h-10 flex items-center">
                      <Badge className="bg-green-100 text-green-700 border-none font-bold text-[10px] gap-1">
                        <ShieldCheck className="h-3 w-3" /> RERA Verified
                      </Badge>
                    </div>

                    <div className="h-10 flex items-center">
                      <div className="flex items-center gap-1 text-green-600 font-black text-sm">
                        <TrendingUp className="h-4 w-4" /> 12% CAGR
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button onClick={() => setIsOpen(false)} className="h-12 px-10 rounded-xl bg-slate-900 text-white font-bold">Close Comparison</Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
