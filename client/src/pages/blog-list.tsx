import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { BookOpen, Calendar, Eye, ArrowRight, MapPin } from "lucide-react";
import type { BlogPost } from "@shared/schema";

const CATEGORY_COLORS: Record<string, string> = {
  "12-point-guide": "bg-blue-100 text-blue-700",
  "case-study": "bg-green-100 text-green-700",
  "market-trend": "bg-purple-100 text-purple-700",
  "qa": "bg-amber-100 text-amber-700",
  "legal-update": "bg-red-100 text-red-700",
  "tips-hacks": "bg-teal-100 text-teal-700",
  "recap": "bg-slate-100 text-slate-700",
};

export default function BlogList() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog", { published: "true" }],
  });

  const publishedPosts = posts?.filter(p => p.isPublished) || [];

  return (
    <PublicLayout>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <SimpleBreadcrumb
          steps={[{ label: "Home", link: "/" }]}
          currentPage="Blog"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Knowledge Hub</Badge>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              NagpurLand Blog
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Expert guides, market insights, and practical tips for safely buying land in Nagpur
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : publishedPosts.length === 0 ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Posts Yet</h3>
                <p className="text-slate-500">
                  Check back soon for expert guides and market insights.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover-elevate cursor-pointer transition-all" data-testid={`blog-card-${post.id}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        {post.contentType && (
                          <Badge className={CATEGORY_COLORS[post.contentType] || "bg-slate-100 text-slate-700"}>
                            {post.contentType.replace(/-/g, ' ')}
                          </Badge>
                        )}
                        {post.locality && (
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {post.locality}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
                        {post.excerpt || post.metaDescription}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-3">
                          {post.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.viewsCount || 0}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/step-3-safety-check">
              <Button variant="outline" size="lg" data-testid="button-back-checklist">
                Back to Safety Checklist
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
