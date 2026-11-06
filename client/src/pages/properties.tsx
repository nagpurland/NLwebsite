import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Database, 
  Plus, 
  RefreshCcw, 
  ShieldCheck, 
  CheckCircle2,
  ExternalLink,
  LayoutGrid,
  MoreHorizontal,
  Trash2,
  CheckCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Property, ScrapingSource } from "@shared/schema";

export default function PropertyEngine() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    locality: "",
    price: "",
    area: "",
    type: "",
    bhk: "",
    bathrooms: "",
    source: "",
  });

  const { data: properties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"]
  });

  const { data: sources } = useQuery<ScrapingSource[]>({
    queryKey: ["/api/scraping/sources"]
  });

  const addPropertyMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/properties", {
        title: data.title,
        locality: data.locality,
        location: data.locality,
        price: data.price,
        area: data.area,
        type: data.type,
        bhk: data.bhk,
        source: data.source,
        url: "",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      setDialogOpen(false);
      setFormData({ title: "", locality: "", price: "", area: "", type: "", bhk: "", bathrooms: "", source: "" });
      toast({ title: "Property added successfully" });
    },
    onError: (error) => {
      toast({ title: "Failed to add property", description: error.message, variant: "destructive" });
    },
  });

  const syncPortalsMutation = useMutation({
    mutationFn: async (sourceId: number) => {
      const response = await apiRequest("POST", "/api/scraping/jobs", { sourceId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Sync completed" });
    },
    onError: (error) => {
      toast({ title: "Sync failed", description: error.message, variant: "destructive" });
    },
  });

  const verifyPropertyMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("PATCH", `/api/properties/${id}`, { isVerified: true });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Property verified" });
    },
    onError: (error) => {
      toast({ title: "Verification failed", description: error.message, variant: "destructive" });
    },
  });

  const deletePropertyMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Property deleted" });
    },
    onError: (error) => {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    },
  });

  const handleSyncPortals = () => {
    toast({ title: "Syncing properties..." });
    if (sources && sources.length > 0) {
      syncPortalsMutation.mutate(sources[0].id);
    } else {
      toast({ title: "No sources available", variant: "destructive" });
    }
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    addPropertyMutation.mutate(formData);
  };

  const totalProperties = properties?.length || 0;
  const verifiedCount = properties?.filter(p => p.isVerified).length || 0;
  const avgQualityScore = properties?.length 
    ? Math.round(properties.reduce((sum, p) => sum + (10 - (p.riskScore || 50) / 10), 0) / properties.length * 10) / 10
    : 0;

  const getSourceBadgeClass = (source: string) => {
    switch(source.toLowerCase()) {
      case "99acres": return "bg-blue-50 text-blue-700 border-blue-100";
      case "magicbricks": return "bg-orange-50 text-orange-700 border-orange-100";
      case "housing": return "bg-green-50 text-green-700 border-green-100";
      default: return "bg-purple-50 text-purple-700 border-purple-100";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-1" data-testid="text-properties-title">Property Intelligence Engine</h1>
          <p className="text-muted-foreground font-medium italic">Aggregating properties across Nagpur from multiple sources.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Button 
            variant="outline" 
            className="rounded-xl font-bold gap-2" 
            data-testid="button-sync-portals"
            onClick={handleSyncPortals}
            disabled={syncPortalsMutation.isPending}
          >
            <RefreshCcw className={cn("h-4 w-4", syncPortalsMutation.isPending && "animate-spin")} />
            Sync All Portals
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {propertiesLoading ? (
          [1, 2, 3, 4].map(i => (
            <Card key={i} className="border-none shadow-md">
              <CardContent className="p-6">
                <Skeleton className="h-12 w-12 rounded-xl mb-4" />
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-16" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Aggregated</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black" data-testid="text-total-properties">{totalProperties}</p>
                    <span className="text-[10px] font-bold text-green-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <LayoutGrid className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sources</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black">{sources?.length || 0}</p>
                    <span className="text-[10px] font-bold text-green-600">Connected</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Verified</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black" data-testid="text-verified-properties">{verifiedCount}</p>
                    <span className="text-[10px] font-bold text-muted-foreground">of {totalProperties}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Avg Quality</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black">{avgQualityScore}</p>
                    <span className="text-[10px] font-bold text-green-600">/10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
        <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between gap-2 flex-wrap">
          <div>
            <CardTitle>Properties Aggregated</CardTitle>
            <CardDescription>Consolidated listings with deduplication</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="font-bold text-primary" data-testid="button-view-all-properties">View All</Button>
        </CardHeader>
        <CardContent className="p-0">
          {propertiesLoading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : properties && properties.length > 0 ? (
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="px-8 py-4 font-bold text-[10px] uppercase tracking-widest">Property Details</TableHead>
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest">Source</TableHead>
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest">Quality</TableHead>
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest">Actions</TableHead>
                  <TableHead className="py-4 font-bold text-[10px] uppercase tracking-widest text-right px-8">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((prop) => {
                  const qualityScore = 10 - (prop.riskScore || 50) / 10;
                  return (
                    <TableRow key={prop.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer" data-testid={`row-property-${prop.id}`}>
                      <TableCell className="px-8 py-6">
                        <div>
                          <div className="font-black text-slate-900">{prop.title}</div>
                          <div className="text-xs font-bold text-primary mt-1">{prop.price} - {prop.locality}</div>
                          <div className="text-[10px] text-muted-foreground mt-1 font-medium italic">
                            {prop.type} | {prop.area} {prop.bhk && `| ${prop.bhk}`}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-[9px] uppercase font-bold py-0 h-4 border-slate-200",
                            getSourceBadgeClass(prop.source)
                          )}
                        >
                          {prop.source}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <div className="text-[10px] font-black">{qualityScore.toFixed(1)}/10</div>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full", 
                                    i < Math.floor(qualityScore/2) ? "bg-yellow-400" : "bg-slate-200"
                                  )} 
                                />
                              ))}
                            </div>
                          </div>
                          <Progress value={qualityScore * 10} className="h-1 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                            onClick={() => prop.url && window.open(prop.url, '_blank')}
                            data-testid={`button-view-property-${prop.id}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 rounded-lg"
                                data-testid={`button-property-menu-${prop.id}`}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => verifyPropertyMutation.mutate(prop.id)}
                                disabled={prop.isVerified || verifyPropertyMutation.isPending}
                                data-testid={`button-verify-property-${prop.id}`}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Verify
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => deletePropertyMutation.mutate(prop.id)}
                                disabled={deletePropertyMutation.isPending}
                                className="text-red-600 focus:text-red-600"
                                data-testid={`button-delete-property-${prop.id}`}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex flex-col items-end">
                          <Badge 
                            className={prop.isVerified ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}
                          >
                            {prop.isVerified ? "Verified" : "Pending"}
                          </Badge>
                          {prop.investmentScore && (
                            <span className="text-[9px] font-bold text-muted-foreground mt-1 uppercase tracking-tighter">
                              Invest Score: {prop.investmentScore}
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="p-12 text-center text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-bold mb-2">No properties found</p>
              <p className="text-sm">Properties will appear here after scraping or manual entry.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-slate-900 text-white">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <CardTitle className="text-white">Scraping Sources</CardTitle>
              <CardDescription className="text-slate-400">Connected property portals</CardDescription>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">System Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="grid gap-4 md:grid-cols-3">
            {sources?.map((source) => (
              <div key={source.id} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-sm">{source.name}</span>
                  <Badge className={source.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                    {source.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span>Type</span>
                    <span className="text-slate-300">{source.type}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span>Last Scraped</span>
                    <span className="text-slate-300">{source.lastScrapedAt ? "Recently" : "Never"}</span>
                  </div>
                </div>
              </div>
            )) || (
              <div className="col-span-3 text-center py-8 text-slate-400">
                No scraping sources configured yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
