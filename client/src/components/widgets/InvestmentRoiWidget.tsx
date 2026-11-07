import { Card } from "@/components/ui/card";
import { TrendingUp, ArrowUpRight } from "lucide-react";

export function InvestmentRoiWidget({ price = 4500000, growth = 12 }) {
  const futureValue = Math.round(price * Math.pow(1 + growth / 100, 5));
  const profit = futureValue - price;

  return (
    <Card className="p-6 md:p-8 border-none shadow-2xl rounded-[1.5rem] md:rounded-[2.5rem] bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)]" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white/80" />
          <h3 className="font-semibold text-base md:text-xl tracking-tight uppercase">5-Year Growth Outlook</h3>
        </div>
        <div className="space-y-3 md:space-y-4">
          <div className="flex justify-between items-end border-b border-white/10 pb-3 md:pb-4">
            <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest">Projected Value (2030)</span>
            <span className="text-xl md:text-3xl font-semibold italic">₹{(futureValue / 100000).toFixed(1)}L</span>
          </div>
          <div className="flex justify-between items-center pt-1 md:pt-2">
            <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest">Est. Capital Gain</span>
            <span className="text-green-400 font-semibold text-sm md:text-base flex items-center gap-1">
              +₹{(profit / 100000).toFixed(1)}L <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
            </span>
          </div>
        </div>
        <p className="text-[9px] md:text-[10px] text-white/80 font-bold mt-4 md:mt-6 uppercase tracking-widest italic text-center leading-tight">
          *Based on {growth}% historic CAGR in this sector
        </p>
      </div>
    </Card>
  );
}
