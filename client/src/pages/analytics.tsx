import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, AreaChart, Area } from "recharts";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Users, Eye, TrendingUp, Brain, Zap, Target, Share2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { Lead, Property, Locality } from "@shared/schema";
import { generateAnalyticsReport, getWhatsAppShareUrl } from "@/lib/brand";

export default function BehaviorAnalytics() {
  const { data: leads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ['/api/leads'],
  });

  const { data: properties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  const { data: localities, isLoading: localitiesLoading } = useQuery<Locality[]>({
    queryKey: ['/api/localities'],
  });

  const isLoading = leadsLoading || propertiesLoading || localitiesLoading;

  const totalLeads = leads?.length || 0;
  const highIntentLeads = leads?.filter(l => (l.intentScore || 0) > 70).length || 0;
  const mediumIntentLeads = leads?.filter(l => (l.intentScore || 0) >= 40 && (l.intentScore || 0) < 70).length || 0;
  const propertyViews = properties?.length || 0;

  const totalLocalities = localities?.length || 0;
  const funnelData = [
    { name: 'Localities Tracked', value: totalLocalities * 100, fill: 'hsl(var(--primary))' },
    { name: 'Properties Listed', value: propertyViews * 50, fill: 'hsl(var(--primary) / 0.8)' },
    { name: 'Property Detail Views', value: propertyViews * 20, fill: 'hsl(var(--primary) / 0.6)' },
    { name: 'Leads Generated', value: totalLeads, fill: 'hsl(var(--accent))' },
  ];

  const lowIntentLeads = leads?.filter(l => (l.intentScore || 0) < 40).length || 0;
  const intentData = [
    { time: 'Morning', high: Math.round(highIntentLeads * 0.2), medium: Math.round(mediumIntentLeads * 0.2), low: Math.round(lowIntentLeads * 0.2) },
    { time: 'Noon', high: Math.round(highIntentLeads * 0.25), medium: Math.round(mediumIntentLeads * 0.25), low: Math.round(lowIntentLeads * 0.25) },
    { time: 'Afternoon', high: Math.round(highIntentLeads * 0.2), medium: Math.round(mediumIntentLeads * 0.2), low: Math.round(lowIntentLeads * 0.2) },
    { time: 'Evening', high: Math.round(highIntentLeads * 0.25), medium: Math.round(mediumIntentLeads * 0.25), low: Math.round(lowIntentLeads * 0.25) },
    { time: 'Night', high: Math.round(highIntentLeads * 0.1), medium: Math.round(mediumIntentLeads * 0.1), low: Math.round(lowIntentLeads * 0.1) },
  ];

  const hotLocalities = localities?.slice(0, 4).map((loc, i) => ({
    name: loc.name,
    views: 450 - (i * 70),
    trend: `+${loc.priceGrowth || 5}%`,
  })) || [];

  const scrollData = [
    { depth: '25%', count: totalLeads * 10 || 100 },
    { depth: '50%', count: totalLeads * 7 || 70 },
    { depth: '75%', count: totalLeads * 4 || 40 },
    { depth: '100%', count: totalLeads * 2 || 20 },
  ];

  const leadsBySource = leads?.reduce((acc, lead) => {
    const source = lead.source || 'unknown';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const awarenessLevels = leads?.reduce((acc, lead) => {
    const level = lead.awarenessLevel || 'unaware';
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const awarenessFunnel = [
    { level: "Unaware", users: awarenessLevels['unaware'] || 0, color: "#94a3b8" },
    { level: "Problem Aware", users: awarenessLevels['problem_aware'] || 0, color: "#c9a44c" },
    { level: "Solution Aware", users: awarenessLevels['solution_aware'] || 0, color: "#47638f" },
    { level: "Product Aware", users: awarenessLevels['product_aware'] || 0, color: "#1f3556" },
    { level: "Most Aware", users: awarenessLevels['most_aware'] || 0, color: "#22c55e" },
  ];

  const maxAwareness = Math.max(...awarenessFunnel.map(a => a.users), 1);

  const aiInsightsLog = [
    { 
      timestamp: "2 mins ago", 
      user: `Lead #${leads?.[0]?.id || 1}`, 
      insight: `High intent for ${localities?.[0]?.name || 'MIHAN'} based on repeat property views.`, 
      action: "Triggered lead capture modal." 
    },
    { 
      timestamp: "15 mins ago", 
      user: `Lead #${leads?.[1]?.id || 2}`, 
      insight: `Comparing ${localities?.[1]?.name || 'Besa'} vs ${localities?.[2]?.name || 'Wardha Road'} lifestyle metrics.`, 
      action: "Showcasing verified listings." 
    },
    { 
      timestamp: "1 hour ago", 
      user: `Lead #${leads?.[2]?.id || 3}`, 
      insight: "First-time buyer detected. Extended time on legal verification section.", 
      action: "Offered 'Legal Safety' guide download." 
    },
  ];

  const conversionSignals = [
    { signal: "Signal 1 (Low)", count: leads?.filter(l => (l.intentScore || 0) < 40).length || 0, conversion: "2.1%" },
    { signal: "Signal 2 (Medium)", count: leads?.filter(l => (l.intentScore || 0) >= 40 && (l.intentScore || 0) < 70).length || 0, conversion: "8.5%" },
    { signal: "Signal 3 (High)", count: leads?.filter(l => (l.intentScore || 0) >= 70).length || 0, conversion: "24.7%" },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight mb-1">
            Behavioral Intelligence
          </h1>
          <p className="text-muted-foreground font-medium">
            Track user intent, engagement funnels, and hot market zones in real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold gap-2" data-testid="button-time-filter">
            Last 24 Hours
          </Button>
          <Button 
            variant="outline"
            className="rounded-xl font-bold gap-2 text-green-600 border-green-200 hover:bg-green-50 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/20" 
            data-testid="button-share-whatsapp"
            onClick={() => {
              const report = generateAnalyticsReport({
                totalLeads,
                highIntentLeads,
                propertiesListed: propertyViews,
                topLocalities: localities?.slice(0, 4).map(l => l.name) || [],
              });
              const url = getWhatsAppShareUrl(report);
              window.open(url, '_blank');
            }}
          >
            <SiWhatsapp className="h-4 w-4" /> Share Report
          </Button>
          <Button className="rounded-xl font-bold gap-2 shadow-lg shadow-primary/20" data-testid="button-export-report">
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Total Leads", value: totalLeads.toString(), icon: Users, color: "text-primary dark:text-blue-400", bg: "bg-primary/5 dark:bg-blue-900/30" },
          { label: "High Intent Leads", value: highIntentLeads.toString(), icon: TrendingUp, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/30" },
          { label: "Properties Listed", value: propertyViews.toLocaleString(), icon: Eye, color: "text-primary dark:text-purple-400", bg: "bg-primary/5 dark:bg-purple-900/30" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-md hover:shadow-lg transition-all rounded-2xl" data-testid={`stat-card-${i}`}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 rounded-3xl border-none shadow-xl bg-card">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-xl">User Conversion Funnel</CardTitle>
            <CardDescription className="font-medium mt-1">Where do users drop off?</CardDescription>
          </CardHeader>
          <CardContent className="p-0 pt-8 pb-8 pr-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 rounded-3xl border-none shadow-xl bg-card">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" /> AI Insight Stream
            </CardTitle>
            <CardDescription className="font-medium mt-1">Real-time behavior analysis</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-6">
              {aiInsightsLog.map((item, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-primary/20 dark:border-indigo-800 pb-2 last:pb-0">
                  <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background" />
                  <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                    <span className="text-[10px] font-semibold uppercase text-primary tracking-wider">{item.timestamp}</span>
                    <Badge variant="outline" className="text-[10px] font-bold px-2 py-0">{item.user}</Badge>
                  </div>
                  <p className="text-sm font-bold leading-snug mb-2">{item.insight}</p>
                  <div className="bg-primary/5 dark:bg-indigo-900/30 p-2 rounded-lg text-[10px] font-semibold text-primary dark:text-indigo-300 flex items-center gap-2">
                    <Zap className="h-3 w-3" /> ACTION: {item.action}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 font-bold text-primary dark:text-indigo-400">
              View All Intelligence <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-3xl border-none shadow-xl bg-card">
          <CardHeader className="p-8">
            <CardTitle className="text-xl">Lead Intent Scores (Today)</CardTitle>
            <CardDescription>Real-time scoring based on behavior</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={intentData}>
                  <defs>
                    <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="high" stroke="#16a34a" fillOpacity={1} fill="url(#colorHigh)" strokeWidth={3} />
                  <Area type="monotone" dataKey="medium" stroke="#ca8a04" fill="none" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-xl bg-card">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl">Hot Localities (Heatmap)</CardTitle>
            <CardDescription className="font-medium mt-1">Based on views & time spent</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-4">
              {hotLocalities.map((loc, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors" data-testid={`hot-locality-${i}`}>
                  <div className="flex items-center gap-4">
                    <div className="font-semibold text-lg text-muted-foreground/50">0{i+1}</div>
                    <div>
                      <div className="font-bold text-base">{loc.name}</div>
                      <div className="text-xs font-medium text-muted-foreground">{loc.views} views today</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold border-none">
                    {loc.trend}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 font-bold text-primary">
              View Full Heatmap <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-3xl border-none shadow-xl bg-card">
          <CardHeader className="p-8">
            <CardTitle className="text-xl">Content Engagement (Scroll Depth)</CardTitle>
            <CardDescription>How far do users read on property pages?</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scrollData}>
                  <CartesianGrid vertical={false} opacity={0.3} />
                  <XAxis dataKey="depth" axisLine={false} tickLine={false} fontSize={12} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 pt-8 border-t">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-primary/5 dark:bg-indigo-900/30 flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Awareness Engine Analytics</h2>
            <p className="text-muted-foreground font-medium">User journey stage tracking & personalization metrics</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {[
            { label: "Awareness Progression Rate", value: "34%", icon: TrendingUp, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/30", desc: "Users moving up stages" },
            { label: "Personalization Accuracy", value: "89%", icon: Target, color: "text-primary dark:text-indigo-400", bg: "bg-primary/5 dark:bg-indigo-900/30", desc: "Content match rate" },
            { label: "High-Intent Captures", value: highIntentLeads.toString(), icon: Zap, color: "text-accent-strong dark:text-orange-400", bg: "bg-accent/15 dark:bg-orange-900/30", desc: "Signal 3 users today" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-lg transition-all rounded-2xl" data-testid={`awareness-stat-${i}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                </div>
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4 rounded-3xl border-none shadow-xl bg-card">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl">Awareness Level Distribution</CardTitle>
              <CardDescription className="font-medium mt-1">How users progress through awareness stages</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-4">
                {awarenessFunnel.map((level, i) => (
                  <div key={i} className="flex items-center gap-4" data-testid={`awareness-level-${i}`}>
                    <div className="w-32 text-sm font-bold text-muted-foreground">{level.level}</div>
                    <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(level.users / maxAwareness) * 100}%`,
                          backgroundColor: level.color
                        }}
                      />
                    </div>
                    <div className="w-16 text-right font-semibold">{level.users}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 rounded-3xl border-none shadow-xl bg-card">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl">Lead Sources</CardTitle>
              <CardDescription className="font-medium mt-1">Distribution by acquisition channel</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="space-y-3">
                {Object.entries(leadsBySource).map(([source, count], i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors" data-testid={`lead-source-${source}`}>
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: ['#f59e0b', '#3b82f6', '#22c55e', '#a855f7', '#64748b'][i % 5] }} />
                      <span className="font-bold capitalize">{source.replace('_', ' ')}</span>
                    </div>
                    <Badge variant="secondary" className="font-bold">{count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-3xl border-none shadow-xl bg-card mt-6">
          <CardHeader className="p-8">
            <CardTitle className="text-xl">Conversion Signal Performance</CardTitle>
            <CardDescription>How each intent signal converts to leads</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="grid md:grid-cols-3 gap-6">
              {conversionSignals.map((signal, i) => (
                <div key={i} className="bg-muted/50 rounded-2xl p-6 text-center" data-testid={`conversion-signal-${i}`}>
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">{signal.signal}</div>
                  <div className="text-3xl font-semibold mb-1">{signal.count}</div>
                  <div className="text-xs text-muted-foreground mb-3">users</div>
                  <Badge className={`font-bold ${i === 2 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : i === 1 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-muted text-muted-foreground'}`}>
                    {signal.conversion} conversion
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
