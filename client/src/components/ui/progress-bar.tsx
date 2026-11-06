import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  stepNames: string[];
  onStepClick?: (stepNum: number) => void;
}

export function ProgressBar({ currentStep, stepNames, onStepClick }: ProgressBarProps) {
  const handleStepClick = (stepNum: number) => {
    if (onStepClick) {
      onStepClick(stepNum);
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 max-w-4xl mx-auto">
        {stepNames.map((name, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isFuture = stepNum > currentStep;

          return (
            <div
              key={stepNum}
              className="flex flex-col items-center group"
            >
              <button
                onClick={() => handleStepClick(stepNum)}
                className={`
                  relative flex items-center justify-center w-12 h-12 rounded-full 
                  transition-all duration-300 ease-out cursor-pointer
                  ${isCompleted 
                    ? "bg-[#208a4a] text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105" 
                    : isCurrent 
                      ? "bg-[#2180a8] text-white border-4 border-[#2180a8]/30 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105" 
                      : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-600 hover:scale-105"
                  }
                `}
                data-testid={`progress-step-${stepNum}`}
                aria-label={`Step ${stepNum}: ${name}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" strokeWidth={3} />
                ) : (
                  <span className="text-lg font-bold">{stepNum}</span>
                )}
              </button>

              <span
                className={`
                  mt-3 text-sm font-medium text-center px-2 transition-colors duration-200
                  ${isCompleted 
                    ? "text-[#208a4a] dark:text-green-400" 
                    : isCurrent 
                      ? "text-[#2180a8] dark:text-blue-400 font-semibold" 
                      : "text-slate-400 dark:text-slate-500"
                  }
                `}
                data-testid={`progress-label-${stepNum}`}
              >
                {name}
              </span>

              {index < stepNames.length - 1 && (
                <div 
                  className={`
                    hidden sm:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-1 rounded-full
                    transition-colors duration-300
                    ${isCompleted ? "bg-[#208a4a]" : "bg-slate-200 dark:bg-slate-700"}
                  `}
                  style={{ 
                    position: 'absolute',
                    left: '56%',
                    width: 'calc(88% - 48px)',
                    transform: 'translateY(-50%)',
                    top: '24px'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden sm:flex max-w-4xl mx-auto mt-[-42px] mb-6 px-6">
        <div className="flex-1 flex items-center">
          {stepNames.slice(0, -1).map((_, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            
            return (
              <div 
                key={`connector-${stepNum}`}
                className="flex-1 flex items-center"
              >
                <div className="w-6" />
                <div 
                  className={`
                    flex-1 h-1 rounded-full transition-colors duration-300
                    ${isCompleted ? "bg-[#208a4a]" : "bg-slate-200 dark:bg-slate-700"}
                  `}
                />
                <div className="w-6" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
