import { Link, useLocation } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StepHeader } from "@/components/ui/step-header";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { fill } from "@/lib/i18n/site";
import { AREA_RATES, CONTEXT, SNAPSHOT_CHECKED_ON } from "@/lib/market-snapshot";
import { STEPS } from "@/lib/step-navigation";
import {
  TrendingUp, MapPin, BarChart3, IndianRupee, Building2,
  ArrowRight
} from "lucide-react";

const LEARN_ICONS = [TrendingUp, MapPin, BarChart3, IndianRupee, Building2];

// One optional link per card, in the same order as the wording in site.ts.
const LEARN_LINKS: ({ href: string; kind: "anchor" | "page" | "external"; testId: string } | null)[] = [
  { href: "#market-snapshot", kind: "anchor", testId: "link-learn-snapshot" },
  { href: "/localities", kind: "page", testId: "link-explore-locality" },
  null,
  { href: "https://igrmaharashtra.gov.in", kind: "external", testId: "link-learn-igr" },
  null,
];

export default function Step1MarketIntel() {
  const [, navigate] = useLocation();
  const { language, t } = useI18n();
  const s = t.step1;
  const locale = `${language}-IN`;
  const formatDay = (iso: string) => new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });
  const formatMonth = (month: string) => new Date(`${month}-01`).toLocaleDateString(locale, { month: "short", year: "numeric" });

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
            <p className="mt-5 max-w-2xl rounded-lg border-l-4 border-accent bg-background dark:bg-slate-800/50 p-4 leading-relaxed text-slate-700 dark:text-slate-300" role="note" data-testid="figures-note">
              {s.why2}
            </p>
          </section>

          <section data-testid="section-topics">
            <h2 className="text-2xl text-primary dark:text-white mb-2">{s.thingsTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{s.thingsIntro}</p>
            <div className="space-y-4">
              {s.learn.map((item, index) => {
                const Icon = LEARN_ICONS[index];
                const link = LEARN_LINKS[index];
                return (
                  <div key={item.title} className="flex gap-4 rounded-xl border border-slate-200 dark:border-slate-700 p-5" data-testid={`learn-card-${index + 1}`}>
                    <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/5 dark:bg-blue-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent-strong dark:text-blue-400" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
                      {link && item.linkLabel && (
                        link.kind === "page" ? (
                          <Link href={link.href} className="inline-block mt-3 text-sm font-semibold text-primary hover:underline" data-testid={link.testId}>
                            {item.linkLabel}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="inline-block mt-3 text-sm font-semibold text-primary hover:underline"
                            data-testid={link.testId}
                            {...(link.kind === "external" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {item.linkLabel}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="market-snapshot" className="scroll-mt-24" data-testid="section-market-snapshot">
            <h2 className="text-2xl text-primary dark:text-white mb-2">{s.snapshotTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{s.snapshotIntro}</p>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <th scope="col" className="p-2 sm:p-3 font-semibold">{s.colArea}</th>
                    <th scope="col" className="p-2 sm:p-3 font-semibold">{s.colRate}</th>
                    <th scope="col" className="p-2 sm:p-3 font-semibold">{s.colChange}</th>
                    <th scope="col" className="hidden sm:table-cell p-3 font-semibold">{s.colAsOf}</th>
                    <th scope="col" className="p-2 sm:p-3 font-semibold">{s.colSource}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {AREA_RATES.map((row) => (
                    <tr key={row.id} data-testid={`snapshot-row-${row.id}`}>
                      <th scope="row" className="p-2 sm:p-3 font-semibold text-slate-900 dark:text-white">{row.area[language]}</th>
                      {row.rate && row.asOf && row.url ? (
                        <>
                          <td className="p-2 sm:p-3 text-slate-700 dark:text-slate-300">
                            ₹{row.rate.toLocaleString("en-IN")}
                            <span className="block text-xs text-slate-500 dark:text-slate-400 sm:hidden">{formatMonth(row.asOf)}</span>
                          </td>
                          <td className="p-2 sm:p-3 text-slate-700 dark:text-slate-300">
                            {row.change}
                            {row.changeNote && <span className="block text-xs text-slate-500 dark:text-slate-400">{row.changeNote[language]}</span>}
                          </td>
                          <td className="hidden sm:table-cell p-3 whitespace-nowrap text-slate-700 dark:text-slate-300">{formatMonth(row.asOf)}</td>
                          <td className="p-2 sm:p-3">
                            <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-primary underline" data-testid={`snapshot-source-${row.id}`}>
                              {row.source}
                            </a>
                          </td>
                        </>
                      ) : (
                        <td colSpan={4} className="p-2 sm:p-3 text-slate-500 dark:text-slate-400">{s.noFigure}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6" data-testid="snapshot-context">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">{s.contextTitle}</h3>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                {CONTEXT.map((fact) => (
                  <li key={fact.id}>
                    {fact.text[language]}{" "}
                    <span className="text-slate-500 dark:text-slate-400">
                      (<a href={fact.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{fact.source}</a>, {formatDay(fact.date)})
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400" data-testid="snapshot-checked">
                {fill(s.checkedOn, { date: formatDay(SNAPSHOT_CHECKED_ON) })}
              </p>
            </div>
          </section>

          <section
            className="bg-background dark:bg-slate-800/50 border border-border rounded-xl p-6 sm:p-8"
            data-testid="section-cta"
          >
            <h2 className="text-xl sm:text-2xl text-primary dark:text-white mb-2">{s.ctaTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{s.ctaBody}</p>

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
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate(STEPS[2].link)} data-testid="button-jump-safety">
                {s.jumpCheck}
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
