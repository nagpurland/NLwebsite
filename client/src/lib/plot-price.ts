export interface PlotCost {
  quotedPerSqFt: number;
  totalCost: number;
  totalPerSqFt: number;
}

export interface PriceComparison {
  direction: "above" | "below" | "equal";
  difference: number;
}

export const rupees = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

// States the arithmetic only. It doesn't say whether either price is fair.
export function compareWithSimilar(quotedPerSqFt: number, similarPerSqFt: number): PriceComparison | null {
  if (!Number.isFinite(similarPerSqFt) || similarPerSqFt <= 0) return null;
  const difference = quotedPerSqFt - similarPerSqFt;
  if (Math.round(difference) === 0) return { direction: "equal", difference: 0 };
  return { direction: difference > 0 ? "above" : "below", difference: Math.abs(difference) };
}

// Works only from figures the buyer enters. It isn't a valuation.
export function calculatePlotCost(askingPrice: number, areaSqFt: number, otherCharges = 0): PlotCost | null {
  if (![askingPrice, areaSqFt, otherCharges].every(Number.isFinite)) return null;
  if (askingPrice <= 0 || areaSqFt <= 0 || otherCharges < 0) return null;
  const totalCost = askingPrice + otherCharges;
  return {
    quotedPerSqFt: askingPrice / areaSqFt,
    totalCost,
    totalPerSqFt: totalCost / areaSqFt,
  };
}
