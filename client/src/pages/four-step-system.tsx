import { useLocation } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  STEPS, getProgress, getResumeLink, getProgressPercentage, resetProgress 
} from "@/lib/step-navigation";
import { 
  TrendingUp, Filter, Shield, FileText, ArrowRight, 
  CheckCircle2, Play, RotateCcw
} from "lucide-react";

const STEP_ICONS = [TrendingUp, Filter, Shield, FileText];

export default function FourStepSystem() {
  const [, navigate] = useLocation();
  const progress = getProgress();
  const progressPercent = getProgressPercentage();
  const hasProgress = progress.completedSteps.length > 0;

  const handleStartOrResume = () => {
    navigate(getResumeLink());
  };

  const handleReset = () => {
    resetProgress();
    window.location.reload();
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <SimpleBreadcrumb
          steps={[{ label: "Home", link: "/" }]}
          currentPage="4-Step Investment System"
        />

        <div className="bg-gradient-to-br from-[#2180a8]/10 to-[#208a4a]/10 dark:from-[#2180a8]/20 dark:to-[#208a4a]/20 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Badge className="bg-[#2180a8]/20 text-[#2180a8] dark:text-blue-400 border-[#2180a8]/30 mb-4">
              Proven System
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
              The 4-Step Safe Investment System
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              A systematic approach to making informed, risk-free real estate investment decisions in Nagpur. Follow each step to protect your investment.
            </p>

            {hasProgress && (
              <div className="max-w-md mx-auto mb-8">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-600 dark:text-slate-400">Your Progress</span>
                  <span className="font-semibold text-[#2180a8]">{Math.round(progressPercent)}% Complete</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#2180a8] hover:bg-[#1a6a8a] text-white"
                onClick={handleStartOrResume}
                data-testid="button-start-resume"
              >
                <Play className="w-4 h-4 mr-2" />
                {hasProgress ? "Resume Your Journey" : "Start Step 1"}
              </Button>
              {hasProgress && (
                <Button
                  variant="outline"
                  onClick={handleReset}
                  data-testid="button-reset"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            The Four Steps
          </h2>

          <div className="space-y-6">
            {STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index];
              const isCompleted = progress.completedSteps.includes(step.number);
              const isCurrent = progress.currentStep === step.number && !isCompleted;

              return (
                <Card 
                  key={step.number}
                  className={`border-slate-200 dark:border-slate-700 transition-all hover:shadow-lg cursor-pointer ${
                    isCompleted ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800" : ""
                  } ${isCurrent ? "ring-2 ring-[#2180a8]" : ""}`}
                  onClick={() => navigate(step.link)}
                  data-testid={`step-card-${step.number}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-5">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                        isCompleted 
                          ? "bg-[#208a4a] text-white" 
                          : isCurrent
                            ? "bg-[#2180a8] text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-7 h-7" />
                        ) : (
                          <Icon className="w-7 h-7" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-[#2180a8] dark:text-blue-400">
                            Step {step.number}
                          </span>
                          {isCompleted && (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              Completed
                            </Badge>
                          )}
                          {isCurrent && (
                            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              In Progress
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {step.description}
                        </p>
                      </div>

                      <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-4" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Your progress is automatically saved. You can resume anytime.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
