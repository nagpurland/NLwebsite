import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, TrendingUp, TrendingDown, Eye, MousePointer,
  ArrowRight, RefreshCw
} from "lucide-react";

interface PageViewData {
  page: string;
  views: number;
  avgTime: string;
  bounceRate: number;
}

interface FunnelStep {
  name: string;
  users: number;
  dropoff: number;
}

const PAGE_VIEWS: PageViewData[] = [
  { page: "/", views: 1250, avgTime: "2:34", bounceRate: 45 },
  { page: "/4-step-system", views: 890, avgTime: "4:12", bounceRate: 28 },
  { page: "/step-1-market-intel", views: 654, avgTime: "5:45", bounceRate: 22 },
  { page: "/step-2-filter-risky", views: 412, avgTime: "8:23", bounceRate: 18 },
  { page: "/step-3-safety-check", views: 298, avgTime: "6:15", bounceRate: 15 },
  { page: "/step-4-decision-report", views: 187, avgTime: "4:50", bounceRate: 12 },
];

const FUNNEL_DATA: FunnelStep[] = [
  { name: "Homepage Visit", users: 1250, dropoff: 0 },
  { name: "4-Step Overview", users: 890, dropoff: 29 },
  { name: "Step 1 Started", users: 654, dropoff: 27 },
  { name: "Step 2 Started", users: 412, dropoff: 37 },
  { name: "Step 3 Started", users: 298, dropoff: 28 },
  { name: "Step 4 Completed", users: 187, dropoff: 37 },
];

const CLICK_DATA = [
  { element: "Start Step 1 CTA", clicks: 654, conversion: 52.3 },
  { element: "Next Step buttons", clicks: 892, conversion: 71.4 },
  { element: "Filter Tool - Analyze", clicks: 312, conversion: 75.7 },
  { element: "Export Results", clicks: 89, conversion: 28.5 },
  { element: "Schedule Consultation", clicks: 45, conversion: 24.1 },
];

export function AnalyticsDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const totalViews = PAGE_VIEWS.reduce((sum, p) => sum + p.views, 0);
  const conversionRate = ((187 / 1250) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary dark:text-white">Analytics Overview</h2>
          <p className="text-slate-600 dark:text-slate-400">Last 7 days performance</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Page Views</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/5 dark:bg-blue-900/30 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12% vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{conversionRate}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+3.2% vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg. Session Time</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">5:23</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/5 dark:bg-purple-900/30 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+45s vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Bounce Rate</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">28%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <TrendingDown className="w-4 h-4" />
              <span>-5% vs last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {FUNNEL_DATA.map((step, index) => (
                <div key={step.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{step.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{step.users}</span>
                      {step.dropoff > 0 && (
                        <Badge variant="outline" className="text-red-600">
                          -{step.dropoff}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={(step.users / FUNNEL_DATA[0].users) * 100} 
                      className="h-8"
                    />
                    {index < FUNNEL_DATA.length - 1 && (
                      <ArrowRight className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Page</th>
                    <th className="text-right py-2">Views</th>
                    <th className="text-right py-2">Avg Time</th>
                    <th className="text-right py-2">Bounce</th>
                  </tr>
                </thead>
                <tbody>
                  {PAGE_VIEWS.map((page) => (
                    <tr key={page.page} className="border-b last:border-0">
                      <td className="py-2 font-medium">{page.page}</td>
                      <td className="py-2 text-right">{page.views}</td>
                      <td className="py-2 text-right">{page.avgTime}</td>
                      <td className="py-2 text-right">
                        <Badge className={
                          page.bounceRate < 25 
                            ? "bg-green-100 text-green-700" 
                            : page.bounceRate < 40 
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }>
                          {page.bounceRate}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="w-5 h-5" />
            Click Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CLICK_DATA.map((item) => (
              <div key={item.element} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                  {item.element}
                </p>
                <p className="text-2xl font-bold text-primary">{item.clicks}</p>
                <p className="text-xs text-slate-500">clicks</p>
                <div className="mt-2 pt-2 border-t">
                  <p className="text-sm">
                    <span className="text-slate-500">Conv: </span>
                    <span className="font-semibold text-green-600">{item.conversion}%</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalyticsDashboard;
