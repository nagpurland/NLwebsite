import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Megaphone, Send, Users, Calendar, CheckCircle2, Clock, Mail, MessageSquare, Play, Pause, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Campaign, Lead } from "@shared/schema";

const campaignSchema = z.object({
  name: z.string().min(3, "Campaign name must be at least 3 characters"),
  type: z.enum(["email", "whatsapp", "sms"]),
  targetAudience: z.string().min(1, "Please select a target audience"),
  subject: z.string().optional(),
  content: z.string().min(10, "Message must be at least 10 characters"),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

export default function Campaigns() {
  const { toast } = useToast();
  const [selectedChannel, setSelectedChannel] = useState<"whatsapp" | "email">("whatsapp");

  const { data: campaigns, isLoading: campaignsLoading } = useQuery<Campaign[]>({
    queryKey: ['/api/campaigns'],
  });

  const { data: leads } = useQuery<Lead[]>({
    queryKey: ['/api/leads'],
  });

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      type: "whatsapp",
      targetAudience: "",
      subject: "",
      content: "",
    },
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (data: CampaignFormData) => {
      return apiRequest('POST', '/api/campaigns', {
        ...data,
        status: 'draft',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      form.reset();
      toast({
        title: "Campaign Created",
        description: "Your campaign has been saved as a draft.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateCampaignStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return apiRequest('PATCH', `/api/campaigns/${id}`, { status });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      toast({
        title: "Campaign Updated",
        description: `Campaign has been ${variables.status === 'active' ? 'launched' : 'paused'}.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update campaign. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('DELETE', `/api/campaigns/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      toast({
        title: "Campaign Deleted",
        description: "Campaign has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete campaign. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CampaignFormData) => {
    createCampaignMutation.mutate(data);
  };

  const handleLaunch = (id: number) => {
    updateCampaignStatusMutation.mutate({ id, status: 'active' });
  };

  const handlePause = (id: number) => {
    updateCampaignStatusMutation.mutate({ id, status: 'paused' });
  };

  const handleDelete = (id: number) => {
    deleteCampaignMutation.mutate(id);
  };

  const totalLeads = leads?.length || 0;
  const hotLeads = leads?.filter(l => (l.intentScore || 0) > 70).length || 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Manager</h1>
          <p className="text-muted-foreground mt-1">
            Create and send WhatsApp/Email blasts to your leads.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="rounded-2xl border-none shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Megaphone className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Campaigns</p>
              <h3 className="text-2xl font-black" data-testid="stat-total-campaigns">{campaigns?.length || 0}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Leads</p>
              <h3 className="text-2xl font-black" data-testid="stat-total-leads">{totalLeads}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Hot Leads</p>
              <h3 className="text-2xl font-black" data-testid="stat-hot-leads">{hotLeads}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-none shadow-xl">
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
            <CardDescription>Target specific segments of your CRM.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Besa Plots Follow-up" {...field} data-testid="input-campaign-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Segment</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-target-audience">
                            <SelectValue placeholder="Select audience..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="investors">Investors (Budget 40L+)</SelectItem>
                          <SelectItem value="end-users-south">End Users (South Nagpur)</SelectItem>
                          <SelectItem value="warm-leads">Warm Leads (Last 7 days)</SelectItem>
                          <SelectItem value="hot-leads">Hot Leads (Score 70+)</SelectItem>
                          <SelectItem value="all">All Contacts</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Channel</FormLabel>
                      <div className="flex gap-2">
                        <Button 
                          type="button"
                          variant={selectedChannel === 'whatsapp' ? 'default' : 'outline'} 
                          className="flex-1"
                          onClick={() => {
                            setSelectedChannel('whatsapp');
                            field.onChange('whatsapp');
                          }}
                          data-testid="button-channel-whatsapp"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                        <Button 
                          type="button"
                          variant={selectedChannel === 'email' ? 'default' : 'outline'} 
                          className="flex-1"
                          onClick={() => {
                            setSelectedChannel('email');
                            field.onChange('email');
                          }}
                          data-testid="button-channel-email"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />

                {selectedChannel === 'email' && (
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Subject line..." {...field} data-testid="input-email-subject" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message Template</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Hi {{name}}, found a great deal in {{locality}} matching your budget..." 
                          className="h-32 resize-none"
                          {...field}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-1">
                        Available variables: {'{{name}}, {{budget}}, {{locality}}'}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={createCampaignMutation.isPending}
                  data-testid="button-launch-campaign"
                >
                  {createCampaignMutation.isPending ? (
                    "Creating..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Save Campaign
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl border-none shadow-xl">
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              {campaignsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-16 rounded-lg" />
                  ))}
                </div>
              ) : campaigns && campaigns.length > 0 ? (
                <div className="space-y-4">
                  {campaigns.slice(0, 5).map((campaign) => (
                    <div 
                      key={campaign.id} 
                      className="flex items-center justify-between p-3 border rounded-lg bg-muted/20 gap-2"
                      data-testid={`campaign-row-${campaign.id}`}
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="font-medium text-sm truncate">{campaign.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          {campaign.type === 'whatsapp' ? (
                            <MessageSquare className="h-3 w-3" />
                          ) : (
                            <Mail className="h-3 w-3" />
                          )}
                          {campaign.type}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="secondary"
                          className={
                            campaign.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            campaign.status === 'sent' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                            ''
                          }
                          data-testid={`badge-status-${campaign.id}`}
                        >
                          {campaign.status || 'draft'}
                        </Badge>
                        <div className="flex gap-1">
                          {campaign.status !== 'active' && campaign.status !== 'sent' && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleLaunch(campaign.id)}
                              disabled={updateCampaignStatusMutation.isPending}
                              data-testid={`button-launch-${campaign.id}`}
                              title="Launch campaign"
                            >
                              <Play className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          {campaign.status === 'active' && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handlePause(campaign.id)}
                              disabled={updateCampaignStatusMutation.isPending}
                              data-testid={`button-pause-${campaign.id}`}
                              title="Pause campaign"
                            >
                              <Pause className="h-4 w-4 text-yellow-600" />
                            </Button>
                          )}
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(campaign.id)}
                            disabled={deleteCampaignMutation.isPending}
                            data-testid={`button-delete-${campaign.id}`}
                            title="Delete campaign"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>No campaigns created yet</p>
                  <p className="text-sm mt-1">Create your first campaign to get started</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground rounded-2xl border-none shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold" data-testid="stat-reachable-leads">{totalLeads}</div>
                  <div className="text-sm opacity-80">Total Reachable Leads</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
