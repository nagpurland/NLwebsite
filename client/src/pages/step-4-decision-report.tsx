import { useLocation } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StepHeader } from "@/components/ui/step-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Download, Calendar, Phone, CheckCircle2,
  Star, Trophy, Sparkles, ArrowRight, HelpCircle,
  TrendingUp, Shield, AlertTriangle, Target
} from "lucide-react";

const STEP_NAMES = ["Market Intel", "Filter Risky", "Safety Check", "Decision Report"];

const REPORT_SECTIONS = [
  {
    icon: TrendingUp,
    title: "Market Analysis Summary",
    description: "Price trends, locality comparison, and investment potential score for your shortlisted properties."
  },
  {
    icon: AlertTriangle,
    title: "Risk Assessment",
    description: "Comprehensive risk profile including legal status, documentation gaps, and potential red flags."
  },
  {
    icon: Shield,
    title: "Verification Status",
    description: "Results of all safety checks including document verification, legal search, and physical inspection."
  },
  {
    icon: Target,
    title: "Final Recommendation",
    description: "Clear go/no-go recommendation with supporting rationale and suggested next steps."
  }
];

const LEARNING_SUMMARY = [
  { step: 1, title: "Market Intelligence", lesson: "You learned to analyze price trends and compare localities" },
  { step: 2, title: "Risk Filtering", lesson: "You identified and eliminated high-risk properties" },
  { step: 3, title: "Safety Verification", lesson: "You verified legal status and documentation" },
  { step: 4, title: "Decision Making", lesson: "You're ready to make an informed investment decision" }
];

const NEXT_ACTIONS = [
  { icon: Download, title: "Download Full Report", description: "Get PDF with all findings", primary: true },
  { icon: Calendar, title: "Schedule Site Visit", description: "Book guided property tour", primary: false },
  { icon: Phone, title: "Talk to Expert", description: "Free 15-min consultation", primary: false }
];

export default function Step4DecisionReport() {
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
          currentPage="Step 4: Decision Report"
        />

        <ProgressBar
          currentStep={4}
          stepNames={STEP_NAMES}
          onStepClick={handleStepClick}
        />

        <StepHeader
          stepNumber={4}
          totalSteps={4}
          stepTitle="Decision Report"
          description="Generate your comprehensive investment decision report with all findings, analysis, and recommendations."
          previousStep={{ title: "Safety Check", link: "/step-3-safety-check" }}
        />

        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-12">
          <section 
            className="bg-gradient-to-br from-[#2180a8]/10 to-[#208a4a]/10 dark:from-[#2180a8]/20 dark:to-[#208a4a]/20 rounded-2xl p-8 text-center"
            data-testid="section-celebration"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#208a4a] text-white mb-4">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Congratulations! You've Completed All Steps
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
              You're now equipped with the knowledge and tools to make a confident, informed real estate investment decision. Most buyers skip these steps - you didn't.
            </p>
            <div className="flex items-center justify-center gap-2 text-[#208a4a] dark:text-green-400">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">You're in the top 10% of informed buyers</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </section>

          <section data-testid="section-journey-summary">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Your Learning Journey
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {LEARNING_SUMMARY.map((item) => (
                <Card 
                  key={item.step} 
                  className="border-slate-200 dark:border-slate-700"
                  data-testid={`journey-step-${item.step}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#208a4a] text-white flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#2180a8] dark:text-blue-400 mb-1">
                          Step {item.step}
                        </p>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {item.lesson}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section data-testid="section-report-contents">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              What's in Your Decision Report
            </h2>
            <div className="space-y-4">
              {REPORT_SECTIONS.map((section, index) => (
                <Card 
                  key={section.title} 
                  className="border-slate-200 dark:border-slate-700"
                  data-testid={`report-section-${index + 1}`}
                >
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2180a8]/10 dark:bg-blue-500/20 flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-[#2180a8] dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {section.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section data-testid="section-next-actions">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Suggested Next Actions
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {NEXT_ACTIONS.map((action, index) => (
                <Card 
                  key={action.title} 
                  className={`border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer ${
                    action.primary ? "ring-2 ring-[#2180a8] dark:ring-blue-500" : ""
                  }`}
                  data-testid={`action-card-${index + 1}`}
                >
                  <CardContent className="p-6 text-center">
                    {action.primary && (
                      <Badge className="mb-3 bg-[#2180a8] text-white">Recommended</Badge>
                    )}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                      action.primary 
                        ? "bg-[#2180a8] text-white" 
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {action.description}
                    </p>
                    <Button 
                      variant={action.primary ? "default" : "outline"}
                      className={action.primary ? "bg-[#2180a8] hover:bg-[#1a6a8a] w-full" : "w-full"}
                    >
                      {action.primary ? "Download Now" : "Learn More"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section 
            className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8"
            data-testid="section-final-cta"
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Need Expert Guidance?
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Our team of real estate experts can help you with verification, negotiation, and purchase
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#208a4a] hover:bg-[#1a7a3a] text-white"
                data-testid="button-schedule-consultation"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Free Consultation
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/step-1-market-intel")}
                  data-testid="button-restart"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Start Over
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
