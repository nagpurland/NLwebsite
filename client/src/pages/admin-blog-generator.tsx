import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Sparkles, FileText, Clock, Check, Send, Edit, Calendar, DollarSign, Loader2, ArrowLeft, Eye, Trash2 } from "lucide-react";
import type { BlogPost } from "@shared/schema";

const CONTENT_TYPES = [
  { value: "12-point-guide", label: "12-Point Guide", provider: "gemini" },
  { value: "case-study", label: "Case Study", provider: "gemini" },
  { value: "market-trend", label: "Market Trend", provider: "perplexity" },
  { value: "qa", label: "Q&A", provider: "gemini" },
  { value: "legal-update", label: "Legal Update", provider: "perplexity" },
  { value: "tips-hacks", label: "Tips & Hacks", provider: "gemini" },
  { value: "recap", label: "Weekly Recap", provider: "gemini" },
];

const LOCALITIES = [
  "Nagpur General",
  "MIHAN",
  "Wardha Road",
  "Besa",
  "Manish Nagar",
  "Hingna",
  "Kamptee",
  "Koradi",
  "Umred Road",
  "Nagpur South",
  "Civil Lines"
];

interface BudgetInfo {
  gemini: { spent: number; budget: number; remaining: number };
  perplexity: { spent: number; budget: number; remaining: number };
}

