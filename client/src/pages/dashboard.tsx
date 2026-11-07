import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { StatCard } from "@/components/ui/stat-card";
import { Building, Users, TrendingUp, AlertTriangle, Plus, Download, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { Lead, Property } from "@shared/schema";

const PRICE_TRENDS = [
  { name: "Jan", price: 4200 },
  { name: "Feb", price: 4350 },
  { name: "Mar", price: 4280 },
  { name: "Apr", price: 4520 },
  { name: "May", price: 4680 },
  { name: "Jun", price: 4890 },
  { name: "Jul", price: 5100 },
  { name: "Aug", price: 5250 },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  
  const { data: properties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"]
  });

  const { data: leads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"]
  });

  const { data: eventStats } = useQuery<{ eventCounts: Record<string, number> }>({
    queryKey: ["/api/events/stats"],
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/analytics/dashboard"]
  });

  const propertyCount = properties?.length || 0;
  const newLeadsCount = leads?.filter(l => l.status === "new").length || 0;
  const highIntentLeads = leads?.filter(l => (l.intentScore || 0) >= 70).length || 0;
  
  const isLoading = propertiesLoading || leadsLoading || analyticsLoading;

  // Visitors can type anything into a lead form, so stop spreadsheets running it as a formula.
  const csvCell = (value: unknown) => {
    const text = String(value ?? "");
    const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
    return `"${safe.replace(/"/g, '""')}"`;
  };

  const handleExport = () => {
    let csv = "Type,ID,Title/Name,Locality,Price/Budget,Status\n";
    
    properties?.forEach((p) => {
      csv += ["Property", p.id, p.title, p.locality, p.price, p.isVerified ? "Verified" : "Pending"].map(csvCell).join(",") + "\n";
    });
    
    leads?.forEach((l) => {
      csv += ["Lead", l.id, l.name, l.locality, l.budget, l.status].map(csvCell).join(",") + "\n";
    });
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nagpur-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight mb-1" data-testid="text-dashboard-title">
            Overview
          </h1>
          <p className="text-muted-foreground font-medium">
            Manage your real estate empire in Nagpur.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold gap-2" data-testid="button-export" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-none shadow-md">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <StatCard 
              title="Active Properties" 
              value={propertyCount.toString()}
              trend="up"
              trendValue="+12.5%"
              icon={Building}
              data-testid="stat-properties"
            />
            <StatCard 
              title="New Leads" 
              value={newLeadsCount.toString()}
              trend="up"
              trendValue="+4.2%"
              icon={Users}
              data-testid="stat-leads"
            />
            <StatCard 
              title="High Intent Leads" 
              value={highIntentLeads.toString()}
              trend="up"
              trendValue="+18.4%"
              icon={TrendingUp}
              data-testid="stat-high-intent"
            />
            <StatCard 
              title="Pending Verification" 
              value={(properties?.filter(p => !p.isVerified).length || 0).toString()}
              trend="neutral"
              trendValue="Needs Review"
              icon={AlertTriangle}
              data-testid="stat-pending"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 rounded-3xl border-none shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <CardTitle className="text-xl">Price Trends (PSF)</CardTitle>
                <CardDescription className="font-medium mt-1">Average market performance in Nagpur</CardDescription>
              </div>
              <Badge variant="secondary" className="rounded-lg py-1 px-3 font-bold text-xs bg-primary/10 text-primary border-none">
                +18.4% YTD
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-8">
            <div className="h-[350px] w-full pr-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PRICE_TRENDS} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11} 
                    fontWeight={600}
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11} 
                    fontWeight={600}
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}`} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                      border: 'none',
                      padding: '12px 16px'
                    }}
                    itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 700 }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))', fontWeight: 600, marginBottom: '4px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 rounded-3xl border-none shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm">
          <CardHeader className="p-8">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <CardTitle className="text-xl">Latest Leads</CardTitle>
                <CardDescription className="font-medium mt-1">Recently active inquiries</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="font-bold text-primary hover:bg-primary/5 rounded-lg h-8" data-testid="button-view-all-leads">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            {leadsLoading ? (
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-2xl" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : leads && leads.length > 0 ? (
              <div className="space-y-6">
                {leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex items-center group cursor-pointer" data-testid={`lead-item-${lead.id}`}>
                    <div className="relative">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {lead.name.charAt(0)}
                      </div>
                      {(lead.intentScore || 0) >= 80 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent border-4 border-card" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="text-sm font-bold leading-none">{lead.name}</p>
                        <span className="text-[10px] font-bold text-muted-foreground opacity-60 uppercase tracking-widest">{lead.status}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium mt-1">
                        {lead.locality || "No locality"} {lead.budget && `• ${lead.budget}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No leads yet</p>
                <Button variant="outline" className="mt-4" data-testid="button-seed-data">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Seed Sample Data
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card data-testid="card-site-actions">
        <CardHeader>
          <CardTitle>Website Actions (last 30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          {eventStats && Object.keys(eventStats.eventCounts).length > 0 ? (
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {Object.entries(eventStats.eventCounts).map(([name, count]) => (
                <div key={name}>
                  <dt className="text-muted-foreground">{name.replace(/_/g, " ")}</dt>
                  <dd className="text-xl font-semibold">{count}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm text-muted-foreground">No actions recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
