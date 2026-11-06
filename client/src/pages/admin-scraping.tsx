import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Play, 
  RotateCw, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Database,
  Terminal,
  Settings,
  Plus,
  Globe,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ScrapingSource, ScrapingJob } from "@shared/schema";

export default function AdminScraping() {
  const [activeTab, setActiveTab] = useState<'sources' | 'jobs' | 'logs'>('sources');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSource, setNewSource] = useState({
    name: "",
    type: "",
    url: "",
    isActive: true,
  });
  const { toast } = useToast();

  const { data: sources, isLoading: sourcesLoading } = useQuery<ScrapingSource[]>({
    queryKey: ['/api/scraping/sources'],
  });

  const { data: jobs, isLoading: jobsLoading } = useQuery<ScrapingJob[]>({
    queryKey: ['/api/scraping/jobs'],
  });

  const [runningJobSourceId, setRunningJobSourceId] = useState<number | null>(null);

  const runJobMutation = useMutation({
    mutationFn: async (sourceId: number) => {
      setRunningJobSourceId(sourceId);
      return apiRequest('POST', '/api/scraping/jobs', { sourceId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/scraping/jobs'] });
      toast({
        title: "Job Started",
        description: "Scraping job has been queued and will start shortly.",
      });
      setActiveTab('jobs');
      setRunningJobSourceId(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Start Job",
        description: error.message || "An error occurred while starting the scraping job.",
        variant: "destructive",
      });
      setRunningJobSourceId(null);
    },
  });

  const toggleSourceMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      return apiRequest('PATCH', `/api/scraping/sources/${id}`, { isActive });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/scraping/sources'] });
      toast({
        title: variables.isActive ? "Source Enabled" : "Source Disabled",
        description: `The scraping source has been ${variables.isActive ? 'enabled' : 'disabled'}.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Update Source",
        description: error.message || "An error occurred while updating the source status.",
        variant: "destructive",
      });
    },
  });

  const addSourceMutation = useMutation({
    mutationFn: async (data: { name: string; type: string; url: string; isActive: boolean }) => {
      return apiRequest('POST', '/api/scraping/sources', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/scraping/sources'] });
      toast({
        title: "Source Added",
        description: "New scraping source has been created successfully.",
      });
      setDialogOpen(false);
      setNewSource({ name: "", type: "", url: "", isActive: true });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Add Source",
        description: error.message || "An error occurred while creating the source.",
        variant: "destructive",
      });
    },
  });

  const handleAddSource = () => {
    if (!newSource.name || !newSource.type || !newSource.url) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    addSourceMutation.mutate(newSource);
  };

  const isLoading = sourcesLoading || jobsLoading;

  const totalItems = sources?.reduce((acc, s) => acc + (s.config as any)?.itemsFetched || 0, 0) || 0;
  const activeJobs = jobs?.filter(j => j.status === 'running').length || 0;
  const failedJobs = jobs?.filter(j => j.status === 'failed').length || 0;

  const mockLogs = [
    { id: 1, timestamp: "10:00:01", level: "info", message: "Starting 99acres crawler..." },
    { id: 2, timestamp: "10:00:02", level: "debug", message: "Fetching page 1 of listings" },
    { id: 3, timestamp: "10:00:05", level: "info", message: "Found 45 new properties" },
    { id: 4, timestamp: "10:00:08", level: "debug", message: "Processing property details..." },
    { id: 5, timestamp: "10:00:12", level: "info", message: "Saved 45 properties to database" },
    { id: 6, timestamp: "10:00:15", level: "info", message: "Crawler completed successfully" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-1">Scraper Engine</h1>
          <p className="text-muted-foreground font-medium mt-1">
            Manage data sources, crawling schedules, and pipelines.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold gap-2" data-testid="button-global-config">
            <Settings className="h-4 w-4" />
            Global Config
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl font-bold gap-2 shadow-lg shadow-primary/20" data-testid="button-add-source">
                <Plus className="h-4 w-4" />
                Add New Source
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Scraping Source</DialogTitle>
                <DialogDescription>
                  Configure a new data source to scrape property listings from.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter source name"
                    value={newSource.name}
                    onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                    data-testid="input-source-name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newSource.type}
                    onValueChange={(value) => setNewSource({ ...newSource, type: value })}
                  >
                    <SelectTrigger data-testid="select-source-type">
                      <SelectValue placeholder="Select source type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="99acres">99acres</SelectItem>
                      <SelectItem value="magicbricks">MagicBricks</SelectItem>
                      <SelectItem value="housing">Housing.com</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com/listings"
                    value={newSource.url}
                    onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                    data-testid="input-source-url"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    checked={newSource.isActive}
                    onCheckedChange={(checked) => setNewSource({ ...newSource, isActive: checked === true })}
                    data-testid="checkbox-source-active"
                  />
                  <Label htmlFor="isActive" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enable source immediately
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  data-testid="button-cancel-add-source"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleAddSource}
                  disabled={addSourceMutation.isPending}
                  data-testid="button-submit-add-source"
                >
                  {addSourceMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Source"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="rounded-2xl border-none shadow-lg bg-card">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Sources</p>
                  <h3 className="text-2xl font-black" data-testid="stat-total-sources">{sources?.length || 0}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-none shadow-lg bg-card">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <Play className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Active Jobs</p>
                  <h3 className="text-2xl font-black" data-testid="stat-active-jobs">{activeJobs}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-none shadow-lg bg-card">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Jobs</p>
                  <h3 className="text-xl font-black" data-testid="stat-total-jobs">{jobs?.length || 0}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-none shadow-lg bg-card">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Failed Jobs</p>
                  <h3 className="text-2xl font-black" data-testid="stat-failed-jobs">{failedJobs}</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-8">
            <div className="flex-1 space-y-6">
              <div className="flex p-1 bg-muted/50 rounded-xl w-fit">
                <button 
                  onClick={() => setActiveTab('sources')}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                    activeTab === 'sources' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid="tab-sources"
                >
                  Data Sources
                </button>
                <button 
                  onClick={() => setActiveTab('jobs')}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                    activeTab === 'jobs' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid="tab-jobs"
                >
                  Job History
                </button>
                <button 
                  onClick={() => setActiveTab('logs')}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                    activeTab === 'logs' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid="tab-logs"
                >
                  Live Logs
                </button>
              </div>

              {activeTab === 'sources' && (
                <div className="grid gap-6">
                  {sources?.map((source) => (
                    <Card 
                      key={source.id} 
                      className="rounded-2xl border-none shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
                      data-testid={`source-card-${source.id}`}
                    >
                      <div className="flex items-center p-6 gap-6">
                        <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                          <Globe className="h-8 w-8 text-slate-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-black">{source.name}</h3>
                            <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">
                              {source.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" /> 
                              Last run: {source.lastScrapedAt ? new Date(source.lastScrapedAt).toLocaleDateString() : 'Never'}
                            </span>
                            <span className="truncate max-w-xs text-xs">
                              {source.url}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 mr-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                              {source.isActive ? 'Enabled' : 'Disabled'}
                            </span>
                            <Switch 
                              checked={source.isActive || false} 
                              onCheckedChange={(checked) => toggleSourceMutation.mutate({ id: source.id, isActive: checked })}
                              disabled={toggleSourceMutation.isPending}
                              data-testid={`switch-source-${source.id}`}
                            />
                          </div>
                          <Button 
                            size="sm"
                            disabled={!source.isActive || runJobMutation.isPending}
                            onClick={() => runJobMutation.mutate(source.id)}
                            className="rounded-xl font-bold"
                            data-testid={`button-run-${source.id}`}
                          >
                            {runningJobSourceId === source.id && runJobMutation.isPending ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                                Running...
                              </>
                            ) : (
                              <>
                                <Play className="h-3.5 w-3.5 mr-2" />
                                Run Now
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      {source.isActive && source.config ? (
                        <div className="bg-muted/50 px-6 py-3 border-t flex items-center justify-between text-xs font-medium text-muted-foreground">
                          <code className="truncate max-w-2xl">
                            {"Config: " + JSON.stringify(source.config).slice(0, 100) + "..."}
                          </code>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Edit Configuration
                          </Button>
                        </div>
                      ) : null}
                    </Card>
                  ))}
                  {(!sources || sources.length === 0) && (
                    <Card className="rounded-2xl border-none shadow-md p-12 text-center">
                      <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                      <p className="text-muted-foreground">No scraping sources configured yet</p>
                      <Button className="mt-4" onClick={() => setDialogOpen(true)}>Add First Source</Button>
                    </Card>
                  )}
                </div>
              )}

              {activeTab === 'jobs' && (
                <Card className="rounded-2xl border-none shadow-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="font-bold pl-8">Job ID</TableHead>
                        <TableHead className="font-bold">Source</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="font-bold">Started</TableHead>
                        <TableHead className="font-bold">Items</TableHead>
                        <TableHead className="font-bold text-right pr-8">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs?.map((job) => (
                        <TableRow key={job.id} className="hover:bg-muted/30 transition-colors" data-testid={`job-row-${job.id}`}>
                          <TableCell className="font-mono font-medium pl-8">job_{job.id}</TableCell>
                          <TableCell className="font-bold">Source #{job.sourceId}</TableCell>
                          <TableCell>
                            <Badge 
                              className={cn(
                                "font-bold uppercase tracking-widest text-[10px] border-none px-2 py-0.5",
                                job.status === 'completed' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                job.status === 'failed' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse"
                              )}
                            >
                              {job.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium text-muted-foreground">
                            {job.startedAt ? new Date(job.startedAt).toLocaleString() : '-'}
                          </TableCell>
                          <TableCell className="font-medium">
                            {job.propertiesImported && job.propertiesImported > 0 ? (
                              <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                {job.propertiesImported}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right pr-8">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                              <RotateCw className="h-3.5 w-3.5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!jobs || jobs.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No jobs have been run yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>
              )}

              {activeTab === 'logs' && (
                <Card className="rounded-2xl border-none shadow-lg bg-slate-950 text-slate-400 font-mono text-sm overflow-hidden h-[500px] flex flex-col">
                  <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-green-500" />
                      <span className="font-bold text-slate-300">System Logs</span>
                    </div>
                    <Badge variant="outline" className="border-slate-700 text-slate-500 text-[10px]">Live Stream</Badge>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-3">
                    {mockLogs.map((log) => (
                      <div key={log.id} className="flex gap-4 group hover:bg-white/5 p-1 rounded -mx-1">
                        <span className="text-slate-600 shrink-0 select-none w-20">{log.timestamp}</span>
                        <span className={cn(
                          "font-bold text-[10px] uppercase tracking-wider shrink-0 w-16 pt-0.5",
                          log.level === 'info' ? "text-blue-500" :
                          log.level === 'debug' ? "text-slate-500" :
                          "text-red-500"
                        )}>
                          {log.level}
                        </span>
                        <span className="text-slate-300 group-hover:text-white transition-colors">{log.message}</span>
                      </div>
                    ))}
                    <div className="flex gap-4 p-1">
                      <span className="text-slate-600 shrink-0 w-20">10:00:15</span>
                      <span className="text-green-500 font-bold text-[10px] uppercase tracking-wider shrink-0 w-16 pt-0.5">INFO</span>
                      <span className="text-white animate-pulse">Waiting for next scheduled run...</span>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <div className="w-80 hidden xl:block space-y-6">
              <Card className="rounded-2xl border-none shadow-lg bg-blue-600 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                <CardContent className="p-8 relative z-10">
                  <h3 className="text-xl font-black mb-2">Legal Compliance</h3>
                  <p className="text-blue-100 text-sm mb-6 leading-relaxed opacity-90">
                    All scrapers are configured to respect robots.txt and use rate limiting.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm font-bold bg-blue-500/50 p-3 rounded-xl border border-blue-400/30">
                      <CheckCircle2 className="h-4 w-4 text-blue-200" />
                      <span>Rate Limiting Active</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold bg-blue-500/50 p-3 rounded-xl border border-blue-400/30">
                      <CheckCircle2 className="h-4 w-4 text-blue-200" />
                      <span>No Login Access</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-none shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-xl">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Active Sources</p>
                    <p className="text-sm font-bold">{sources?.filter(s => s.isActive).length || 0} of {sources?.length || 0}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-xl">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Success Rate</p>
                    <p className="text-sm font-bold">
                      {jobs && jobs.length > 0 
                        ? Math.round((jobs.filter(j => j.status === 'completed').length / jobs.length) * 100) 
                        : 0}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
