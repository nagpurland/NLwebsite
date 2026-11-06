import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useCallback } from "react";

interface StepLink {
  title: string;
  link: string;
}

interface StepHeaderProps {
  stepNumber: number;
  totalSteps?: number;
  stepTitle: string;
  description: string;
  previousStep?: StepLink | null;
  nextStep?: StepLink | null;
}

export function StepHeader({
  stepNumber,
  totalSteps = 4,
  stepTitle,
  description,
  previousStep,
  nextStep,
}: StepHeaderProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" && previousStep) {
      window.location.href = previousStep.link;
    } else if (e.key === "ArrowRight" && nextStep) {
      window.location.href = nextStep.link;
    }
  }, [previousStep, nextStep]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <p 
              className="text-sm font-medium text-[#2180a8] dark:text-blue-400 mb-1"
              data-testid="step-indicator"
            >
              Step {stepNumber} of {totalSteps}
            </p>
            <h1 
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2"
              data-testid="step-title"
            >
              {stepTitle}
            </h1>
            <p 
              className="text-slate-600 dark:text-slate-400 text-sm sm:text-base line-clamp-2"
              data-testid="step-description"
            >
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 pt-2 sm:pt-0">
            {previousStep ? (
              <Link
                href={previousStep.link}
                className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#2180a8] dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                data-testid="link-previous-step"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{previousStep.title}</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            ) : (
              <div className="w-24 hidden sm:block" />
            )}

            {previousStep && nextStep && (
              <span className="hidden sm:block text-slate-300 dark:text-slate-600">|</span>
            )}

            {nextStep ? (
              <Link
                href={nextStep.link}
                className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#2180a8] dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                data-testid="link-next-step"
              >
                <span className="hidden sm:inline">{nextStep.title}</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="w-24 hidden sm:block" />
            )}
          </div>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 hidden sm:block">
          Tip: Use arrow keys to navigate between steps
        </p>
      </div>
    </div>
  );
}
