import { PublicLayout } from "@/components/layout/PublicLayout";
import {
  ArrowRight, BookOpen, Check, FileText, MapPin, MessageCircleQuestion, Plus, Search, ShieldCheck, X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n/context";
import { track } from "@/lib/track";
import { STEPS } from "@/lib/step-navigation";

const BADGE_ICONS = [FileText, BookOpen, MapPin];

// The cards and icons are drawn on hero-land.webp. Each button sits on a card, and its text covers the drawn words.
const CALLOUTS = [
  { key: "ownership", guide: "/guide/ownership-verification" },
  { key: "landUse", guide: "/guide/na-conversion" },
  { key: "road", guide: "/guide/tp-scheme-check" },
  { key: "boundary", guide: "/guide/boundary-verification" },
] as const;

type CalloutKey = (typeof CALLOUTS)[number]["key"];

function Eyebrow({ children, testId }: { children: React.ReactNode; testId?: string }) {
  return (
    <p className="hd-eyebrow" data-testid={testId}>
      <span />
      {children}
    </p>
  );
}

function HeroArt() {
  const t = useTranslation();
  const home = t.home;
  const [active, setActive] = useState<CalloutKey | null>(null);
  const selected = CALLOUTS.find((callout) => callout.key === active);

  return (
    <div className="hd-art-wrap">
      <div className="hd-art" data-testid="hero-art">
        <img src="/home/hero-land.webp" alt="" />
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
            className={`hd-callout hd-callout-${key}`}
            data-testid={`callout-${key}`}
          >
            <span>
              <strong>{home.callouts[key].title}</strong>
              <small>{home.callouts[key].note}</small>
            </span>
            <Plus className="hd-callout-plus" aria-hidden="true" />
          </button>
        ))}
        <div className="hd-land-label">
          {home.yourLand}
          <br />
          {home.example}
        </div>
      </div>

      <div id="land-topic-detail" aria-live="polite">
        {selected && (
          <div className="hd-detail" data-testid="callout-detail">
            <div>
              <p className="hd-detail-title">{home.callouts[selected.key].title}</p>
              <p>{home.callouts[selected.key].body}</p>
              <Link href={selected.guide} className="hd-detail-link" data-testid="callout-guide">
                {home.calloutGuide}
                <ArrowRight />
              </Link>
            </div>
            <button type="button" aria-label={home.calloutClose} onClick={() => setActive(null)}>
              <X />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PublicHome() {
  const t = useTranslation();
  const home = t.home;

  return (
    <PublicLayout>
      <div className="hd">
        {/* HERO */}
        <section className="hd-hero" data-testid="section-hero">
          <div className="hd-hero-in">
            <div className="hd-hero-text">
              <Eyebrow testId="hero-kicker">{home.kicker}</Eyebrow>
              <h1>
                {home.titleLine1}
                <br />
                {home.titleLine2}
                <br />
                <span>{home.titleGold}</span>
              </h1>
              <p className="hd-intro">{home.intro}</p>
              <div className="hd-actions">
                <Link href="/plot-checkup" className="hd-btn hd-btn-dark" data-testid="button-hero-check-property" data-event="hero_check_click">
                  <Search />
                  {home.primary}
                  <ArrowRight />
                </Link>
                <Link href="/4-step-system" className="hd-btn hd-btn-light" data-testid="button-hero-guide" data-event="hero_guide_click">
                  {home.secondary}
                  <ArrowRight />
                </Link>
              </div>
              <p className="hd-note" data-testid="hero-inquiry-note">{home.primaryNote}</p>
              <ul className="hd-badges">
                {home.badges.map((badge, index) => {
                  const Icon = BADGE_ICONS[index];
                  return (
                    <li key={badge}>
                      <Icon strokeWidth={1.5} />
                      {badge}
                    </li>
                  );
                })}
              </ul>
            </div>
            <HeroArt />
          </div>
        </section>

        <div className="hd-sections">
          {/* 4-STEP SYSTEM */}
          <section className="hd-steps" data-testid="section-steps">
            <div className="hd-steps-intro">
              <span className="hd-rule" />
              <h2>{home.bandTitle}</h2>
              <p>{home.bandBody}</p>
              <Link href={STEPS[0].link} className="hd-btn hd-btn-dark" data-testid="button-start-guide" data-event="start_guide_click">
                {home.bandButton}
                <ArrowRight />
              </Link>
            </div>
            <div className="hd-step-list">
              {STEPS.map((step, index) => {
                return (
                  <Link key={step.number} href={step.link} className="hd-step" data-testid={`home-step-${step.number}`} data-event="step_click">
                    <img className="hd-step-icon" src={`/home/step-${step.number}.webp`} alt="" />
                    {index < STEPS.length - 1 && <ArrowRight className="hd-step-arrow" />}
                    <b>0{step.number}</b>
                    <strong>{t.steps[index].title}</strong>
                    <small>{home.stepNotes[index]}</small>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* CHECKLIST */}
          <section className="hd-check" data-testid="section-checklist">
            <img src="/home/clipboard.webp" alt="" />
            <div className="hd-check-body">
              <Eyebrow>{home.checkChip}</Eyebrow>
              <h2>{home.checkTitle}</h2>
              <p>{home.checkBody}</p>
              <ul>
                {home.checkPoints.map((point) => (
                  <li key={point}>
                    <Check strokeWidth={2.5} />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={STEPS[2].link} className="hd-btn hd-btn-dark" data-testid="button-view-checklist" data-event="checklist_click">
                {home.checkButton}
                <ArrowRight />
              </Link>
            </div>
            <aside data-testid="checklist-note">
              <img src="/home/note-icon.webp" alt="" />
              <p>{home.checkNote}</p>
            </aside>
          </section>

          {/* INDEPENDENT ASSISTANCE */}
          <section className="hd-assist" data-testid="section-assistance">
            <div className="hd-assist-intro">
              <Eyebrow>{home.assistEyebrow}</Eyebrow>
              <h2>{home.assistTitle}</h2>
              <p>{home.assistIntro}</p>
              <div className="hd-assist-actions">
                <Link href="/plot-checkup" className="hd-btn hd-btn-dark" data-testid="button-ask-question" data-event="ask_click">
                  {home.assistButton}
                  <ArrowRight />
                </Link>
                <span>
                  <MessageCircleQuestion strokeWidth={1.5} />
                  {home.assistInquiry}
                </span>
                <span>
                  <ShieldCheck strokeWidth={1.5} />
                  {home.assistNoUpload}
                </span>
              </div>
            </div>
            <ul className="hd-assist-list">
              {home.assistPoints.map((point, index) => {
                return (
                  <li key={point.title}>
                    <img className="hd-assist-icon" src={`/home/assist-${index + 1}.webp`} alt="" />
                    <span>
                      <strong>{point.title}</strong>
                      <small>{point.body}</small>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <p className="hd-legal" data-testid="section-legal-note">{home.legalNote}</p>
        </div>
      </div>
    </PublicLayout>
  );
}
