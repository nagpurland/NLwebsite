import { useLocation } from "wouter";
import { useTranslation } from "@/lib/i18n/context";
import { fill } from "@/lib/i18n/site";
import { STEPS } from "@/lib/step-navigation";

// Shows where the buyer is, not what they've finished: opening a later step completes nothing.
export function ProgressBar({ currentStep }: { currentStep: number }) {
  const [, navigate] = useLocation();
  const t = useTranslation();

  return (
    <div className="w-full px-4 py-3 print:hidden">
      <div className="grid grid-cols-4 gap-2 max-w-4xl mx-auto">
        {STEPS.map((step, index) => {
          const isCurrent = step.number === currentStep;
          const name = t.steps[index].short;

          return (
            <button
              key={step.number}
              onClick={() => navigate(step.link)}
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-w-0 rounded-lg p-1 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              data-testid={`progress-step-${step.number}`}
              aria-label={`${fill(t.common.stepLabel, { step: step.number })}: ${name}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className={`flex items-center justify-center w-7 h-7 shrink-0 rounded-full text-xs font-bold ${
                  isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                {step.number}
              </span>
              <span
                className={`text-xs text-center leading-tight ${
                  isCurrent
                    ? "text-primary dark:text-blue-400 font-semibold"
                    : "text-slate-500 dark:text-slate-400"
                }`}
                data-testid={`progress-label-${step.number}`}
              >
                {name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
