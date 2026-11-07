import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { 
  AwarenessState, 
  AwarenessLevel, 
  UserSegment, 
  BehaviorSignal,
  PropertyWithRelevance,
  ResearchInsight,
  BlockNumber,
  CTAConfig
} from "./types";

interface AwarenessContextType {
  state: AwarenessState;
  setAwarenessLevel: (level: AwarenessLevel) => void;
  setSegment: (segment: UserSegment) => void;
  logBehavior: (signal: Partial<BehaviorSignal>) => void;
  addPropertyViewed: (id: string) => void;
  addPropertySaved: (id: string) => void;
  removePropertySaved: (id: string) => void;
  getVisibleBlocks: () => BlockNumber[];
  getPartialBlocks: () => BlockNumber[];
}

const defaultState: AwarenessState = {
  session_id: `sess_${Date.now()}`,
  user_profile: {
    segment: "explorer",
    device: "desktop"
  },
  current_output: {
    awareness_level: "Unaware",
    awareness_confidence: 50,
    awareness_change_signal: "static",
    content_depth: "low",
    show_blocks: [1, 2, 6],
    partial_blocks: [3],
    hide_blocks: [4, 5, 7, 8],
    selected_property_listings: [],
    research_insights: [],
    ui_guidance: {
      cta_strength: "soft",
      cta_placement: "section_end",
      content_pacing: "slow_educational",
      visual_framing: "lead_with_education",
      tone: "educational",
      personalization_level: "anonymous"
    },
    cta_config: {
      strength: "soft",
      placement: "section_end",
      primary_label: "Learn More",
      primary_action: "learn_more",
      urgency_styling: false,
      conversion_action: "initial_engagement"
    },
    behavior_data_to_log: {}
  },
  behavior_log: [],
  total_time_on_site: 0,
  properties_viewed: [],
  properties_saved: [],
  conversion_signal: 1
};

const AwarenessContext = createContext<AwarenessContextType | undefined>(undefined);

const AWARENESS_BLOCK_MAP: Record<AwarenessLevel, { show: BlockNumber[], partial: BlockNumber[], hide: BlockNumber[] }> = {
  "Unaware": { show: [1, 2], partial: [6], hide: [3, 4, 5, 7, 8] },
  "Problem Aware": { show: [1, 2, 3, 6], partial: [4], hide: [5, 7, 8] },
  "Solution Aware": { show: [2, 3, 4, 6], partial: [5, 7], hide: [1, 8] },
  "Product Aware": { show: [4, 5, 6, 7], partial: [8], hide: [1, 2, 3] },
  "Most Aware": { show: [5, 6, 7, 8], partial: [], hide: [1, 2, 3, 4] }
};

export function AwarenessProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AwarenessState>(defaultState);

  const setAwarenessLevel = useCallback((level: AwarenessLevel) => {
    const blockConfig = AWARENESS_BLOCK_MAP[level];
    setState(prev => ({
      ...prev,
      current_output: {
        ...prev.current_output,
        awareness_level: level,
        show_blocks: blockConfig.show,
        partial_blocks: blockConfig.partial,
        hide_blocks: blockConfig.hide,
        content_depth: level === "Most Aware" ? "high" : level === "Product Aware" ? "high" : level === "Solution Aware" ? "medium-high" : "medium"
      }
    }));
  }, []);

  const setSegment = useCallback((segment: UserSegment) => {
    setState(prev => ({
      ...prev,
      user_profile: { ...prev.user_profile, segment }
    }));
  }, []);

  const logBehavior = useCallback((signal: Partial<BehaviorSignal>) => {
    const fullSignal: BehaviorSignal = {
      interaction_type: signal.interaction_type || "page_load",
      conversion_signal: signal.conversion_signal || 1,
      timestamp: new Date().toISOString(),
      session_id: state.session_id,
      ...signal
    };
    setState(prev => ({
      ...prev,
      behavior_log: [...prev.behavior_log, fullSignal]
    }));
  }, [state.session_id]);

  const addPropertyViewed = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      properties_viewed: prev.properties_viewed.includes(id) 
        ? prev.properties_viewed 
        : [...prev.properties_viewed, id]
    }));
  }, []);

  const addPropertySaved = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      properties_saved: prev.properties_saved.includes(id) 
        ? prev.properties_saved 
        : [...prev.properties_saved, id],
      conversion_signal: 3
    }));
  }, []);

  const removePropertySaved = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      properties_saved: prev.properties_saved.filter(p => p !== id)
    }));
  }, []);

  const getVisibleBlocks = useCallback(() => {
    return state.current_output.show_blocks;
  }, [state.current_output.show_blocks]);

  const getPartialBlocks = useCallback(() => {
    return state.current_output.partial_blocks;
  }, [state.current_output.partial_blocks]);

  return (
    <AwarenessContext.Provider value={{
      state,
      setAwarenessLevel,
      setSegment,
      logBehavior,
      addPropertyViewed,
      addPropertySaved,
      removePropertySaved,
      getVisibleBlocks,
      getPartialBlocks
    }}>
      {children}
    </AwarenessContext.Provider>
  );
}

export function useAwareness() {
  const context = useContext(AwarenessContext);
  if (!context) {
    throw new Error("useAwareness must be used within an AwarenessProvider");
  }
  return context;
}
