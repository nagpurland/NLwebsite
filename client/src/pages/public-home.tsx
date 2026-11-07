import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Plus, X } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n/context";
import { track } from "@/lib/track";
import { STEPS } from "@/lib/step-navigation";

// The cards and icons are drawn on hero-land.webp. Each button sits on a card, and its text covers the drawn words,
// so the labels read in the buyer's language and open a short explanation.
const CALLOUTS = [
  { key: "ownership", guide: "/guide/ownership-verification" },
  { key: "landUse", guide: "/guide/na-conversion" },
  { key: "road", guide: "/guide/tp-scheme-check" },
  { key: "boundary", guide: "/guide/boundary-verification" },
] as const;

type CalloutKey = (typeof CALLOUTS)[number]["key"];

function HeroArt() {
  const t = useTranslation();
  const h = t.home;
  const [active, setActive] = useState<CalloutKey | null>(null);
  const selected = CALLOUTS.find((callout) => callout.key === active);

  return (
    <div className="hero-art-wrap">
      <div className="hero-art" data-testid="hero-art">
        <img src="/home/hero-land.webp" alt="" width={1148} height={780} />
        {CALLOUTS.map(({ key }) => (
          <button
            key={key}
            type="button"
            aria-expanded={active === key}
            aria-controls="land-topic-detail"
            onClick={() => {
              if (active !== key) track("callout_open");
              setActive(active === key ? null : key);
            }}
            className={`hero-callout hero-callout-${key}`}
            data-testid={`callout-${key}`}
          >
            <span>
              <strong>{h.callouts[key].title}</strong>
              <small>{h.callouts[key].note}</small>
            </span>
            <Plus className="hero-callout-plus" aria-hidden="true" />
          </button>
        ))}
        <div className="hero-land-label">
          {h.yourLand}
          <br />
          {h.example}
        </div>
      </div>

      <div id="land-topic-detail" aria-live="polite">
        {selected && (
          <div className="hero-detail" data-testid="callout-detail">
            <div>
              <p className="hero-detail-title">{h.callouts[selected.key].title}</p>
              <p>{h.callouts[selected.key].body}</p>
              <Link href={selected.guide} className="hero-detail-link" data-testid="callout-guide">
                {h.calloutGuide}
                <ArrowRight />
              </Link>
            </div>
            <button type="button" aria-label={h.calloutClose} onClick={() => setActive(null)}>
              <X />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// The 12 checks by group, in the same order as t.checks and the Step 3 page.
const CHECK_GROUPS = [
  { category: "documents", ids: [1, 2, 3, 4] },
  { category: "legal", ids: [5, 6, 7, 8] },
  { category: "physical", ids: [9, 10, 11, 12] },
] as const;

// The older bold home layout, with wording that makes no claims we can't source.
// Its colours and heading font are set on purpose: see ".old-home" in index.css.
export default function PublicHome() {
  const t = useTranslation();
  const h = t.home;

  return (
    <PublicLayout>
      <div className="old-home">
        {/* HERO: light, short and phone-first */}
        <section className="home-hero" data-testid="section-hero">
          <div className="home-hero-in">
            <div>
              <p className="home-hero-label" data-testid="hero-kicker">{h.heroLabel}</p>
              <h1>
                {h.titleLine1} <em>{h.titleLine2}</em>
              </h1>
              <p className="home-hero-sub">{h.heroSub}</p>
              <div className="home-hero-actions">
                <Link href={STEPS[0].link} className="home-hero-btn" data-testid="button-hero-guide" data-event="start_guide_click">
                  {h.heroPrimary}
                  <ArrowRight />
                </Link>
                <Link href={STEPS[2].link} className="home-hero-link" data-testid="link-hero-checklist" data-event="checklist_click">
                  {h.heroSecondary}
                </Link>
              </div>
              <ul className="home-hero-trust" data-testid="hero-trust">
                {h.trust.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <HeroArt />
          </div>
        </section>

        {/* THE THREE PROMISES */}
        <section className="bg-white border-b border-slate-200 py-8 md:py-10" data-testid="section-points">
          <div className="container mx-auto px-4 max-w-5xl grid gap-6 md:grid-cols-3 text-left">
            {h.points.map((point, index) => (
              <div key={point.title} className={index > 0 ? "md:border-l md:border-slate-200 md:pl-6" : ""}>
                <h3 className="font-black text-sm uppercase tracking-widest text-primary">{point.title}</h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{point.body}</p>
                {index === 0 && <p className="text-xs italic text-slate-500 mt-1">{h.pointQuote}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* THE 4-STEP SYSTEM */}
        <section className="py-12 md:py-20 bg-background" data-testid="section-steps">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-14">
              <Badge className="bg-primary/10 text-primary mb-4 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none hover:bg-primary/10">
                {h.stepsBadge}
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {h.stepsTitle1} <br /> <span className="text-accent-strong">{h.stepsTitle2}</span>
              </h2>
              <p className="text-slate-500 font-bold mt-5 text-lg md:text-xl max-w-2xl mx-auto">{h.stepsIntro}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 relative max-w-5xl mx-auto">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block z-0" />
              {STEPS.map((step, index) => (
                <Card key={step.number} className="relative z-10 p-4 md:p-8 border-none shadow-xl rounded-2xl md:rounded-[2.5rem] bg-white flex flex-col h-full group hover:shadow-2xl transition-all duration-500">
                  <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-primary text-white flex items-center justify-center font-black text-base md:text-xl mb-3 md:mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    0{step.number}
                  </div>
                  <h3 className="text-base md:text-xl font-black text-slate-900 mb-2 md:mb-3 leading-tight">{t.steps[index].title}</h3>
                  <p className="text-xs md:text-sm text-slate-500 font-medium mb-4 md:mb-8 leading-relaxed flex-1">{h.stepCards[index].desc}</p>
                  <Button asChild variant="outline" className="w-full h-11 rounded-xl font-bold text-xs group-hover:bg-primary group-hover:text-white transition-colors">
                    <Link href={step.link} data-testid={`home-step-${step.number}`} data-event="step_click">
                      {h.stepCards[index].button}
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center max-w-xl mx-auto">
              <div className="border-t border-slate-200 pt-8">
                <p className="text-slate-500 font-medium text-sm mb-3">{h.helpLine}</p>
                <p className="text-slate-500 text-sm">
                  {h.helpQuestion}{" "}
                  <Link href="/plot-checkup" className="text-primary font-bold hover:underline" data-testid="button-ask-question" data-event="ask_click">
                    {h.helpAsk}
                  </Link>{" "}
                  {h.helpOr}{" "}
                  <Link href="/contact" className="text-primary font-bold hover:underline" data-testid="button-book-consultation">
                    {h.helpBook}
                  </Link>
                </p>
                <p className="text-slate-500 text-xs mt-3" data-testid="home-fee-note">{h.feeNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* THE 12 CHECKS, in the buyer's language */}
        <section className="py-12 md:py-20 bg-white" data-testid="section-tools">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="bg-primary/10 text-primary mb-4 px-4 py-1 rounded-full font-black tracking-widest text-[10px] uppercase border-none hover:bg-primary/10">
                {h.toolsBadge}
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{h.toolsTitle}</h2>
              <p className="text-slate-500 font-bold mt-4 text-lg max-w-2xl mx-auto" data-testid="home-tools-note">{h.toolsIntro}</p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6" data-testid="home-checks">
              {CHECK_GROUPS.map(({ category, ids }) => (
                <div key={category} className="rounded-2xl border border-border bg-background p-5 md:p-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-accent-strong mb-4">{t.step3.categories[category]}</h3>
                  <ol className="space-y-3">
                    {ids.map((id) => (
                      <li key={id} className="flex gap-3 text-sm text-slate-700 leading-snug">
                        <span className="shrink-0 h-6 w-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">{id}</span>
                        <span>{t.checks[id - 1].title}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild className="h-12 px-8 rounded-xl font-bold">
                <Link href={STEPS[2].link} data-event="checklist_click" data-testid="home-checks-open">
                  {h.checksButton} <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* AREA GUIDES */}
        <section className="py-12 md:py-16 bg-background" data-testid="section-explore">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{h.exploreTitle}</h2>
              <p className="text-slate-500 font-bold mt-3 text-base md:text-lg max-w-2xl mx-auto">{h.exploreIntro}</p>
            </div>
            <div className="max-w-md mx-auto">
              <Link href="/localities" className="block" data-testid="home-explore-1">
                <Card className="p-5 md:p-6 border-none shadow-lg rounded-2xl bg-white hover:shadow-xl transition-shadow flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-black text-lg md:text-xl text-slate-900 mb-1">{h.explore[0].title}</h3>
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">{h.explore[0].body}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary shrink-0" />
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* CLOSING PROMPT */}
        <section className="py-12 md:py-24 bg-primary text-white text-center relative overflow-hidden" data-testid="section-closing">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(212,175,90,0.14),transparent)] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 md:mb-10 max-w-4xl mx-auto leading-tight text-white">
              {h.ctaTitle1} <br /> <span className="text-accent">{h.ctaTitle2}</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
              <Button asChild className="w-full md:w-auto h-14 md:h-20 px-8 md:px-14 rounded-xl md:rounded-[2rem] font-black text-base md:text-xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-2xl shadow-black/30">
                <Link href={STEPS[2].link} data-event="checklist_click">{h.ctaChecklist}</Link>
              </Button>
              <Button asChild variant="outline" className="w-full md:w-auto h-14 md:h-20 px-8 md:px-14 rounded-xl md:rounded-[2rem] font-black text-base md:text-xl border-white/10 bg-white/5 hover:bg-white/10 text-white hover:text-white">
                <Link href="/4-step-system" data-event="hero_guide_click">{h.ctaGuide}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
