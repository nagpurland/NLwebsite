import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Phone, 
  MessageCircle, 
  Calendar, 
  ShieldCheck,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAConfig, CTAStrength } from "@/lib/awareness-engine/types";

const STRENGTH_STYLES: Record<CTAStrength, string> = {
  soft: "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300",
  medium: "bg-primary text-white hover:bg-slate-800",
  strong: "bg-primary text-white hover:bg-primary/90 shadow-lg ",
  strongest: "bg-primary text-white shadow-xl shadow-green-600/30"
};

const CTA_ICONS: Record<string, any> = {
  learn_more: ChevronRight,
  explore: ChevronRight,
  compare: Zap,
  get_details: ChevronRight,
  book_now: Calendar,
  legal_checkup: ShieldCheck,
  whatsapp: MessageCircle,
  call: Phone
};

interface AdaptiveCTAProps {
  config: CTAConfig;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onTertiaryClick?: () => void;
  className?: string;
}

export function AdaptiveCTA({ 
  config, 
  onPrimaryClick, 
  onSecondaryClick, 
  onTertiaryClick,
  className 
}: AdaptiveCTAProps) {
  const PrimaryIcon = CTA_ICONS[config.primary_action] || ChevronRight;
  const SecondaryIcon = config.secondary_action ? CTA_ICONS[config.secondary_action] : null;
  
  return (
    <div className={cn("space-y-4 transition-all duration-300", className)}>
      <div className={cn(
        "flex flex-col sm:flex-row gap-3",
        config.placement === "sticky_bottom" && "fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50",
        config.placement === "floating" && "fixed bottom-24 right-6 z-50"
      )}>
        <Button
          onClick={onPrimaryClick}
          className={cn(
            "h-14 px-8 rounded-xl font-semibold text-base transition-all duration-300",
            STRENGTH_STYLES[config.strength],
            config.urgency_styling && "ring-2 ring-offset-2 ring-green-400"
          )}
        >
          {config.primary_label}
          <PrimaryIcon className="h-5 w-5 ml-2" />
        </Button>
        
        {config.secondary_label && (
          <Button
            variant="outline"
            onClick={onSecondaryClick}
            className="h-14 px-6 rounded-xl font-bold text-base border-2"
          >
            {config.secondary_label}
            {SecondaryIcon && <SecondaryIcon className="h-4 w-4 ml-2" />}
          </Button>
        )}
        
        {config.tertiary_label && (
          <Button
            variant="ghost"
            onClick={onTertiaryClick}
            className="h-14 px-6 rounded-xl font-bold text-base text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {config.tertiary_label}
          </Button>
        )}
      </div>
    </div>
  );
}

interface CTAZoneProps {
  strength: CTAStrength;
  segment?: string;
  conversionSignal: 1 | 2 | 3;
  onAction?: (action: string) => void;
}

export function AdaptiveCTAZone({ strength, segment, conversionSignal, onAction }: CTAZoneProps) {
  const getCTAConfig = (): CTAConfig => {
    if (conversionSignal === 3) {
      return {
        strength: "strongest",
        placement: "inline_after_listings",
        primary_label: "Get Legal Checkup",
        primary_action: "legal_checkup",
        secondary_label: "Schedule Property Visit",
        secondary_action: "book_now",
        tertiary_label: "WhatsApp: Immediate Details",
        tertiary_action: "whatsapp",
        urgency_styling: true,
        conversion_action: "high_intent_conversion"
      };
    }
    
    if (conversionSignal === 2) {
      return {
        strength: "strong",
        placement: "inline_after_listings",
        primary_label: "Compare Investment Options",
        primary_action: "compare",
        secondary_label: "Save for Later",
        secondary_action: "save",
        urgency_styling: false,
        conversion_action: "medium_intent_engagement"
      };
    }
    
    return {
      strength: "medium",
      placement: "section_end",
      primary_label: "Explore Properties",
      primary_action: "explore",
      secondary_label: "Learn More",
      secondary_action: "learn_more",
      urgency_styling: false,
      conversion_action: "initial_exploration"
    };
  };
  
  const config = getCTAConfig();
  
  return (
    <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
      <div className="text-center mb-6">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
          Ready to take the next step?
        </p>
        <p className="text-slate-600">
          {conversionSignal === 3 
            ? "You've shown high intent. Let's make it happen."
            : conversionSignal === 2
            ? "You're exploring options. Let's narrow it down."
            : "Start your property discovery journey."}
        </p>
      </div>
      <AdaptiveCTA
        config={config}
        onPrimaryClick={() => onAction?.(config.primary_action)}
        onSecondaryClick={() => onAction?.(config.secondary_action || "")}
        onTertiaryClick={() => onAction?.(config.tertiary_action || "")}
        className="justify-center"
      />
    </div>
  );
}
