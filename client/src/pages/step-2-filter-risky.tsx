import { useState } from "react";
import { Link, useLocation } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StepHeader } from "@/components/ui/step-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, ArrowRight, FileText, MapPin, Scale, Shield } from "lucide-react";
import { SCREENING_IDS, useBuyerDraft, type ScreeningAnswer } from "@/lib/buyer-draft";
import { useTranslation } from "@/lib/i18n/context";
import { fill } from "@/lib/i18n/site";
import { STEPS } from "@/lib/step-navigation";

const ANSWERS: ScreeningAnswer[] = ["yes", "no", "not_sure"];
const CRITERIA_ICONS = [FileText, Scale, MapPin, Shield, AlertTriangle];

export default function Step2FilterRisky() {
  const [, navigate] = useLocation();
  const t = useTranslation();
  const s = t.step2;
  const { draft, updateDraft } = useBuyerDraft();

  const answeredCount = Object.keys(draft.screening).length;
  // Kept on this page only, as before; the five questions above are what Step 4 uses.
  const [ticked, setTicked] = useState<boolean[]>(() => s.ticks.map(() => false));
  const tickedCount = ticked.filter(Boolean).length;

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
          <section data-testid="section-why-filtering">
            <h2 className="text-2xl sm:text-3xl text-primary dark:text-white mb-4">{s.whyTitle}</h2>
            <div className="max-w-2xl space-y-3 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {s.why.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section data-testid="section-filtering-criteria">
            <h2 className="text-2xl text-primary dark:text-white mb-6">{s.criteriaTitle}</h2>
            <div className="space-y-4">
              {s.criteria.map((criterion, index) => {
                const Icon = CRITERIA_ICONS[index];
                return (
                  <Card key={criterion.title} className="border-slate-200 dark:border-slate-700 shadow-none" data-testid={`criteria-card-${index + 1}`}>
                    <CardContent className="p-5 flex gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/5 dark:bg-blue-500/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent-strong dark:text-blue-400" />
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-900 dark:text-white mb-1">{index + 1}. {criterion.title}</span>
                        <span className="block text-sm text-slate-600 dark:text-slate-400">{criterion.body}</span>
                      </span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

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

          <section data-testid="section-checklist">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h2 className="text-2xl text-primary dark:text-white">{s.tickTitle}</h2>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 shrink-0" role="status" data-testid="tick-count">
                {fill(s.tickCount, { done: tickedCount, total: s.ticks.length })}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{s.tickIntro}</p>
            <Card className="border-slate-200 dark:border-slate-700 shadow-none">
              <CardContent className="p-4 grid gap-2 sm:grid-cols-2">
                {s.ticks.map((label, index) => (
                  <label key={label} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" data-testid={`checklist-item-${index + 1}`}>
                    <Checkbox
                      checked={ticked[index]}
                      onCheckedChange={(value) => setTicked((prev) => prev.map((item, i) => (i === index ? value === true : item)))}
                      className="mt-0.5"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                  </label>
                ))}
              </CardContent>
            </Card>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400" role="note">{s.tickNote}</p>
          </section>

          <section className="bg-background dark:bg-slate-800/50 border border-border rounded-xl p-6 sm:p-8" data-testid="section-cta">
            <h2 className="text-xl sm:text-2xl text-primary dark:text-white mb-2">{s.ctaTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-5">{s.ctaBody}</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate(STEPS[2].link)}
              data-testid="button-next-step"
            >
              {fill(t.common.continueTo, { step: 3 })}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate(STEPS[3].link)} data-testid="button-jump-report">
              {s.jumpSummary}
            </Button>
            <Link href="/contact" className="text-sm font-medium text-slate-600 dark:text-slate-400 underline" data-testid="link-get-help">
              {t.common.getHelp}
            </Link>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
