import type { PriceComparison } from "@/lib/plot-price";
import { rupees } from "@/lib/plot-price";
import { fill, type SiteText } from "./site";

export function comparisonText(text: SiteText["calculator"], comparison: PriceComparison): string {
  if (comparison.direction === "equal") return text.equal;
  return fill(text[comparison.direction], { amount: rupees(comparison.difference) });
}
