import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { INTEL } from "@/lib/mockData";
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Link, useLocation } from "wouter";

export default function BlogDetail({ params }: { params: { id: string } }) {
  const [location, setLocation] = useLocation();
  const id = parseInt(params.id);
  const post = INTEL.find(p => p.id === id);

  if (!post) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="bg-slate-50 min-h-screen pb-24">
        {/* Header / Hero */}
        <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.2),transparent)] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 max-w-4xl">
            <Link href="/">
              <Button variant="ghost" className="text-slate-400 hover:text-white mb-8 pl-0 hover:bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Market Strategy
              </Button>
            </Link>
            
            <div className="flex gap-2 mb-6">
              {post.tags.map(tag => (
                <Badge key={tag} className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-400 border-t border-white/10 pt-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-indigo-400" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-400" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-400" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-10 relative z-20 max-w-4xl">
          <div className="grid md:grid-cols-[1fr_300px] gap-10">
            {/* Main Content */}
            <Card className="p-10 border-none shadow-xl rounded-[2rem] bg-white">
              <div 
                className="prose prose-lg prose-indigo max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-indigo-700"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />

              <div className="mt-12 pt-10 border-t border-slate-100 flex items-center justify-between">
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Bookmark className="mr-2 h-4 w-4" /> Save
                  </Button>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Source: {post.source}
                </div>
              </div>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 border-none shadow-lg rounded-2xl bg-indigo-600 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="font-black text-lg mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    Actionable Insight
                  </h3>
                  <p className="text-indigo-100 text-sm mb-6 font-medium leading-relaxed">
                    This update directly impacts property values in {post.tags[2] || "Nagpur"}. Don't miss the window.
                  </p>
                  <Link href="/find-properties">
                    <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-black border-none">
                      See Affected Properties
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="p-6 border-none shadow-lg rounded-2xl bg-white">
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-500 mb-4">
                  Strategic Tools
                </h3>
                <div className="space-y-2">
                  <Link href="/public/intel">
                    <Button variant="ghost" className="w-full justify-start font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50">
                      <TrendingUp className="mr-3 h-4 w-4" /> Market Heatmaps
                    </Button>
                  </Link>
                  <Link href="/invest-safely">
                    <Button variant="ghost" className="w-full justify-start font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50">
                      <ShieldCheck className="mr-3 h-4 w-4" /> Legal Checklist
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="p-6 border-none shadow-lg rounded-2xl bg-green-50">
                <h3 className="font-black text-lg text-green-800 mb-2">
                  Need clarity?
                </h3>
                <p className="text-green-700 text-sm mb-4">
                  Chat with our investment strategists on WhatsApp.
                </p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                  onClick={() => window.open(`https://wa.me/918857801966?text=Hi%2C%20I%20read%20your%20article%20on%20${post.title}%20and%20need%20clarity.`, "_blank")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp Us
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
