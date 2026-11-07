import { Link, useLocation } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StepHeader } from "@/components/ui/step-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SCREENING_IDS, useBuyerDraft, type ScreeningAnswer } from "@/lib/buyer-draft";
import { useTranslation } from "@/lib/i18n/context";
import { fill } from "@/lib/i18n/site";
import { STEPS } from "@/lib/step-navigation";

const ANSWERS: ScreeningAnswer[] = ["yes", "no", "not_sure"];

export default function Step2FilterRisky() {
  const [, navigate] = useLocation();
  const t = useTranslation();
  const s = t.step2;
  const { draft, updateDraft } = useBuyerDraft();

  const answeredCount = Object.keys(draft.screening).length;

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <SimpleBreadcrumb
          steps={[
            { label: t.common.home, link: "/" },
            { label: t.common.fourStep, link: "/4-step-system" }
          ]}
          currentPage={`${fill(t.common.stepLabel, { step: 2 })}: ${t.steps[1].title}`}
        />

        <ProgressBar currentStep={2} />

        <StepHeader
          stepNumber={2}
          description={s.description}
        />

        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
          <section data-testid="section-screening">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl text-primary dark:text-white">{s.formTitle}</h2>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 shrink-0" role="status" data-testid="screening-count">
                {fill(s.answered, { count: answeredCount, total: SCREENING_IDS.length })}
              </span>
            </div>
            <div className="space-y-4">
              {SCREENING_IDS.map((id, index) => (
                <Card key={id} className="border-slate-200 dark:border-slate-700 shadow-none">
                  <CardContent className="p-5">
                    <fieldset data-testid={`screening-${id}`}>
                      <legend className="font-semibold text-slate-900 dark:text-white mb-3">
                        {index + 1}. {s.questions[id].question}
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {ANSWERS.map((answer) => {
                          const selected = draft.screening[id] === answer;
                          return (
                            <label
                              key={answer}
                              className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${
                                selected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                              }`}
                            >
                              <input
                                type="radio"
                                className="sr-only"
                                name={id}
                                data-answer={answer}
                                checked={selected}
                                onChange={() => updateDraft({ screening: { ...draft.screening, [id]: answer } })}
                              />
                              {s.answers[answer]}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" role="note" data-testid="screening-note">
              {s.note}
            </p>
          </section>

          <section className="flex flex-col sm:flex-row items-center gap-4" data-testid="section-cta">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate(STEPS[2].link)}
              data-testid="button-next-step"
            >
              {fill(t.common.continueTo, { step: 3 })}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Link href="/contact" className="text-sm font-medium text-slate-600 dark:text-slate-400 underline" data-testid="link-get-help">
              {t.common.getHelp}
            </Link>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
