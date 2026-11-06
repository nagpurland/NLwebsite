import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: React.ElementType;
}

export function StatCard({ title, value, trend, trendValue, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs flex items-center mt-1 text-muted-foreground">
            {trend === "up" && <ArrowUp className="h-3 w-3 text-green-500 mr-1" />}
            {trend === "down" && <ArrowDown className="h-3 w-3 text-red-500 mr-1" />}
            {trend === "neutral" && <Minus className="h-3 w-3 text-yellow-500 mr-1" />}
            <span className={cn(
              trend === "up" && "text-green-500",
              trend === "down" && "text-red-500",
              trend === "neutral" && "text-yellow-500"
            )}>
              {trendValue}
            </span>
            <span className="ml-1">vs last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
