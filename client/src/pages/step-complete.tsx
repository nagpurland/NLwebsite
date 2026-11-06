import { useLocation } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { resetProgress, STEPS } from "@/lib/step-navigation";
import { 
  Trophy, Download, Calendar, Phone, Star, Sparkles,
  CheckCircle2, ArrowRight, RotateCcw, Home
} from "lucide-react";

export default function StepComplete() {
  const [, navigate] = useLocation();

  const handleStartOver = () => {
    resetProgress();
    navigate("/4-step-system");
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <SimpleBreadcrumb
          steps={[
            { label: "Home", link: "/" },
            { label: "4-Step System", link: "/4-step-system" }
          ]}
          currentPage="Journey Complete"
        />

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="text-center mb-12" data-testid="section-hero">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#208a4a] to-[#2180a8] text-white mb-6">
              <Trophy className="w-12 h-12" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-sm">
                Journey Complete
              </Badge>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Congratulations!
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              You've completed the entire 4-Step Safe Investment System. You're now equipped with the knowledge and tools to make confident real estate decisions.
            </p>
          </section>

          <section className="mb-12" data-testid="section-summary">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              What You've Accomplished
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {STEPS.map((step) => (
                <Card 
                  key={step.number}
                  className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10"
                  data-testid={`complete-step-${step.number}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#208a4a] text-white flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#208a4a] dark:text-green-400 mb-1">
                          Step {step.number} - Completed
                        </p>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12" data-testid="section-next-actions">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              Recommended Next Actions
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <Card className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#2180a8] text-white mb-4">
                    <Download className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Download Report
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Get a PDF summary of your journey and key learnings
                  </p>
                  <Button className="w-full bg-[#2180a8] hover:bg-[#1a6a8a]">
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-4">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Schedule Visit
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Book a guided tour of your shortlisted properties
                  </p>
                  <Button variant="outline" className="w-full">
                    Book Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-4">
                    <Phone className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Talk to Expert
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Get personalized advice from our real estate experts
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section 
            className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 text-center"
            data-testid="section-rating"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              How was your experience?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Your feedback helps us improve the system for future buyers
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="p-1 hover:scale-110 transition-transform"
                  data-testid={`star-${star}`}
                >
                  <Star className="w-8 h-8 text-slate-300 hover:text-yellow-500 hover:fill-yellow-500 transition-colors" />
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button
                variant="outline"
                onClick={handleStartOver}
                data-testid="button-start-over"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                data-testid="button-go-home"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
