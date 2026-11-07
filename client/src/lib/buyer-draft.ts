import { useCallback, useState } from "react";

// What a buyer enters across the four steps. It stays in their browser and is never
// sent to the server. It's self-reported: nothing here has been reviewed by anyone.
export const DRAFT_KEY = "nagpurland_draft";
export const DRAFT_VERSION = 1;
const LEGACY_KEYS = ["safetyChecklist", "nagpur_land_step_progress"];
const CHECK_COUNT = 12;

export type ScreeningAnswer = "yes" | "no" | "not_sure";

// Wording for each question is in lib/i18n/site.ts. Answers are stored by id, so they
// stay correct when the buyer changes language.
export const SCREENING_IDS = ["identify", "records", "approvals", "access", "concerns"] as const;

export type ScreeningId = (typeof SCREENING_IDS)[number];

export interface BuyerDraft {
  version: typeof DRAFT_VERSION;
  screening: Partial<Record<ScreeningId, ScreeningAnswer>>;
  checks: number[];
}

export function emptyDraft(): BuyerDraft {
  return {
    version: DRAFT_VERSION,
    screening: {},
    checks: [],
  };
}

type DraftStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const validChecks = (value: unknown): number[] =>
  Array.isArray(value)
    ? Array.from(new Set(value.filter((id) => Number.isInteger(id) && id >= 1 && id <= CHECK_COUNT)))
    : [];

// Saved data can be old or edited by hand, so only known fields and values are kept.
export function parseDraft(raw: string | null): BuyerDraft | null {
  if (!raw) return null;
  try {
    const saved = JSON.parse(raw);
    if (saved?.version !== DRAFT_VERSION) return null;
    const screening: BuyerDraft["screening"] = {};
    for (const id of SCREENING_IDS) {
      const answer = saved.screening?.[id];
      if (answer === "yes" || answer === "no" || answer === "not_sure") screening[id] = answer;
    }
    return {
      version: DRAFT_VERSION,
      screening,
      checks: validChecks(saved.checks),
    };
  } catch {
    return null;
  }
}

export function loadDraft(storage: DraftStorage): BuyerDraft {
  try {
    const draft = parseDraft(storage.getItem(DRAFT_KEY));
    if (draft) return draft;
    // Keeps ticks saved by the older checklist.
    const legacy = storage.getItem("safetyChecklist");
    return { ...emptyDraft(), checks: legacy ? validChecks(JSON.parse(legacy)) : [] };
  } catch {
    return emptyDraft();
  }
}

export function saveDraft(storage: DraftStorage, draft: BuyerDraft) {
  try {
    storage.setItem(DRAFT_KEY, JSON.stringify(draft));
    storage.removeItem("safetyChecklist");
  } catch {
    // Private windows can block storage. The answers still work until the page closes.
  }
}

export function clearDraft(storage: DraftStorage) {
  try {
    for (const key of [DRAFT_KEY, ...LEGACY_KEYS]) storage.removeItem(key);
  } catch {
    // Nothing was stored.
  }
}

export function hasAnswers(draft: BuyerDraft): boolean {
  return Boolean(Object.keys(draft.screening).length || draft.checks.length);
}

// Step 1 only explains, so there is nothing to answer there. A new buyer starts at Step 1,
// and someone who has begun resumes at the first step with open answers.
export function nextOpenStep(draft: BuyerDraft): number {
  if (!hasAnswers(draft)) return 1;
  if (Object.keys(draft.screening).length < SCREENING_IDS.length) return 2;
  if (draft.checks.length < CHECK_COUNT) return 3;
  return 4;
}

// Questions come from each answer on its own. There's deliberately no score or overall result.
export function screeningFollowUpIds(draft: BuyerDraft): ScreeningId[] {
  return SCREENING_IDS.filter((id) => draft.screening[id] !== "yes");
}

export function useBuyerDraft() {
  const [draft, setDraft] = useState<BuyerDraft>(() => loadDraft(window.localStorage));

  const updateDraft = useCallback((change: Partial<BuyerDraft>) => {
    setDraft((current) => {
      const next = { ...current, ...change };
      saveDraft(window.localStorage, next);
      return next;
    });
  }, []);

  const resetDraft = useCallback(() => {
    clearDraft(window.localStorage);
    setDraft(emptyDraft());
  }, []);

  return { draft, updateDraft, resetDraft };
}
