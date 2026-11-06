import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Globe, 
  TrendingUp, 
  TrendingDown,
  Newspaper, 
  ExternalLink,
  AlertTriangle,
  Eye,
  EyeOff,
  BarChart3,
  Play,
  Plus,
  RefreshCw,
  MessageSquare,
  Briefcase,
  Building,
  Scale,
  Activity,
  Trash2,
  Clock,
  Calendar,
  Power,
  Zap,
  Settings
} from "lucide-react";
import type { 
  IntelligenceSource, 
  NewsArticle, 
  SocialPost, 
  JobListing,
  InfrastructureProject,
  LegalDispute,
  MarketIntelligence,
  SentimentSnapshot,
  IntelligenceScheduleSettings
} from "@shared/schema";

interface IntelligenceDashboard {
  stats: {
    sourcesCount: number;
    activeSources: number;
    newsCount: number;
    socialCount: number;
    jobsCount: number;
    infrastructureCount: number;
    legalCount: number;
    marketReportsCount: number;
  };
  recentNews: NewsArticle[];
  recentSocial: SocialPost[];
  topJobs: JobListing[];
  infrastructure: InfrastructureProject[];
  legalAlerts: LegalDispute[];
  latestMarket: MarketIntelligence | null;
  latestSentiment: SentimentSnapshot | null;
}