export default function AdminBlogGenerator() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"generate" | "drafts" | "published">("generate");
  
  const [formData, setFormData] = useState({
    contentType: "",
    locality: "",
    topic: "",
    tone: "professional" as "casual" | "professional",
    provider: "gemini" as "gemini" | "perplexity"
  });
  
  const [generatedContent, setGeneratedContent] = useState<BlogPost | null>(null);
  const [editableContent, setEditableContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");

  const { data: blogPosts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog", { published: "false" }],
  });

  const { data: budget, isLoading: budgetLoading } = useQuery<BudgetInfo>({
    queryKey: ["/api/admin/budget"],
  });

  const generateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/admin/blog/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedContent(data.post);
      setEditableContent(data.post.content);
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/budget"] });
      toast({
        title: "Blog Generated",
        description: `Cost: $${data.cost}. Review and approve your draft.`
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const approveMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/blog/${id}/approve`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to approve");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Draft Approved", description: "Ready to publish or schedule." });
    }
  });

  const publishMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/blog/${id}/publish`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to publish");
      return response.json();
    },
    onSuccess: () => {
      setGeneratedContent(null);
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Published!", description: "Blog is now live with notification." });
    }
  });

  const scheduleMutation = useMutation({
    mutationFn: async ({ id, scheduledAt }: { id: number; scheduledAt: string }) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/blog/${id}/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ scheduledAt })
      });
      if (!response.ok) throw new Error("Failed to schedule");
      return response.json();
    },
    onSuccess: () => {
      setGeneratedContent(null);
      setScheduleDate("");
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Scheduled!", description: "Blog will be published at the scheduled time." });
    }
  });

  const updateContentMutation = useMutation({
    mutationFn: async ({ id, content }: { id: number; content: string }) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/blog/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      });
      if (!response.ok) throw new Error("Failed to update");
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedContent(data);
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Content Updated" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to delete");
      return response.json();
    },
    onSuccess: () => {
      setGeneratedContent(null);
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Draft Deleted" });
    }
  });

  const handleContentTypeChange = (value: string) => {
    const type = CONTENT_TYPES.find(t => t.value === value);
    setFormData({
      ...formData,
      contentType: value,
      provider: (type?.provider || "gemini") as "gemini" | "perplexity"
    });
  };

  const handleGenerate = () => {
    if (!formData.contentType || !formData.topic) {
      toast({
        title: "Missing Fields",
        description: "Please select content type and enter a topic.",
        variant: "destructive"
      });
      return;
    }
    generateMutation.mutate(formData);
  };

  const drafts = blogPosts?.filter(p => !p.isPublished) || [];
  const published = blogPosts?.filter(p => p.isPublished) || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/admin")}
          className="mb-4"
          data-testid="button-back-admin"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Blog Generator</h1>
            <p className="text-slate-600 dark:text-slate-400">Generate and publish content with AI</p>
          </div>
          
          {!budgetLoading && budget && (
            <Card className="w-64">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Monthly Budget</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Perplexity</span>
                    <span>${budget.perplexity.spent.toFixed(2)} / ${budget.perplexity.budget.toFixed(2)}</span>
                  </div>
                  <Progress 
                    value={(budget.perplexity.spent / budget.perplexity.budget) * 100} 
                    className="h-2"
                  />
                  {budget.perplexity.remaining < 1 && (
                    <p className="text-xs text-amber-600">Low budget - switch to Gemini</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="mb-6">
            <TabsTrigger value="generate" data-testid="tab-generate">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="drafts" data-testid="tab-drafts">
              <FileText className="w-4 h-4 mr-2" />
              Drafts ({drafts.length})
            </TabsTrigger>
            <TabsTrigger value="published" data-testid="tab-published">
              <Check className="w-4 h-4 mr-2" />
              Published ({published.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate New Blog</CardTitle>
                  <CardDescription>Fill in the details and let AI create content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Content Type</Label>
                    <Select 
                      value={formData.contentType} 
                      onValueChange={handleContentTypeChange}
                    >
                      <SelectTrigger data-testid="select-content-type">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONTENT_TYPES.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                            <Badge variant="outline" className="ml-2 text-xs">
                              {type.provider}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Locality (Optional)</Label>
                    <Select 
                      value={formData.locality} 
                      onValueChange={(v) => setFormData({ ...formData, locality: v })}
                    >
                      <SelectTrigger data-testid="select-locality">
                        <SelectValue placeholder="Select locality" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCALITIES.map(loc => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Topic</Label>
                    <Input
                      placeholder="e.g., How to verify ownership documents"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      data-testid="input-topic"
                    />
                  </div>

                  <div>
                    <Label>Tone</Label>
                    <Select 
                      value={formData.tone} 
                      onValueChange={(v) => setFormData({ ...formData, tone: v as any })}
                    >
                      <SelectTrigger data-testid="select-tone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>AI Provider</Label>
                    <Select 
                      value={formData.provider} 
                      onValueChange={(v) => setFormData({ ...formData, provider: v as any })}
                    >
                      <SelectTrigger data-testid="select-provider">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini">Gemini (Free)</SelectItem>
                        <SelectItem value="perplexity">Perplexity ($0.50/blog)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    disabled={generateMutation.isPending}
                    className="w-full"
                    data-testid="button-generate"
                  >
                    {generateMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Blog
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {generatedContent && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Preview</span>
                      <Badge>{generatedContent.status}</Badge>
                    </CardTitle>
                    <CardDescription>{generatedContent.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Content (Editable)</Label>
                      <Textarea
                        value={editableContent}
                        onChange={(e) => setEditableContent(e.target.value)}
                        className="min-h-[300px] font-mono text-sm"
                        data-testid="textarea-content"
                      />
                    </div>

                    {editableContent !== generatedContent.content && (
                      <Button
                        variant="outline"
                        onClick={() => updateContentMutation.mutate({
                          id: generatedContent.id,
                          content: editableContent
                        })}
                        disabled={updateContentMutation.isPending}
                        data-testid="button-save-changes"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {generatedContent.status !== "approved" && (
                        <Button
                          onClick={() => approveMutation.mutate(generatedContent.id)}
                          disabled={approveMutation.isPending}
                          variant="outline"
                          data-testid="button-approve"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                      )}

                      <Button
                        onClick={() => publishMutation.mutate(generatedContent.id)}
                        disabled={publishMutation.isPending}
                        data-testid="button-publish"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Publish Now
                      </Button>

                      <div className="flex items-center gap-2">
                        <Input
                          type="datetime-local"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="w-auto"
                          data-testid="input-schedule-date"
                        />
                        <Button
                          variant="outline"
                          onClick={() => scheduleMutation.mutate({
                            id: generatedContent.id,
                            scheduledAt: scheduleDate
                          })}
                          disabled={!scheduleDate || scheduleMutation.isPending}
                          data-testid="button-schedule"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                      </div>

                      <Button
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(generatedContent.id)}
                        disabled={deleteMutation.isPending}
                        data-testid="button-delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="drafts">
            <div className="grid gap-4">
              {postsLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : drafts.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-slate-500">
                    No drafts yet. Generate your first blog!
                  </CardContent>
                </Card>
              ) : (
                drafts.map(post => (
                  <Card key={post.id} className="hover-elevate cursor-pointer">
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{post.title}</h3>
                          <p className="text-sm text-slate-500 mt-1">{post.excerpt}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{post.contentType}</Badge>
                            <Badge variant="outline">{post.status}</Badge>
                            {post.locality && <Badge variant="secondary">{post.locality}</Badge>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setGeneratedContent(post);
                              setEditableContent(post.content || "");
                              setActiveTab("generate");
                            }}
                            data-testid={`button-edit-${post.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => publishMutation.mutate(post.id)}
                            disabled={publishMutation.isPending}
                            data-testid={`button-publish-${post.id}`}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="published">
            <div className="grid gap-4">
              {postsLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : published.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-slate-500">
                    No published blogs yet.
                  </CardContent>
                </Card>
              ) : (
                published.map(post => (
                  <Card key={post.id}>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{post.title}</h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Published: {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'N/A'}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{post.contentType}</Badge>
                            {post.locality && <Badge variant="secondary">{post.locality}</Badge>}
                            <Badge variant="secondary">
                              <Eye className="w-3 h-3 mr-1" />
                              {post.viewsCount || 0} views
                            </Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          data-testid={`button-view-${post.id}`}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
