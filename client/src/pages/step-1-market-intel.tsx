import { Link, useLocation } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StepHeader } from "@/components/ui/step-header";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlotCostCalculator } from "@/components/tools/PlotCostCalculator";
import { useTranslation } from "@/lib/i18n/context";
import { fill } from "@/lib/i18n/site";
import { STEPS } from "@/lib/step-navigation";
import {
  TrendingUp, MapPin, IndianRupee, Building2, Search,
  ArrowRight, Check
} from "lucide-react";

const PRICE_CHECKS = [
  { id: "similar", testId: "similar", icon: TrendingUp },
  { id: "realCost", testId: "real-cost", icon: IndianRupee },
  { id: "location", testId: "location", icon: MapPin },
  { id: "claims", testId: "claims", icon: Search },
  { id: "development", testId: "development", icon: Building2 },
] as const;

export default function Step1MarketIntel() {
  const [, navigate] = useLocation();
  const t = useTranslation();
  const s = t.step1;

  return (
    <PublicLayout>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <SimpleBreadcrumb
          steps={[
            { label: t.common.home, link: "/" },
            { label: t.common.fourStep, link: "/4-step-system" }
          ]}
          currentPage={`${fill(t.common.stepLabel, { step: 1 })}: ${t.steps[0].title}`}
        />

        <ProgressBar currentStep={1} />

        <StepHeader
          stepNumber={1}
          description={s.description}
        />

        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-12">
          <section data-testid="section-intro">
            <h2 className="text-2xl sm:text-3xl text-primary dark:text-white mb-4">{s.whyTitle}</h2>
            <div className="max-w-2xl space-y-3 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              <p>{s.why1}</p>
              <p>{s.why1b}</p>
            </div>
            <p className="mt-5 max-w-2xl rounded-lg border-l-4 border-accent bg-background dark:bg-slate-800/50 p-4 leading-relaxed text-slate-700 dark:text-slate-300" role="note" data-testid="no-figures-note">
              {s.why2}
            </p>
          </section>

          <section data-testid="section-topics">
            <h2 className="text-2xl text-primary dark:text-white mb-2">{s.thingsTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{s.thingsIntro}</p>
            <Accordion type="multiple" className="space-y-4">
              {PRICE_CHECKS.map((check) => {
                const topic = s.topics[check.id];
                return (
                  <AccordionItem
                    key={check.id}
                    value={check.id}
                    className="border rounded-xl border-slate-200 dark:border-slate-700 px-5"
                    data-testid={`topic-card-${check.testId}`}
                  >
                    <AccordionTrigger className="hover:no-underline text-left py-5">
                      <span className="flex gap-4">
                        <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/5 dark:bg-blue-500/20 flex items-center justify-center">
                          <check.icon className="w-5 h-5 text-accent-strong dark:text-blue-400" />
                        </span>
                        <span>
                          <span className="block font-semibold text-slate-900 dark:text-white mb-1">{topic.title}</span>
                          <span className="block text-sm font-normal text-slate-600 dark:text-slate-400">{topic.question}</span>
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        {topic.points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                      {check.id === "realCost" && <PlotCostCalculator />}
                      {check.id === "location" && (
                        <Link href="/localities" className="inline-block mt-4 text-sm font-semibold text-primary hover:underline" data-testid="link-explore-locality">
                          {s.explore}
                        </Link>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>

          <section data-testid="section-comparison-guide">
            <h2 className="text-2xl text-primary dark:text-white mb-6">{s.guideTitle}</h2>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700">
              {s.guide.map((row) => (
                <div key={row.compare} className="grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-4 p-4 text-sm">
                  <div className="font-semibold text-slate-900 dark:text-white">{row.compare}</div>
                  <div className="text-slate-600 dark:text-slate-400">{row.examine}</div>
                </div>
              ))}
            </div>
          </section>

          <section
            className="bg-background dark:bg-slate-800/50 border border-border rounded-xl p-6 sm:p-8"
            data-testid="section-cta"
          >
            <h2 className="text-xl sm:text-2xl text-primary dark:text-white mb-4">{s.remindersTitle}</h2>
            <ul className="space-y-3 mb-6">
              {s.reminders.map((reminder) => (
                <li key={reminder} className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 mt-0.5 shrink-0 text-accent-strong" />
                  {reminder}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => navigate(STEPS[1].link)}
                data-testid="button-next-step"
              >
                {fill(t.common.continueTo, { step: 2 })}
                <ArrowRight className="w-4 h-4 ml-2" />
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
