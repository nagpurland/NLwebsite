export interface StepData {
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  link: string;
}

export const STEPS: StepData[] = [
  {
    number: 1,
    title: "Market Intelligence",
    shortTitle: "Market Intel",
    description: "Gather comprehensive market data to make informed decisions.",
    link: "/step-1-market-intel"
  },
  {
    number: 2,
    title: "Filter Risky Options",
    shortTitle: "Filter Risky",
    description: "Identify and eliminate high-risk properties from your shortlist.",
    link: "/step-2-filter-risky"
  },
  {
    number: 3,
    title: "Safety Checkup",
    shortTitle: "Safety Check",
    description: "Conduct thorough verification of legal status and documentation.",
    link: "/step-3-safety-check"
  },
  {
    number: 4,
    title: "Decision Report",
    shortTitle: "Decision Report",
    description: "Generate your comprehensive investment decision report.",
    link: "/step-4-decision-report"
  }
];

const PROGRESS_KEY = "nagpur_land_step_progress";

export interface StepProgress {
  completedSteps: number[];
  currentStep: number;
  lastVisited: string;
}

export function getStepData(stepNumber: number): StepData | null {
  return STEPS.find(s => s.number === stepNumber) || null;
}

export function getStepLink(stepNumber: number): string {
  const step = getStepData(stepNumber);
  return step?.link || "/4-step-system";
}

export function getNextStep(currentStep: number): number | null {
  if (currentStep >= 4) return null;
  return currentStep + 1;
}

export function getPreviousStep(currentStep: number): number | null {
  if (currentStep <= 1) return null;
  return currentStep - 1;
}

export function getNextStepData(currentStep: number): StepData | null {
  const next = getNextStep(currentStep);
  return next ? getStepData(next) : null;
}

export function getPreviousStepData(currentStep: number): StepData | null {
  const prev = getPreviousStep(currentStep);
  return prev ? getStepData(prev) : null;
}

export function getProgress(): StepProgress {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading step progress:", e);
  }
  return {
    completedSteps: [],
    currentStep: 1,
    lastVisited: new Date().toISOString()
  };
}

export function saveProgress(progress: StepProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      ...progress,
      lastVisited: new Date().toISOString()
    }));
  } catch (e) {
    console.error("Error saving step progress:", e);
  }
}

export function markStepCompleted(stepNumber: number): void {
  const progress = getProgress();
  if (!progress.completedSteps.includes(stepNumber)) {
    progress.completedSteps.push(stepNumber);
    progress.completedSteps.sort((a, b) => a - b);
  }
  saveProgress(progress);
}

export function markStepVisited(stepNumber: number): void {
  const progress = getProgress();
  progress.currentStep = stepNumber;
  saveProgress(progress);
}

export function isStepCompleted(stepNumber: number): boolean {
  const progress = getProgress();
  return progress.completedSteps.includes(stepNumber);
}

export function getCompletedSteps(): number[] {
  return getProgress().completedSteps;
}

export function getCurrentStep(): number {
  return getProgress().currentStep;
}

export function resetProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (e) {
    console.error("Error resetting progress:", e);
  }
}

export function getProgressPercentage(): number {
  const progress = getProgress();
  return (progress.completedSteps.length / STEPS.length) * 100;
}

export function canAccessStep(stepNumber: number): boolean {
  return true;
}

export function getResumeLink(): string {
  const progress = getProgress();
  const lastIncomplete = STEPS.find(s => !progress.completedSteps.includes(s.number));
  return lastIncomplete?.link || "/step-complete";
}
