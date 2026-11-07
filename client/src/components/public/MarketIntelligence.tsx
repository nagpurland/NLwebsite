import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Newspaper, 
  MessageSquare, 
  Briefcase, 
  Building, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PublicIntelligence {
  news: Array<{
    id: number;
    title: string;
    source: string | null;
    sourceUrl: string | null;
    category: string | null;
    locality: string | null;
    sentiment: string | null;
    publishedAt: string | null;
  }>;
  social: Array<{
    id: number;
    platform: string;
    author: string | null;
    content: string | null;
    sentiment: string | null;
    isViral: boolean | null;
  }>;
  jobs: Array<{
    id: number;
    companyName: string;
    jobTitle: string;
    jobCategory: string | null;
    numberOfOpenings: number | null;
    locality: string | null;
    salaryRange: string | null;
  }>;
  infrastructure: Array<{
    id: number;
    projectName: string;
    projectType: string | null;
    currentStatus: number | null;
    affectedLocalities: string[] | null;
  }>;
  legal: Array<{
    id: number;
    disputeType: string;
    locality: string;
    currentStatus: string | null;
    impactLevel: string | null;
  }>;
}

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

export function MarketIntelligenceWidget({ className }: { className?: string }) {
  const { data, isLoading } = useQuery<PublicIntelligence>({
    queryKey: ['/api/public/intelligence'],
  });

  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    );
  }

  const hasData = data && (
    (data.news?.length > 0) ||
    (data.social?.length > 0) ||
    (data.jobs?.length > 0) ||
    (data.infrastructure?.length > 0) ||
    (data.legal?.length > 0)
  );

  if (!hasData) {
    return null;
  }

  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
          <Sparkles className="h-4 w-4" />
          Live Market Intelligence
        </div>
        <h2 className="text-3xl font-semibold tracking-tight mb-2">What's Happening in Nagpur</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time insights from news, social media, job markets, and infrastructure developments
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {data.news && data.news.length > 0 && (
          <Card className="rounded-2xl border-none shadow-xl" data-testid="card-public-news">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-green-500" />
                Latest News
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
              {data.news.slice(0, 5).map((article) => (
                <a 
                  key={article.id}
                  href={article.sourceUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                  data-testid={`public-news-${article.id}`}
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <div className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                      <span>{article.source}</span>
                      {article.locality && <Badge variant="secondary" className="text-[10px]">{article.locality}</Badge>}
                    </div>
                  </div>
                  <Badge className={cn("shrink-0", getSentimentColor(article.sentiment))}>
                    {article.sentiment || 'Neutral'}
                  </Badge>
                </a>
              ))}
            </CardContent>
          </Card>
        )}

        {data.social && data.social.length > 0 && (
          <Card className="rounded-2xl border-none shadow-xl" data-testid="card-public-social">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                What People Are Saying
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
              {data.social.slice(0, 5).map((post) => (
                <div 
                  key={post.id}
                  className="p-3 rounded-xl bg-muted/30"
                  data-testid={`public-social-${post.id}`}
                >
                  <div className="text-sm line-clamp-2">{post.content}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">{post.platform}</Badge>
                      <span>{post.author}</span>
                      {post.isViral && <Badge className="bg-accent/15 text-accent-strong text-[10px]">Trending</Badge>}
                    </div>
                    <Badge className={cn("text-[10px]", getSentimentColor(post.sentiment))}>
                      {post.sentiment || 'Neutral'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {data.jobs && data.jobs.length > 0 && (
        <Card className="rounded-2xl border-none shadow-xl" data-testid="card-public-jobs">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-amber-500" />
              Job Market Trends
              <Badge variant="secondary" className="ml-2">Employment Signal</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {data.jobs.slice(0, 6).map((job) => (
                <div 
                  key={job.id}
                  className="p-4 rounded-xl border bg-card"
                  data-testid={`public-job-${job.id}`}
                >
                  <div className="font-semibold text-sm">{job.jobTitle}</div>
                  <div className="text-xs text-muted-foreground mt-1">{job.companyName}</div>
                  <div className="flex items-center justify-between mt-2">
                    {job.locality && <Badge variant="outline" className="text-[10px]">{job.locality}</Badge>}
                    <span className="text-xs font-medium text-green-600">{job.numberOfOpenings} openings</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Strong job growth in an area often leads to increased property demand
            </p>
          </CardContent>
        </Card>
      )}

      {data.infrastructure && data.infrastructure.length > 0 && (
        <Card className="rounded-2xl border-none shadow-xl" data-testid="card-public-infrastructure">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Infrastructure Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid gap-3 md:grid-cols-2">
              {data.infrastructure.slice(0, 4).map((project) => (
                <div 
                  key={project.id}
                  className="p-4 rounded-xl border bg-card"
                  data-testid={`public-infra-${project.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">{project.projectName}</div>
                      <div className="text-xs text-muted-foreground mt-1">{project.projectType}</div>
                    </div>
                    <Badge variant="secondary">{project.currentStatus || 0}% done</Badge>
                  </div>
                  {project.affectedLocalities && project.affectedLocalities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.affectedLocalities.slice(0, 3).map((loc, i) => (
                        <Badge key={i} variant="outline" className="text-[10px]">{loc}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {data.legal && data.legal.length > 0 && (
        <Card className="rounded-2xl border-none shadow-xl border-l-4 border-l-amber-500" data-testid="card-public-legal">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Legal Alerts
              <Badge variant="destructive" className="ml-2">Due Diligence Required</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-3">
            {data.legal.slice(0, 3).map((dispute) => (
              <div 
                key={dispute.id}
                className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20"
                data-testid={`public-legal-${dispute.id}`}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <div>
                    <div className="font-semibold text-sm">{dispute.disputeType}</div>
                    <div className="text-xs text-muted-foreground">{dispute.locality}</div>
                  </div>
                </div>
                <Badge variant={dispute.currentStatus === 'Pending' ? 'destructive' : 'secondary'}>
                  {dispute.currentStatus}
                </Badge>
              </div>
            ))}
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Always verify legal status before making property decisions in these areas
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function CompactMarketPulse({ className }: { className?: string }) {
  const { data, isLoading } = useQuery<PublicIntelligence>({
    queryKey: ['/api/public/intelligence'],
  });

  if (isLoading || !data) return null;

  const newsCount = data.news?.length || 0;
  const jobsCount = data.jobs?.reduce((sum, j) => sum + (j.numberOfOpenings || 0), 0) || 0;
  const infraCount = data.infrastructure?.length || 0;
  const bullishCount = (data.social?.filter(s => s.sentiment?.toLowerCase() === 'bullish').length || 0) +
                       (data.news?.filter(n => n.sentiment?.toLowerCase() === 'positive').length || 0);
  const bearishCount = (data.social?.filter(s => s.sentiment?.toLowerCase() === 'bearish').length || 0) +
                       (data.news?.filter(n => n.sentiment?.toLowerCase() === 'negative').length || 0);

  const overallSentiment = bullishCount > bearishCount ? 'Bullish' : bullishCount < bearishCount ? 'Bearish' : 'Neutral';

  return (
    <div className={cn("flex items-center gap-4 flex-wrap", className)}>
      <div className="flex items-center gap-2">
        <Newspaper className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{newsCount} news</span>
      </div>
      <div className="flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{jobsCount} job openings</span>
      </div>
      <div className="flex items-center gap-2">
        <Building className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{infraCount} projects</span>
      </div>
      <Badge className={cn(
        overallSentiment === 'Bullish' ? 'bg-green-100 text-green-700' :
        overallSentiment === 'Bearish' ? 'bg-red-100 text-red-700' :
        'bg-gray-100 text-gray-700'
      )}>
        {overallSentiment === 'Bullish' && <TrendingUp className="h-3 w-3 mr-1" />}
        {overallSentiment === 'Bearish' && <TrendingDown className="h-3 w-3 mr-1" />}
        Market: {overallSentiment}
      </Badge>
    </div>
  );
}
