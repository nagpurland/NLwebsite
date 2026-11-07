import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Eye, Heart, Clock } from "lucide-react";
import { PROPERTIES } from "@/lib/mockData";

export function RecentlyViewedProperties() {
  const [viewed, setViewed] = useState<typeof PROPERTIES>([]);

  useEffect(() => {
    // Simulating recently viewed logic
    const mockViewed = [PROPERTIES[0], PROPERTIES[1]];
    setViewed(mockViewed);
  }, []);

  if (viewed.length === 0) return null;

  return (
    <Card className="p-6 border-none shadow-xl rounded-3xl bg-white">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm uppercase tracking-widest text-primary">Recently Viewed</h3>
      </div>
      <div className="space-y-4">
        {viewed.map((prop) => (
          <div key={prop.id} className="flex gap-4 group cursor-pointer">
            <div className="h-16 w-16 rounded-xl bg-slate-100 shrink-0 overflow-hidden">
              <div className="h-full w-full bg-slate-200 animate-pulse group-hover:bg-slate-300 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-primary truncate">{prop.project_name}</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{prop.locality}</p>
              <div className="text-xs font-semibold text-primary mt-1">₹{(prop.price_total / 100000).toFixed(1)}L</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
