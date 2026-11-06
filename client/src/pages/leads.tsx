import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
  Users, 
  TrendingUp, 
  MessageSquare, 
  UserPlus, 
  Search,
  MoreHorizontal,
  Phone,
  Target,
  Zap,
  Sparkles,
  CheckCircle,
  Calendar,
  XCircle,
  Trash2
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
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
import { cn } from "@/lib/utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Lead } from "@shared/schema";
import { useState } from "react";

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    locality: "",
    source: "website",
    requirementType: "buy",
    budget: "",
  });
  const { toast } = useToast();

  const { data: leads, isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"]
  });

  const createLeadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({
        title: "Lead created",
        description: "New lead has been added successfully.",
      });
      setDialogOpen(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        locality: "",
        source: "website",
        requirementType: "buy",
        budget: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create lead. Please try again.",
        variant: "destructive",
      });
    }
  });

  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest("PATCH", `/api/leads/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({
        title: "Lead updated",
        description: "Lead status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update lead status.",
        variant: "destructive",
      });
    }
  });

  const deleteLeadMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/leads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({
        title: "Lead deleted",
        description: "Lead has been removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete lead.",
        variant: "destructive",
      });
    }
  });

  const scoreMutation = useMutation({
    mutationFn: async (leadId: number) => {
      return apiRequest("POST", `/api/insights/lead/${leadId}/score`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast({
        title: "Validation error",
        description: "Name and phone are required fields.",
        variant: "destructive",
      });
      return;
    }
    createLeadMutation.mutate(formData);
  };

  const filteredLeads = leads?.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.locality?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const highIntentCount = leads?.filter(l => (l.intentScore || 0) >= 70).length || 0;
  const avgIntentScore = leads?.length 
    ? Math.round(leads.reduce((sum, l) => sum + (l.intentScore || 0), 0) / leads.length) / 10
    : 0;
  const activeFollowups = leads?.filter(l => l.status === "contacted" || l.status === "site_visit").length || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-1 text-slate-900" data-testid="text-leads-title">Lead Intelligence Queue</h1>
          <p className="text-muted-foreground font-medium italic">Behavioral prioritization for the Nagpur market.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search leads..." 
              className="pl-9 w-[250px] bg-white border-slate-200 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search-leads"
            />
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl font-bold bg-primary shadow-lg shadow-primary/20" data-testid="button-add-lead">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Enter the lead details below. Name and phone are required.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-testid="input-lead-name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      data-testid="input-lead-phone"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      data-testid="input-lead-email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="locality">Locality</Label>
                    <Input
                      id="locality"
                      placeholder="Preferred locality"
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      data-testid="input-lead-locality"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="source">Source</Label>
                      <Select
                        value={formData.source}
                        onValueChange={(value) => setFormData({ ...formData, source: value })}
                      >
                        <SelectTrigger data-testid="select-lead-source">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="phone_call">Phone Call</SelectItem>
                          <SelectItem value="walk_in">Walk-in</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select
                        value={formData.requirementType}
                        onValueChange={(value) => setFormData({ ...formData, requirementType: value })}
                      >
                        <SelectTrigger data-testid="select-lead-property-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Buy</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                          <SelectItem value="invest">Invest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., 50L - 1Cr"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      data-testid="input-lead-budget"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    data-testid="button-cancel-lead"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createLeadMutation.isPending}
                    data-testid="button-submit-lead"
                  >
                    {createLeadMutation.isPending ? "Adding..." : "Add Lead"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-none shadow-md bg-indigo-600 text-white overflow-hidden relative">
          <div className="absolute right-0 top-0 p-4 opacity-20">
            <Target className="h-16 w-16" />
          </div>
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">High Intent</p>
            <p className="text-3xl font-black mb-2" data-testid="text-high-intent-count">{highIntentCount} Leads</p>
            <Badge className="bg-white/20 text-white border-none font-bold">Score 70+</Badge>
          </CardContent>
        </Card>
        
        {[
          { label: "Avg Intent Score", value: `${avgIntentScore}/10`, icon: Zap, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Total Leads", value: leads?.length || 0, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Active Follow-ups", value: activeFollowups, icon: Phone, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
        <CardHeader className="p-8 border-b border-slate-50">
          <CardTitle>Priority Lead Queue</CardTitle>
          <CardDescription>Sorted by Intent Score (Based on site behavior)</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-16 w-full rounded-xl" />
                </div>
              ))}
            </div>
          ) : filteredLeads.length > 0 ? (
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="px-8 font-bold text-[10px] uppercase tracking-widest">Buyer Identity</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest">AI Insights</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest">Intent Matrix</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest">Preferences</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase tracking-widest text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads
                  .sort((a, b) => (b.intentScore || 0) - (a.intentScore || 0))
                  .map((lead) => {
                    const intentLevel = (lead.intentScore || 0) >= 70 ? "High" : (lead.intentScore || 0) >= 40 ? "Medium" : "Low";
                    
                    return (
                      <TableRow key={lead.id} className="group hover:bg-slate-50/50 transition-colors" data-testid={`row-lead-${lead.id}`}>
                        <TableCell className="px-8 py-6">
                          <div>
                            <div className="font-black text-slate-900">{lead.name}</div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 mt-1">
                              <MessageSquare className="h-3 w-3" />
                              {lead.phone}
                            </div>
                            <Badge variant="outline" className="mt-2 text-[9px] uppercase font-bold border-slate-200">
                              Via {lead.source?.replace('_', ' ') || 'website'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                              "{lead.awarenessLevel === 'most_aware' ? 'Ready to buy - high intent buyer' : 
                                lead.awarenessLevel === 'product_aware' ? 'Comparing options actively' :
                                lead.awarenessLevel === 'solution_aware' ? 'Knows what they want' :
                                lead.awarenessLevel === 'problem_aware' ? 'Exploring the market' :
                                'Early stage browser'}"
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-4 w-32">
                              <span className="text-[10px] font-bold text-muted-foreground uppercase">Score</span>
                              <span className="font-black text-slate-900">{(lead.intentScore || 0) / 10}/10</span>
                            </div>
                            <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full rounded-full",
                                  intentLevel === "High" ? "bg-green-500" : 
                                  intentLevel === "Medium" ? "bg-orange-500" : "bg-slate-400"
                                )} 
                                style={{ width: `${lead.intentScore || 0}%` }} 
                              />
                            </div>
                            <Badge 
                              variant="secondary"
                              className={cn(
                                "text-[9px] uppercase font-bold",
                                intentLevel === "High" ? "bg-green-100 text-green-700" : 
                                intentLevel === "Medium" ? "bg-orange-100 text-orange-700" : "bg-slate-100"
                              )}
                            >
                              {intentLevel} Intent
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-bold text-slate-900">{lead.locality || "Not specified"}</div>
                            <div className="text-xs font-medium text-muted-foreground">{lead.budget || "Budget TBD"}</div>
                            <Badge variant="outline" className="text-[9px]">
                              {lead.requirementType === "buy" ? "Buyer" : "Investor"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right px-8">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              className="bg-green-600 h-9 px-4 rounded-lg font-bold text-xs shadow-lg shadow-green-600/10"
                              data-testid={`button-call-lead-${lead.id}`}
                            >
                              Call Lead
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" data-testid={`button-lead-menu-${lead.id}`}>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-200">
                                <DropdownMenuItem className="font-bold text-xs py-2 rounded-lg">View Full Profile</DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="font-bold text-xs py-2 rounded-lg text-primary"
                                  onClick={() => scoreMutation.mutate(lead.id)}
                                >
                                  Re-score Lead
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-bold text-xs py-2 rounded-lg">Add Note</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="font-bold text-xs py-2 rounded-lg"
                                  onClick={() => updateLeadMutation.mutate({ id: lead.id, status: "contacted" })}
                                  disabled={updateLeadMutation.isPending}
                                  data-testid={`button-mark-contacted-${lead.id}`}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2 text-blue-500" />
                                  Mark as Contacted
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="font-bold text-xs py-2 rounded-lg"
                                  onClick={() => updateLeadMutation.mutate({ id: lead.id, status: "site_visit" })}
                                  disabled={updateLeadMutation.isPending}
                                  data-testid={`button-schedule-visit-${lead.id}`}
                                >
                                  <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                                  Schedule Site Visit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="font-bold text-xs py-2 rounded-lg"
                                  onClick={() => updateLeadMutation.mutate({ id: lead.id, status: "closed" })}
                                  disabled={updateLeadMutation.isPending}
                                  data-testid={`button-mark-closed-${lead.id}`}
                                >
                                  <XCircle className="h-4 w-4 mr-2 text-green-500" />
                                  Mark as Closed
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="font-bold text-xs py-2 rounded-lg text-destructive"
                                  onClick={() => deleteLeadMutation.mutate(lead.id)}
                                  disabled={deleteLeadMutation.isPending}
                                  data-testid={`button-delete-lead-${lead.id}`}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          ) : (
            <div className="p-12 text-center text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-bold mb-2">No leads found</p>
              <p className="text-sm">Leads will appear here when visitors submit inquiries.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
