import { useLocation } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { hasAnswers, nextOpenStep, useBuyerDraft } from "@/lib/buyer-draft";
import { useTranslation } from "@/lib/i18n/context";
import { fill } from "@/lib/i18n/site";
import { STEPS } from "@/lib/step-navigation";
import { ClipboardCheck, ClipboardList, FileText, MapPin, ArrowRight, Play } from "lucide-react";

const STEP_ICONS = [MapPin, ClipboardList, ClipboardCheck, FileText];

export default function FourStepSystem() {
  const [, navigate] = useLocation();
  const t = useTranslation();
  const s = t.fourStep;
  const { draft } = useBuyerDraft();
  const started = hasAnswers(draft);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <SimpleBreadcrumb
          steps={[{ label: t.common.home, link: "/" }]}
          currentPage={t.common.fourStep}
        />

        <div className="bg-primary py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Badge className="bg-white/10 text-accent hover:bg-white/10 shadow-none mb-4">{s.badge}</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">{s.title}</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">{s.intro}</p>

            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => navigate(STEPS[nextOpenStep(draft) - 1].link)}
              data-testid="button-start-resume"
            >
              <Play className="w-4 h-4 mr-2" />
              {started ? s.resume : s.start}
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl text-primary dark:text-white mb-8 text-center">{s.stepsTitle}</h2>

          <div className="space-y-4">
            {STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index];

              return (
                <Card
                  key={step.number}
                  className="border-border shadow-none transition-all hover:border-primary/30 cursor-pointer"
                  onClick={() => navigate(step.link)}
                  data-testid={`step-card-${step.number}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-primary/5 text-accent-strong">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1">
                        <div className="text-sm font-medium text-accent-strong dark:text-blue-400 mb-1">
                          {fill(t.common.stepLabel, { step: step.number })}
                        </div>
                        <h3 className="text-xl text-primary dark:text-white mb-2">{t.steps[index].title}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{t.steps[index].description}</p>
                      </div>

                      <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-4" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">{s.note}</p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
