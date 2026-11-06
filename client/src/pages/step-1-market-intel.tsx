import { useLocation } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StepHeader } from "@/components/ui/step-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, BarChart3, MapPin, IndianRupee, Building2,
  ArrowRight, HelpCircle, Zap
} from "lucide-react";

const STEP_NAMES = ["Market Intel", "Filter Risky", "Safety Check", "Decision Report"];

const INTEL_TOPICS = [
  {
    icon: TrendingUp,
    title: "Price Trends Analysis",
    description: "Understand how property prices have moved over the past 5 years in different Nagpur localities. Identify areas with consistent growth vs volatile markets."
  },
  {
    icon: MapPin,
    title: "Locality Comparison",
    description: "Compare amenities, connectivity, infrastructure development, and future prospects across Nagpur's key localities from MIHAN to Civil Lines."
  },
  {
    icon: BarChart3,
    title: "Supply & Demand Dynamics",
    description: "Learn which areas have oversupply (buyer's market) vs undersupply (seller's market). Time your purchase for maximum negotiation power."
  },
  {
    icon: IndianRupee,
    title: "Price Per Sqft Benchmarks",
    description: "Know the fair market value for each locality. Our data aggregates from 99acres, MagicBricks, and Housing.com to give you accurate benchmarks."
  },
  {
    icon: Building2,
    title: "Infrastructure Impact",
    description: "Understand how upcoming metro lines, ring roads, and commercial developments will impact property values in different areas."
  }
];

const KEY_INSIGHTS = [
  { locality: "MIHAN", trend: "up", growth: "+18%", insight: "Airport proximity driving commercial growth" },
  { locality: "Besa", trend: "up", growth: "+12%", insight: "Affordable entry point with good infrastructure" },
  { locality: "Civil Lines", trend: "stable", growth: "+3%", insight: "Premium established area, limited new supply" },
  { locality: "Wardha Road", trend: "up", growth: "+15%", insight: "IT parks and educational institutions boosting demand" },
  { locality: "Hingna", trend: "up", growth: "+22%", insight: "Industrial zone expansion creating opportunities" }
];

export default function Step1MarketIntel() {
  const [, navigate] = useLocation();

  const handleStepClick = (stepNum: number) => {
    const routes = [
      "/step-1-market-intel",
      "/step-2-filter-risky",
      "/step-3-safety-check",
      "/step-4-decision-report"
    ];
    navigate(routes[stepNum - 1] || "/");
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <SimpleBreadcrumb
          steps={[
            { label: "Home", link: "/" },
            { label: "4-Step System", link: "/invest-safely" }
          ]}
          currentPage="Step 1: Market Intel"
        />

        <ProgressBar
          currentStep={1}
          stepNames={STEP_NAMES}
          onStepClick={handleStepClick}
        />

        <StepHeader
          stepNumber={1}
          totalSteps={4}
          stepTitle="Market Intelligence"
          description="Gather comprehensive market data to make informed decisions. Understand price trends, locality dynamics, and investment potential."
          nextStep={{ title: "Filter Risky", link: "/step-2-filter-risky" }}
        />

        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-12">
          <section data-testid="section-intro">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Why Market Intelligence Matters
            </h2>
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p>
                The difference between a good investment and a great one often comes down to timing and location knowledge. Nagpur's real estate market has distinct micro-markets, each with its own dynamics. What works in MIHAN doesn't apply to Dharampeth.
              </p>
              <p>
                Our market intelligence system aggregates data from multiple sources - listing portals, registration records, and on-ground surveys - to give you a complete picture. You'll know not just current prices, but historical trends and future projections.
              </p>
              <p>
                Armed with this data, you can negotiate better, identify undervalued areas, and avoid overpriced properties. Knowledge is your most powerful tool in real estate.
              </p>
            </div>
          </section>

          <section data-testid="section-topics">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              What You'll Learn
            </h2>
            <div className="space-y-4">
              {INTEL_TOPICS.map((topic, index) => (
                <Card 
                  key={topic.title} 
                  className="border-slate-200 dark:border-slate-700"
                  data-testid={`topic-card-${index + 1}`}
                >
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2180a8]/10 dark:bg-blue-500/20 flex items-center justify-center">
                        <topic.icon className="w-5 h-5 text-[#2180a8] dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section data-testid="section-insights">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Current Market Snapshot
            </h2>
            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Locality</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Trend</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">YoY Growth</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Key Insight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {KEY_INSIGHTS.map((item, index) => (
                        <tr 
                          key={item.locality} 
                          className="border-b border-slate-100 dark:border-slate-800 last:border-0"
                          data-testid={`insight-row-${index + 1}`}
                        >
                          <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                            {item.locality}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge className={
                              item.trend === "up" 
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                            }>
                              {item.trend === "up" ? "Rising" : "Stable"}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center font-semibold text-green-600 dark:text-green-400">
                            {item.growth}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                            {item.insight}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          <section 
            className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8"
            data-testid="section-cta"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Ready to Continue?
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Now that you understand the market, learn to filter out risky options
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#2180a8] hover:bg-[#1a6a8a] text-white"
                onClick={() => navigate("/step-2-filter-risky")}
                data-testid="button-next-step"
              >
                Next: Filter Risky Options
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/step-3-safety-check")}
                  data-testid="button-jump-safety"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Jump to Safety Check
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/contact")}
                  data-testid="button-get-help"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Get Help
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
