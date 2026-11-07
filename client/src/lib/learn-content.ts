import type { Language } from "@/lib/i18n/site";

// Answers for the Learn page. A section stays hidden until it has an entry here.
// Add an entry only after an advocate has reviewed it and a native reader has checked its Hindi and Marathi.
type Localized = Record<Language, string>;

interface Reviewed {
  sourceLabel: string;
  sourceUrl: string;
  lastChecked: string; // YYYY-MM-DD
}

export interface SellerClaim extends Reviewed {
  id: string;
  claim: Localized;
  why: Localized;
  ask: Localized;
  paper: Localized;
}

export interface LandWord extends Reviewed {
  id: string;
  word: Localized;
  meaning: Localized;
}

export const SELLER_CLAIMS: SellerClaim[] = [];
export const LAND_WORDS: LandWord[] = [];
