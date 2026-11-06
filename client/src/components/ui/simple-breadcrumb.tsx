import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";

interface BreadcrumbStep {
  label: string;
  link: string;
}

interface SimpleBreadcrumbProps {
  steps: BreadcrumbStep[];
  currentPage: string;
}

export function SimpleBreadcrumb({ steps, currentPage }: SimpleBreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="w-full py-3 px-4"
    >
      <ol 
        className="flex flex-wrap items-center gap-1 text-sm"
        role="list"
      >
        {steps.map((step, index) => (
          <li key={step.link} className="flex items-center">
            <Link
              href={step.link}
              className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-[#2180a8] dark:hover:text-blue-400 transition-colors duration-200 truncate max-w-[120px] sm:max-w-none"
              data-testid={`breadcrumb-link-${index}`}
            >
              {index === 0 && step.label === "Home" && (
                <Home className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">
                {step.label.length > 12 ? `${step.label.slice(0, 12)}...` : step.label}
              </span>
            </Link>
            <ChevronRight 
              className="w-4 h-4 mx-1.5 text-slate-300 dark:text-slate-600 flex-shrink-0" 
              aria-hidden="true"
            />
          </li>
        ))}

        <li className="flex items-center">
          <span 
            className="font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[150px] sm:max-w-[300px]"
            aria-current="page"
            data-testid="breadcrumb-current"
          >
            <span className="hidden sm:inline">{currentPage}</span>
            <span className="sm:hidden">
              {currentPage.length > 20 ? `${currentPage.slice(0, 20)}...` : currentPage}
            </span>
          </span>
        </li>
      </ol>
    </nav>
  );
}
