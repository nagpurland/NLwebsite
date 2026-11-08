import { FORMS_ON } from "@/lib/features";
import { Link, useLocation } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StepHeader } from "@/components/ui/step-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ALL_CHECKS } from "@/pages/step-3-safety-check";
import { ArrowRight, CheckCircle2, Circle, Printer, Scale, Trash2 } from "lucide-react";
import { SCREENING_IDS, screeningFollowUpIds, useBuyerDraft } from "@/lib/buyer-draft";
import { useTranslation } from "@/lib/i18n/context";
import { fill } from "@/lib/i18n/site";
import { STEPS } from "@/lib/step-navigation";

export default function Step4DecisionReport() {
  const [, navigate] = useLocation();
  const t = useTranslation();
  const s = t.step4;
  const { draft, resetDraft } = useBuyerDraft();

  const pending = ALL_CHECKS.filter((check) => !draft.checks.includes(check.id));
  const done = ALL_CHECKS.filter((check) => draft.checks.includes(check.id));
  const unanswered = SCREENING_IDS.filter((id) => !draft.screening[id]).length;
  const advocateQuestions = [
    ...screeningFollowUpIds(draft).map((id) => t.step2.questions[id].followUp),
    ...pending.map((check) => fill(s.openQuestion, { check: t.checks[check.id - 1].title })),
  ];

  const handleReset = () => {
    if (window.confirm(s.resetConfirm)) {
      resetDraft();
      navigate(STEPS[0].link);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <div className="print:hidden">
          <SimpleBreadcrumb
            steps={[
              { label: t.common.home, link: "/" },
              { label: t.common.fourStep, link: "/4-step-system" }
            ]}
            currentPage={`${fill(t.common.stepLabel, { step: 4 })}: ${t.steps[3].title}`}
          />

          <ProgressBar currentStep={4} />

          <StepHeader
            stepNumber={4}
            description={s.description}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10">
          <h1 className="hidden print:block text-2xl text-slate-900">{fill(s.printTitle, { title: t.steps[3].title })}</h1>

          <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900" role="note" data-testid="self-reported-notice">
            {s.notice}
          </p>

          <section data-testid="section-prescreen">
            <h2 className="text-2xl text-primary dark:text-white mb-4">
              {s.answersTitle} {unanswered > 0 && <span className="font-sans text-base font-medium text-amber-700">{fill(s.unanswered, { count: unanswered })}</span>}
            </h2>
            <dl className="rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700 text-sm">
              {SCREENING_IDS.map((id) => {
                const answer = draft.screening[id];
                return (
                  <div key={id} className="grid sm:grid-cols-[1fr_120px] gap-1 sm:gap-4 p-3" data-testid={`summary-${id}`}>
                    <dt className="text-slate-600 dark:text-slate-400">{t.step2.questions[id].question}</dt>
                    <dd className={answer ? "font-semibold text-slate-900 dark:text-white" : "text-slate-400"}>
                      {answer ? t.step2.answers[answer] : s.notAnswered}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>

          <section data-testid="section-summary">
            <h2 className="text-2xl text-primary dark:text-white mb-4">
              {fill(s.checklistTitle, { done: done.length, total: ALL_CHECKS.length })}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="border-slate-200 dark:border-slate-700 shadow-none">
                <CardContent className="p-5">
                  <h3 className="font-sans font-semibold text-slate-900 dark:text-white mb-4">{fill(s.open, { count: pending.length })}</h3>
                  <ul className="space-y-3" data-testid="list-pending">
                    {pending.map((check) => (
                      <li key={check.id} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <Circle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                        {t.checks[check.id - 1].title}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-slate-200 dark:border-slate-700 shadow-none">
                <CardContent className="p-5">
                  <h3 className="font-sans font-semibold text-slate-900 dark:text-white mb-4">{fill(s.marked, { count: done.length })}</h3>
                  <ul className="space-y-3" data-testid="list-done">
                    {done.map((check) => (
                      <li key={check.id} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
                        {t.checks[check.id - 1].title}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section data-testid="section-advocate-questions">
            <h2 className="text-2xl text-primary dark:text-white mb-4">{s.questionsTitle}</h2>
            {advocateQuestions.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {advocateQuestions.map((question) => <li key={question}>{question}</li>)}
              </ul>
            ) : (
              <p className="text-sm text-slate-700 dark:text-slate-300">{s.noOpen}</p>
            )}
          </section>

          <section className="flex gap-4 bg-primary/5 border border-border rounded-xl p-6 text-primary" data-testid="section-advocate">
            <Scale className="w-6 h-6 shrink-0 text-accent-strong" />
            <div>
              <h2 className="text-lg mb-1">{s.nextTitle}</h2>
              <p className="text-sm text-slate-700">{s.nextBody}</p>
              <p className="text-sm text-slate-700 mt-2 print:hidden" data-testid="inquiry-option">
                {s.inquiryLead}{" "}
                <Link href={FORMS_ON ? "/plot-checkup" : "/contact"} className="font-semibold underline text-primary" data-testid="link-inquiry">{FORMS_ON ? s.inquiryLink : s.inquiryLinkPaused}</Link>.{" "}
                {s.inquiryNote}
              </p>
            </div>
          </section>

          <section className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 print:hidden" data-testid="section-final-cta">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => window.print()} data-testid="button-print-summary">
              <Printer className="w-4 h-4 mr-2" />
              {s.print}
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate(STEPS[2].link)} data-testid="button-back-checklist">
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              {s.back}
            </Button>
            <Button variant="ghost" className="w-full sm:w-auto whitespace-normal h-auto py-2" onClick={handleReset} data-testid="button-reset-draft">
              <Trash2 className="w-4 h-4 mr-2 shrink-0" />
              {s.reset}
            </Button>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
