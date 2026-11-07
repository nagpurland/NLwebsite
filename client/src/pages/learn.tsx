import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useI18n } from "@/lib/i18n/context";
import { fill } from "@/lib/i18n/site";
import { LAND_WORDS, SELLER_CLAIMS } from "@/lib/learn-content";
import { STEPS } from "@/lib/step-navigation";
import { ALL_CHECKS } from "@/pages/step-3-safety-check";

const CATEGORIES = ["documents", "legal", "physical"] as const;

function Source({ label, url, date }: { label: string; url: string; date: string }) {
  const { t } = useI18n();
  return (
    <p className="text-xs text-slate-500 mt-3">
      {t.learn.source}:{" "}
      <a href={url} target="_blank" rel="noopener noreferrer" className="underline">{label}</a>
      {" · "}
      {fill(t.learn.lastChecked, { date })}
    </p>
  );
}

export default function Learn() {
  const { language, t } = useI18n();
  const s = t.learn;

  return (
    <PublicLayout>
      <div className="py-12 md:py-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl text-primary mb-4">{s.title}</h1>
          <p className="text-slate-600 text-lg mb-10">{s.intro}</p>

          {SELLER_CLAIMS.length > 0 && (
            <section className="mb-12" data-testid="learn-seller-claims">
              <h2 className="text-2xl text-primary mb-4">{s.sellerTitle}</h2>
              <div className="space-y-4">
                {SELLER_CLAIMS.map((item) => (
                  <article key={item.id} id={item.id} className="rounded-xl border bg-card p-5">
                    <h3 className="text-lg font-semibold text-primary mb-3">"{item.claim[language]}"</h3>
                    <dl className="space-y-2 text-sm text-slate-700">
                      <div><dt className="font-semibold inline">{s.why}: </dt><dd className="inline">{item.why[language]}</dd></div>
                      <div><dt className="font-semibold inline">{s.ask}: </dt><dd className="inline">{item.ask[language]}</dd></div>
                      <div><dt className="font-semibold inline">{s.paper}: </dt><dd className="inline">{item.paper[language]}</dd></div>
                    </dl>
                    <Source label={item.sourceLabel} url={item.sourceUrl} date={item.lastChecked} />
                  </article>
                ))}
              </div>
            </section>
          )}

          {LAND_WORDS.length > 0 && (
            <section className="mb-12" data-testid="learn-land-words">
              <h2 className="text-2xl text-primary mb-4">{s.wordsTitle}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {LAND_WORDS.map((item) => (
                  <article key={item.id} id={item.id} className="rounded-xl border bg-card p-5">
                    <h3 className="text-lg font-semibold text-primary mb-2">{item.word[language]}</h3>
                    <p className="text-sm text-slate-700">{item.meaning[language]}</p>
                    <Source label={item.sourceLabel} url={item.sourceUrl} date={item.lastChecked} />
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="mb-12" data-testid="learn-guides">
            <h2 className="text-2xl text-primary mb-2">{s.checksTitle}</h2>
            <p className="text-sm text-slate-600 mb-1">{s.checksNote}</p>
            {language !== "en" && <p className="text-sm text-slate-600 mb-2" data-testid="learn-guides-note">{s.guidesNote}</p>}
            {CATEGORIES.map((category) => (
              <div key={category} className="mt-6">
                <h3 className="text-sm font-semibold tracking-wide text-slate-500 mb-3">{t.step3.categories[category]}</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {ALL_CHECKS.filter((check) => check.category === category).map((check) => (
                    <li key={check.id}>
                      <Link
                        href={`/guide/${check.blogSlug}`}
                        className="flex h-full items-center justify-between gap-3 rounded-xl border bg-card p-4 text-sm font-medium text-primary hover:border-primary"
                        data-testid={`learn-guide-${check.id}`}
                      >
                        {t.checks[check.id - 1].title}
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="rounded-xl bg-primary/5 p-6" data-testid="learn-help">
            <h2 className="text-2xl text-primary mb-2">{s.helpTitle}</h2>
            <p className="text-slate-600 mb-4">{s.helpBody}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={STEPS[2].link}><Button className="w-full sm:w-auto">{s.checklist}</Button></Link>
              <Link href="/contact"><Button variant="outline" className="w-full sm:w-auto" data-testid="learn-book">{s.book}</Button></Link>
            </div>
            <p className="text-sm text-slate-600 mt-5" data-testid="learn-trust">{s.trust}</p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
