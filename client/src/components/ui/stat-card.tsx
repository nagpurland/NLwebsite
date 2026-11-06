import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: React.ElementType;
}

export function StatCard({ title, value, trend, trendValue, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-3xl border-none shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm overflow-hidden group hover:bg-card transition-all duration-300 p-6">
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">
          {title}
        </div>
        <div className="h-10 w-10 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
          <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        </div>
      </div>
      <div className="pt-0">
        <div className="text-3xl font-black tracking-tight">{value}</div>
        {trend && (
          <div className="flex items-center mt-3">
            <div className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
              trend === "up" && "bg-green-500/10 text-green-600",
              trend === "down" && "bg-red-500/10 text-red-600",
              trend === "neutral" && "bg-yellow-500/10 text-yellow-600"
            )}>
              {trendValue}
            </div>
            <span className="ml-2 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">Growth</span>
          </div>
        )}
      </div>
    </div>
  );
}