export default function WebIntelligence() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sourceToDelete, setSourceToDelete] = useState<IntelligenceSource | null>(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [newSource, setNewSource] = useState({
    name: "",
    type: "news",
    category: "direct_scrape",
    url: "",
  });

  const { data: dashboard, isLoading: dashboardLoading } = useQuery<IntelligenceDashboard>({
    queryKey: ['/api/intelligence/dashboard'],
  });

  const { data: sources, isLoading: sourcesLoading } = useQuery<IntelligenceSource[]>({
    queryKey: ['/api/intelligence/sources'],
  });

  const { data: newsArticles } = useQuery<NewsArticle[]>({
    queryKey: ['/api/intelligence/news'],
  });

  const { data: socialPosts } = useQuery<SocialPost[]>({
    queryKey: ['/api/intelligence/social'],
  });

  const { data: jobListings } = useQuery<JobListing[]>({
    queryKey: ['/api/intelligence/jobs'],
  });

  const { data: infrastructure } = useQuery<InfrastructureProject[]>({
    queryKey: ['/api/intelligence/infrastructure'],
  });

  const { data: legalDisputes } = useQuery<LegalDispute[]>({
    queryKey: ['/api/intelligence/legal'],
  });

  const { data: scheduleSettings } = useQuery<IntelligenceScheduleSettings>({
    queryKey: ['/api/intelligence/schedule'],
  });

  const collectAllMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/intelligence/collect-all', {});
      return res.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['/api/intelligence'] });
      toast({ 
        title: "Collection complete", 
        description: data.message || `Collected ${data.totalItemsCollected} items from all sources`
      });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to run collection", variant: "destructive" });
    }
  });

  const updateScheduleMutation = useMutation({
    mutationFn: async (data: Partial<IntelligenceScheduleSettings>) => {
      return apiRequest('PATCH', '/api/intelligence/schedule', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/intelligence/schedule'] });
      toast({ title: "Schedule updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update schedule", variant: "destructive" });
    }
  });

  const createSourceMutation = useMutation({
    mutationFn: async (data: typeof newSource) => {
      return apiRequest('POST', '/api/intelligence/sources', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/intelligence/sources'] });
      queryClient.invalidateQueries({ queryKey: ['/api/intelligence/dashboard'] });
      setIsAddSourceOpen(false);
      setNewSource({ name: "", type: "news", category: "direct_scrape", url: "" });
      toast({ title: "Source added", description: "Intelligence source created successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create source", variant: "destructive" });
    }
  });

  const runCollectorMutation = useMutation({
    mutationFn: async (sourceId: number) => {
      const res = await apiRequest('POST', '/api/intelligence/collect', { sourceId });
      return res.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['/api/intelligence'] });
      toast({ 
        title: "Collection complete", 
        description: `Collected ${data.itemsCollected} items` 
      });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to run collector", variant: "destructive" });
    }
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ type, id, isVisible }: { type: string; id: number; isVisible: boolean }) => {
      return apiRequest('PATCH', `/api/intelligence/${type}/${id}`, { isVisible });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/intelligence'] });
      toast({ title: "Visibility updated" });
    }
  });

  const deleteSourceMutation = useMutation({
    mutationFn: async ({ id, password }: { id: number; password: string }) => {
      return apiRequest('DELETE', `/api/intelligence/sources/${id}`, { adminPassword: password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/intelligence/sources'] });
      queryClient.invalidateQueries({ queryKey: ['/api/intelligence/dashboard'] });
      toast({ title: "Source deleted" });
      setIsDeleteDialogOpen(false);
      setSourceToDelete(null);
      setAdminPassword("");
      setDeleteError("");
    },
    onError: (error: any) => {
      setDeleteError(error?.message || "Invalid admin password. Please try again.");
    }
  });

  const handleDeleteClick = (source: IntelligenceSource) => {
    setSourceToDelete(source);
    setIsDeleteDialogOpen(true);
    setAdminPassword("");
    setDeleteError("");
  };

  const confirmDelete = () => {
    if (!sourceToDelete || !adminPassword) {
      setDeleteError("Please enter your admin password");
      return;
    }
    deleteSourceMutation.mutate({ id: sourceToDelete.id, password: adminPassword });
  };

  const isLoading = dashboardLoading || sourcesLoading;

  const getSentimentColor = (sentiment: string | null) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
      case 'bullish':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'negative':
      case 'bearish':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-1">Web Intelligence</h1>
          <p className="text-muted-foreground font-medium mt-1">
            Real-time market data, news, social sentiment, and job market analysis for Nagpur.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button 
            variant="default" 
            className="rounded-xl font-bold gap-2 bg-green-600 hover:bg-green-700"
            onClick={() => collectAllMutation.mutate()}
            disabled={collectAllMutation.isPending}
            data-testid="button-collect-all"
          >
            {collectAllMutation.isPending ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            {collectAllMutation.isPending ? "Collecting..." : "Collect Now"}
          </Button>
          <Button variant="outline" className="rounded-xl font-bold gap-2" data-testid="button-export-report">
            <BarChart3 className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="rounded-2xl border-none shadow-lg">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sources</p>
                  <h3 className="text-2xl font-black">{dashboard?.stats.sourcesCount || 0}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-none shadow-lg">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                  <Newspaper className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">News</p>
                  <h3 className="text-2xl font-black">{dashboard?.stats.newsCount || 0}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-none shadow-lg">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Social</p>
                  <h3 className="text-2xl font-black">{dashboard?.stats.socialCount || 0}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-none shadow-lg">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Jobs</p>
                  <h3 className="text-2xl font-black">{dashboard?.stats.jobsCount || 0}</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-muted/50 p-1 rounded-xl flex-wrap">
              <TabsTrigger value="overview" className="rounded-lg font-bold" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule" className="rounded-lg font-bold" data-testid="tab-schedule">Schedule</TabsTrigger>
              <TabsTrigger value="sources" className="rounded-lg font-bold" data-testid="tab-sources">Sources</TabsTrigger>
              <TabsTrigger value="news" className="rounded-lg font-bold" data-testid="tab-news">News</TabsTrigger>
              <TabsTrigger value="social" className="rounded-lg font-bold" data-testid="tab-social">Social</TabsTrigger>
              <TabsTrigger value="jobs" className="rounded-lg font-bold" data-testid="tab-jobs">Jobs</TabsTrigger>
              <TabsTrigger value="infrastructure" className="rounded-lg font-bold" data-testid="tab-infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="legal" className="rounded-lg font-bold" data-testid="tab-legal">Legal</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-2xl border-none shadow-xl">
                  <CardHeader className="p-6 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Newspaper className="h-5 w-5 text-green-500" />
                      Recent News
                    </CardTitle>
                    <CardDescription>Latest news affecting Nagpur real estate</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-3">
                    {dashboard?.recentNews?.slice(0, 5).map((article) => (
                      <div 
                        key={article.id}
                        className="flex items-start justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        data-testid={`news-item-${article.id}`}
                      >
                        <div className="flex-1 min-w-0 mr-3">
                          <div className="font-semibold text-sm line-clamp-1">{article.title}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                            <span>{article.source}</span>
                            {article.locality && <Badge variant="secondary" className="text-[10px]">{article.locality}</Badge>}
                          </div>
                        </div>
                        <Badge className={`shrink-0 ${getSentimentColor(article.sentiment)}`}>
                          {article.sentiment || 'Neutral'}
                        </Badge>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-muted-foreground">
                        <Newspaper className="h-10 w-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No news articles yet. Add a news source to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-xl">
                  <CardHeader className="p-6 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-purple-500" />
                      Social Sentiment
                    </CardTitle>
                    <CardDescription>What people are saying about Nagpur properties</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-3">
                    {dashboard?.recentSocial?.slice(0, 5).map((post) => (
                      <div 
                        key={post.id}
                        className="flex items-start justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        data-testid={`social-item-${post.id}`}
                      >
                        <div className="flex-1 min-w-0 mr-3">
                          <div className="text-sm line-clamp-2">{post.content}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                            <span>{post.platform}</span>
                            <span>{post.author}</span>
                          </div>
                        </div>
                        <Badge className={`shrink-0 ${getSentimentColor(post.sentiment)}`}>
                          {post.sentiment || 'Neutral'}
                        </Badge>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No social posts yet. Add a social source to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-2xl border-none shadow-xl">
                  <CardHeader className="p-6 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-amber-500" />
                      Top Job Openings
                    </CardTitle>
                    <CardDescription>Employment trends affecting property demand</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-3">
                    {dashboard?.topJobs?.slice(0, 5).map((job) => (
                      <div 
                        key={job.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        data-testid={`job-item-${job.id}`}
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{job.jobTitle}</div>
                          <div className="text-xs text-muted-foreground">{job.companyName} - {job.locality}</div>
                        </div>
                        <Badge variant="secondary">{job.numberOfOpenings} openings</Badge>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-muted-foreground">
                        <Briefcase className="h-10 w-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No job listings yet. Add a job source to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-xl">
                  <CardHeader className="p-6 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5 text-blue-500" />
                      Infrastructure Updates
                    </CardTitle>
                    <CardDescription>Projects impacting property values</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-3">
                    {dashboard?.infrastructure?.slice(0, 5).map((project) => (
                      <div 
                        key={project.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        data-testid={`infra-item-${project.id}`}
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{project.projectName}</div>
                          <div className="text-xs text-muted-foreground">{project.projectType} - {project.currentStatus || 0}% complete</div>
                        </div>
                        {project.currentStatus != null && (
                          <Badge variant="secondary">{project.currentStatus}%</Badge>
                        )}
                      </div>
                    )) || (
                      <div className="text-center py-8 text-muted-foreground">
                        <Building className="h-10 w-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No infrastructure projects yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {dashboard?.legalAlerts && dashboard.legalAlerts.length > 0 && (
                <Card className="rounded-2xl border-none shadow-xl border-l-4 border-l-amber-500">
                  <CardHeader className="p-6 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      Legal Alerts
                    </CardTitle>
                    <CardDescription>Active disputes and legal issues in localities</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-3">
                    {dashboard.legalAlerts.map((dispute) => (
                      <div 
                        key={dispute.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20"
                        data-testid={`legal-alert-${dispute.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <Scale className="h-4 w-4 text-amber-600" />
                          <div>
                            <div className="font-semibold text-sm">{dispute.disputeType}</div>
                            <div className="text-xs text-muted-foreground">{dispute.locality} - Case #{dispute.caseNumber || 'N/A'}</div>
                          </div>
                        </div>
                        <Badge variant="secondary">{dispute.currentStatus}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-2xl border-none shadow-xl">
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Power className="h-5 w-5 text-green-500" />
                          Automatic Scraping
                        </CardTitle>
                        <CardDescription>Enable or disable all scheduled data collection</CardDescription>
                      </div>
                      <Switch
                        checked={scheduleSettings?.autoScrapingEnabled ?? true}
                        onCheckedChange={(checked) => 
                          updateScheduleMutation.mutate({ autoScrapingEnabled: checked })
                        }
                        data-testid="switch-auto-scraping"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className={`p-4 rounded-xl ${scheduleSettings?.autoScrapingEnabled ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-900/20'}`}>
                      <div className="flex items-center gap-3">
                        {scheduleSettings?.autoScrapingEnabled ? (
                          <Activity className="h-5 w-5 text-green-600" />
                        ) : (
                          <Power className="h-5 w-5 text-gray-400" />
                        )}
                        <div>
                          <p className="font-semibold">
                            {scheduleSettings?.autoScrapingEnabled ? 'Auto-scraping is ON' : 'Auto-scraping is OFF'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {scheduleSettings?.autoScrapingEnabled 
                              ? 'Data will be collected automatically according to the schedule below'
                              : 'Use the "Collect Now" button to manually collect data'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-xl">
                  <CardHeader className="p-6 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-500" />
                      Manual Collection
                    </CardTitle>
                    <CardDescription>Run data collection on demand</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Button 
                      size="lg"
                      className="w-full rounded-xl font-bold gap-2 bg-green-600 hover:bg-green-700 h-14"
                      onClick={() => collectAllMutation.mutate()}
                      disabled={collectAllMutation.isPending}
                      data-testid="button-collect-now-large"
                    >
                      {collectAllMutation.isPending ? (
                        <RefreshCw className="h-5 w-5 animate-spin" />
                      ) : (
                        <Zap className="h-5 w-5" />
                      )}
                      {collectAllMutation.isPending ? "Collecting from all sources..." : "Collect Now (One-time)"}
                    </Button>
                    <p className="text-sm text-muted-foreground text-center mt-3">
                      Runs collection from all active sources immediately
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-2xl border-none shadow-xl">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Daily Schedule
                  </CardTitle>
                  <CardDescription>Configure automatic daily data collection times (click time to edit)</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <Newspaper className="h-4 w-4 text-green-600" />
                      <Input
                        type="time"
                        value={scheduleSettings?.dailyNewsTime || '02:00'}
                        onChange={(e) => updateScheduleMutation.mutate({ dailyNewsTime: e.target.value })}
                        className="w-24 h-8 text-sm font-semibold"
                        data-testid="input-daily-news-time"
                      />
                      <span className="flex-1">News scraped & analyzed</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                      <div className="h-2 w-2 rounded-full bg-purple-500" />
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                      <Input
                        type="time"
                        value={scheduleSettings?.dailySocialTime || '03:00'}
                        onChange={(e) => updateScheduleMutation.mutate({ dailySocialTime: e.target.value })}
                        className="w-24 h-8 text-sm font-semibold"
                        data-testid="input-daily-social-time"
                      />
                      <span className="flex-1">Social sentiment updated</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      <Briefcase className="h-4 w-4 text-amber-600" />
                      <Input
                        type="time"
                        value={scheduleSettings?.dailyJobsTime || '04:00'}
                        onChange={(e) => updateScheduleMutation.mutate({ dailyJobsTime: e.target.value })}
                        className="w-24 h-8 text-sm font-semibold"
                        data-testid="input-daily-jobs-time"
                      />
                      <span className="flex-1">Job market data refreshed</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <Building className="h-4 w-4 text-blue-600" />
                      <Input
                        type="time"
                        value={scheduleSettings?.dailyInfraTime || '05:00'}
                        onChange={(e) => updateScheduleMutation.mutate({ dailyInfraTime: e.target.value })}
                        className="w-24 h-8 text-sm font-semibold"
                        data-testid="input-daily-infra-time"
                      />
                      <span className="flex-1">Infrastructure status checked</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                      <div className="h-2 w-2 rounded-full bg-indigo-500" />
                      <BarChart3 className="h-4 w-4 text-indigo-600" />
                      <Input
                        type="time"
                        value={scheduleSettings?.dailyMarketTime || '06:00'}
                        onChange={(e) => updateScheduleMutation.mutate({ dailyMarketTime: e.target.value })}
                        className="w-24 h-8 text-sm font-semibold"
                        data-testid="input-daily-market-time"
                      />
                      <span className="flex-1">Market intelligence generated</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                      <div className="h-2 w-2 rounded-full bg-teal-500" />
                      <RefreshCw className="h-4 w-4 text-teal-600" />
                      <Input
                        type="time"
                        value={scheduleSettings?.dailySyncTime || '07:00'}
                        onChange={(e) => updateScheduleMutation.mutate({ dailySyncTime: e.target.value })}
                        className="w-24 h-8 text-sm font-semibold"
                        data-testid="input-daily-sync-time"
                      />
                      <span className="flex-1">Frontend data synced & live</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="rounded-2xl border-none shadow-xl">
                  <CardHeader className="p-6 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      Weekly Schedule
                    </CardTitle>
                    <CardDescription>Comprehensive analysis every {scheduleSettings?.weeklyAnalysisDay || 'Sunday'}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 p-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                        <span>Comprehensive sentiment analysis</span>
                      </div>
                      <div className="flex items-center gap-2 p-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                        <span>Market trend reports</span>
                      </div>
                      <div className="flex items-center gap-2 p-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                        <span>Infrastructure project status reviews</span>
                      </div>
                      <div className="flex items-center gap-2 p-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                        <span>Buying clarity scores updated</span>
                      </div>
                    </div>
                    {scheduleSettings?.lastWeeklyRun && (
                      <p className="text-xs text-muted-foreground mt-4">
                        Last run: {new Date(scheduleSettings.lastWeeklyRun).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-xl">
                  <CardHeader className="p-6 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      Monthly Schedule
                    </CardTitle>
                    <CardDescription>Deep analysis on the {scheduleSettings?.monthlyReportDay || 1}st of each month</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 p-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        <span>Legal dispute status check</span>
                      </div>
                      <div className="flex items-center gap-2 p-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        <span>Market forecast for next month</span>
                      </div>
                      <div className="flex items-center gap-2 p-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        <span>Competitive analysis update</span>
                      </div>
                      <div className="flex items-center gap-2 p-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        <span>New data source integration (if any)</span>
                      </div>
                    </div>
                    {scheduleSettings?.lastMonthlyRun && (
                      <p className="text-xs text-muted-foreground mt-4">
                        Last run: {new Date(scheduleSettings.lastMonthlyRun).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sources" className="space-y-6">
              <Card className="rounded-2xl border-none shadow-xl">
                <CardHeader className="p-6 pb-4 flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Intelligence Sources</CardTitle>
                    <CardDescription>Manage data sources for market intelligence</CardDescription>
                  </div>
                  <Dialog open={isAddSourceOpen} onOpenChange={setIsAddSourceOpen}>
                    <DialogTrigger asChild>
                      <Button variant="default" className="rounded-xl font-bold gap-2" data-testid="button-add-source">
                        <Plus className="h-4 w-4" />
                        Add Source
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Intelligence Source</DialogTitle>
                        <DialogDescription>Configure a new data source for intelligence collection</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Source Name</Label>
                          <Input
                            placeholder="e.g., Nagpur News Network"
                            value={newSource.name}
                            onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                            data-testid="input-source-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <Select value={newSource.type} onValueChange={(v) => setNewSource({ ...newSource, type: v })}>
                            <SelectTrigger data-testid="select-source-type">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="news">News</SelectItem>
                              <SelectItem value="social">Social Media</SelectItem>
                              <SelectItem value="jobs">Job Listings</SelectItem>
                              <SelectItem value="infrastructure">Infrastructure</SelectItem>
                              <SelectItem value="legal">Legal Records</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Collection Method</Label>
                          <Select value={newSource.category} onValueChange={(v) => setNewSource({ ...newSource, category: v })}>
                            <SelectTrigger data-testid="select-source-category">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="direct_scrape">Direct Scraping</SelectItem>
                              <SelectItem value="apify">Apify Integration</SelectItem>
                              <SelectItem value="rss">RSS Feed</SelectItem>
                              <SelectItem value="api">API Integration</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>URL (optional)</Label>
                          <Input
                            placeholder="https://..."
                            value={newSource.url}
                            onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                            data-testid="input-source-url"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddSourceOpen(false)}>Cancel</Button>
                        <Button 
                          onClick={() => createSourceMutation.mutate(newSource)}
                          disabled={!newSource.name || createSourceMutation.isPending}
                          data-testid="button-create-source"
                        >
                          {createSourceMutation.isPending ? "Creating..." : "Create Source"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {sources && sources.length > 0 ? (
                    <div className="space-y-3">
                      {sources.map((source) => (
                        <div 
                          key={source.id}
                          className="flex items-center justify-between p-4 rounded-xl border bg-card"
                          data-testid={`source-item-${source.id}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                              source.type === 'news' ? 'bg-green-100 text-green-600' :
                              source.type === 'social' ? 'bg-purple-100 text-purple-600' :
                              source.type === 'jobs' ? 'bg-amber-100 text-amber-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {source.type === 'news' && <Newspaper className="h-5 w-5" />}
                              {source.type === 'social' && <MessageSquare className="h-5 w-5" />}
                              {source.type === 'jobs' && <Briefcase className="h-5 w-5" />}
                              {source.type === 'infrastructure' && <Building className="h-5 w-5" />}
                              {source.type === 'legal' && <Scale className="h-5 w-5" />}
                            </div>
                            <div>
                              <div className="font-bold">{source.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px]">{source.type}</Badge>
                                <Badge variant="outline" className="text-[10px]">{source.category}</Badge>
                                {source.itemsScraped && <span>{source.itemsScraped} items collected</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={source.isActive ? "default" : "secondary"}>
                              {source.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => runCollectorMutation.mutate(source.id)}
                              disabled={runCollectorMutation.isPending}
                              data-testid={`button-run-source-${source.id}`}
                            >
                              {runCollectorMutation.isPending ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(source)}
                              data-testid={`button-delete-source-${source.id}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Globe className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p className="font-medium">No intelligence sources configured</p>
                      <p className="text-sm mt-1">Add your first source to start collecting market data</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="space-y-6">
              <Card className="rounded-2xl border-none shadow-xl">
                <CardHeader className="p-6 pb-4 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">News Articles</CardTitle>
                    <CardDescription>Toggle visibility to control what appears on public pages</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {newsArticles && newsArticles.length > 0 ? (
                    <div className="space-y-3">
                      {newsArticles.map((article) => (
                        <div 
                          key={article.id}
                          className="flex items-center justify-between p-4 rounded-xl border bg-card"
                          data-testid={`news-manage-${article.id}`}
                        >
                          <div className="flex-1 min-w-0 mr-4">
                            <div className="font-semibold line-clamp-1">{article.title}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                              <span>{article.source}</span>
                              <Badge variant="secondary" className="text-[10px]">{article.category}</Badge>
                              {article.locality && <Badge variant="outline" className="text-[10px]">{article.locality}</Badge>}
                              <Badge className={`${getSentimentColor(article.sentiment)} text-[10px]`}>
                                {article.sentiment || 'Neutral'}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {article.isVisible ? (
                                <Eye className="h-4 w-4 text-green-500" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                              <Switch
                                checked={article.isVisible || false}
                                onCheckedChange={(checked) => 
                                  toggleVisibilityMutation.mutate({ type: 'news', id: article.id, isVisible: checked })
                                }
                                data-testid={`switch-news-visibility-${article.id}`}
                              />
                            </div>
                            {article.sourceUrl && (
                              <Button variant="ghost" size="icon" asChild>
                                <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p className="font-medium">No news articles collected</p>
                      <p className="text-sm mt-1">Run a news source collector to fetch articles</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <Card className="rounded-2xl border-none shadow-xl">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-lg">Social Media Posts</CardTitle>
                  <CardDescription>Manage visibility of social sentiment data</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {socialPosts && socialPosts.length > 0 ? (
                    <div className="space-y-3">
                      {socialPosts.map((post) => (
                        <div 
                          key={post.id}
                          className="flex items-center justify-between p-4 rounded-xl border bg-card"
                          data-testid={`social-manage-${post.id}`}
                        >
                          <div className="flex-1 min-w-0 mr-4">
                            <div className="text-sm line-clamp-2">{post.content}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-[10px]">{post.platform}</Badge>
                              <span>{post.author}</span>
                              {post.isViral && <Badge className="bg-orange-100 text-orange-700 text-[10px]">Viral</Badge>}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge className={getSentimentColor(post.sentiment)}>
                              {post.sentiment || 'Neutral'}
                            </Badge>
                            <div className="flex items-center gap-2">
                              {post.isVisible ? (
                                <Eye className="h-4 w-4 text-green-500" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                              <Switch
                                checked={post.isVisible || false}
                                onCheckedChange={(checked) => 
                                  toggleVisibilityMutation.mutate({ type: 'social', id: post.id, isVisible: checked })
                                }
                                data-testid={`switch-social-visibility-${post.id}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p className="font-medium">No social posts collected</p>
                      <p className="text-sm mt-1">Run a social media source to fetch posts</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-6">
              <Card className="rounded-2xl border-none shadow-xl">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-lg">Job Listings</CardTitle>
                  <CardDescription>Employment data indicating economic activity</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {jobListings && jobListings.length > 0 ? (
                    <div className="space-y-3">
                      {jobListings.map((job) => (
                        <div 
                          key={job.id}
                          className="flex items-center justify-between p-4 rounded-xl border bg-card"
                          data-testid={`job-manage-${job.id}`}
                        >
                          <div className="flex-1 min-w-0 mr-4">
                            <div className="font-semibold">{job.jobTitle}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                              <span>{job.companyName}</span>
                              <Badge variant="secondary" className="text-[10px]">{job.jobCategory}</Badge>
                              {job.locality && <Badge variant="outline" className="text-[10px]">{job.locality}</Badge>}
                              <span>{job.numberOfOpenings} openings</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {job.salaryRange && (
                              <span className="text-sm font-medium text-green-600">{job.salaryRange}</span>
                            )}
                            <div className="flex items-center gap-2">
                              {job.isVisible ? (
                                <Eye className="h-4 w-4 text-green-500" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                              <Switch
                                checked={job.isVisible || false}
                                onCheckedChange={(checked) => 
                                  toggleVisibilityMutation.mutate({ type: 'jobs', id: job.id, isVisible: checked })
                                }
                                data-testid={`switch-job-visibility-${job.id}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p className="font-medium">No job listings collected</p>
                      <p className="text-sm mt-1">Run a job source to fetch listings</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="infrastructure" className="space-y-6">
              <Card className="rounded-2xl border-none shadow-xl">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-lg">Infrastructure Projects</CardTitle>
                  <CardDescription>Development projects impacting property values</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {infrastructure && infrastructure.length > 0 ? (
                    <div className="space-y-3">
                      {infrastructure.map((project) => (
                        <div 
                          key={project.id}
                          className="flex items-center justify-between p-4 rounded-xl border bg-card"
                          data-testid={`infra-manage-${project.id}`}
                        >
                          <div className="flex-1 min-w-0 mr-4">
                            <div className="font-semibold">{project.projectName}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-[10px]">{project.projectType}</Badge>
                              <Badge variant="outline" className="text-[10px]">{project.currentStatus || 0}% done</Badge>
                              {project.currentStatus != null && (
                                <span>{project.currentStatus}% complete</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {project.isVisible ? (
                                <Eye className="h-4 w-4 text-green-500" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                              <Switch
                                checked={project.isVisible || false}
                                onCheckedChange={(checked) => 
                                  toggleVisibilityMutation.mutate({ type: 'infrastructure', id: project.id, isVisible: checked })
                                }
                                data-testid={`switch-infra-visibility-${project.id}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Building className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p className="font-medium">No infrastructure projects</p>
                      <p className="text-sm mt-1">Add infrastructure data manually or via scraping</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legal" className="space-y-6">
              <Card className="rounded-2xl border-none shadow-xl">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-lg">Legal Disputes</CardTitle>
                  <CardDescription>Court cases and legal issues affecting properties</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {legalDisputes && legalDisputes.length > 0 ? (
                    <div className="space-y-3">
                      {legalDisputes.map((dispute) => (
                        <div 
                          key={dispute.id}
                          className="flex items-center justify-between p-4 rounded-xl border bg-card"
                          data-testid={`legal-manage-${dispute.id}`}
                        >
                          <div className="flex-1 min-w-0 mr-4">
                            <div className="font-semibold">{dispute.disputeType}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                              <span>Case #{dispute.caseNumber || 'N/A'}</span>
                              {dispute.locality && <Badge variant="outline" className="text-[10px]">{dispute.locality}</Badge>}
                              <Badge variant={dispute.currentStatus === 'Pending' ? 'destructive' : 'secondary'} className="text-[10px]">
                                {dispute.currentStatus}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {dispute.isVisible ? (
                                <Eye className="h-4 w-4 text-green-500" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                              <Switch
                                checked={dispute.isVisible || false}
                                onCheckedChange={(checked) => 
                                  toggleVisibilityMutation.mutate({ type: 'legal', id: dispute.id, isVisible: checked })
                                }
                                data-testid={`switch-legal-visibility-${dispute.id}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Scale className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p className="font-medium">No legal disputes tracked</p>
                      <p className="text-sm mt-1">Add legal data to warn buyers about affected areas</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Delete Source Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Intelligence Source</DialogTitle>
            <DialogDescription>
              You are about to delete "{sourceToDelete?.name}". This action cannot be undone.
              Please enter your admin password to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Admin Password</Label>
              <Input
                id="adminPassword"
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  setDeleteError("");
                }}
                data-testid="input-admin-password"
              />
              {deleteError && (
                <p className="text-sm text-destructive">{deleteError}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSourceToDelete(null);
                setAdminPassword("");
                setDeleteError("");
              }}
              data-testid="button-cancel-delete"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteSourceMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteSourceMutation.isPending ? "Deleting..." : "Delete Source"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
