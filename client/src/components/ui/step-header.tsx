import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { fill } from "@/lib/i18n/site";
import { STEPS } from "@/lib/step-navigation";

interface StepHeaderProps {
  stepNumber: number;
  description: string;
}

export function StepHeader({ stepNumber, description }: StepHeaderProps) {
  const t = useTranslation();
  const previous = stepNumber > 1 ? { title: t.steps[stepNumber - 2].title, link: STEPS[stepNumber - 2].link } : null;
  const next = stepNumber < STEPS.length ? { title: t.steps[stepNumber].title, link: STEPS[stepNumber].link } : null;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Arrow keys move the cursor while typing, so they mustn't change the page.
    if ((e.target as HTMLElement).closest?.("input, textarea, select, [contenteditable]")) return;
    if (e.key === "ArrowLeft" && previous) {
      window.location.href = previous.link;
    } else if (e.key === "ArrowRight" && next) {
      window.location.href = next.link;
    }
  }, [previous, next]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const linkClass = "flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors";

  return (
    <div className="w-full bg-background dark:bg-slate-800/50 border-y border-border">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-accent-strong dark:text-blue-400 mb-1" data-testid="step-indicator">
              {fill(t.common.stepOf, { step: stepNumber, total: STEPS.length })}
            </p>
            <h1 className="text-2xl sm:text-3xl text-primary dark:text-white mb-2" data-testid="step-title">
              {t.steps[stepNumber - 1].title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base" data-testid="step-description">
              {description}
            </p>
          </div>

          <div className="flex flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 pt-2 sm:pt-0">
            {previous ? (
              <Link href={previous.link} className={linkClass} data-testid="link-previous-step">
                <ChevronLeft className="w-4 h-4" />
                <span>{t.common.previous}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={next.link} className={linkClass} data-testid="link-next-step">
                <span>{t.common.next}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : <span />}
          </div>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 hidden sm:block">{t.common.arrowTip}</p>
      </div>
    </div>
  );
}
