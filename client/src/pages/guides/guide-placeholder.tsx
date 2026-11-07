import { Link, useRoute } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScrollToTop } from "@/components/utils/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, CheckCircle, Clock, Construction
} from "lucide-react";

const GUIDE_META: Record<string, { title: string; category: string; badgeClass: string }> = {
  "mutations-transfers": { title: "How to Check Mutations and Transfers", category: "Documents", badgeClass: "bg-blue-100 text-blue-700" },
  "tax-verification": { title: "How to Verify Property Tax Payments", category: "Documents", badgeClass: "bg-blue-100 text-blue-700" },
  "identity-verification": { title: "How to Verify Seller Identity", category: "Documents", badgeClass: "bg-blue-100 text-blue-700" },
  "na-conversion": { title: "How to Check NA Conversion Status", category: "Legal", badgeClass: "bg-purple-100 text-purple-700" },
  "encumbrance-check": { title: "How to Get Encumbrance Certificate", category: "Legal", badgeClass: "bg-purple-100 text-purple-700" },
  "chain-of-title": { title: "How to Verify Chain of Title", category: "Legal", badgeClass: "bg-purple-100 text-purple-700" },
  "boundary-verification": { title: "How to Verify Plot Boundaries", category: "Physical", badgeClass: "bg-amber-100 text-amber-700" },
  "possession-verification": { title: "How to Verify Seller Possession", category: "Physical", badgeClass: "bg-amber-100 text-amber-700" },
  "neighbor-verification": { title: "How to Check with Neighbors", category: "Physical", badgeClass: "bg-amber-100 text-amber-700" },
};

export default function GuidePlaceholder() {
  const [, params] = useRoute("/guide/:slug");
  const slug = params?.slug || "";
  const meta = GUIDE_META[slug] || { title: "Verification Guide", category: "General", badgeClass: "bg-slate-100 text-slate-700" };

  return (
    <PublicLayout>
      <ScrollToTop />
      
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="container mx-auto px-4">
          <Link href="/step-3-safety-check">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-checklist">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to 12-Point Checklist
            </Button>
          </Link>
          
          <Badge className={`${meta.badgeClass} mb-4`}>
            {meta.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            {meta.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="border-2 border-dashed border-amber-300 bg-amber-50 dark:bg-amber-900/20">
          <CardContent className="p-8 text-center">
            <Construction className="w-16 h-16 text-amber-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Detailed Guide Coming Soon
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              We're preparing a comprehensive step-by-step guide with Nagpur-specific office addresses, 
              document requirements, and common mistakes to avoid.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
              <Clock className="w-4 h-4" />
              <span>Expected: Within 2 weeks</span>
            </div>
            
            <p className="text-sm text-slate-500 mb-6">
              In the meantime, use the quick guidance on the checklist page to complete this verification.
            </p>
            
            <Link href="/step-3-safety-check">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" data-testid="button-back-mark">
                <CheckCircle className="w-4 h-4 mr-2" />
                Back to Checklist & Mark Complete
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
