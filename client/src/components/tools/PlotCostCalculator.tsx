import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBuyerDraft } from "@/lib/buyer-draft";
import { useTranslation } from "@/lib/i18n/context";
import { comparisonText } from "@/lib/i18n/comparison";
import { calculatePlotCost, compareWithSimilar, rupees } from "@/lib/plot-price";

export function PlotCostCalculator() {
  const t = useTranslation();
  const c = t.calculator;
  const { draft, updateDraft } = useBuyerDraft();

  const result = calculatePlotCost(Number(draft.askingPrice), Number(draft.area), Number(draft.otherCharges || 0));
  const comparison = result ? compareWithSimilar(result.quotedPerSqFt, Number(draft.similarPricePerSqFt)) : null;

  return (
    <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700 p-4" data-testid="plot-cost-calculator">
      <h4 className="font-semibold text-primary dark:text-white mb-3">{c.title}</h4>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="calc-locality">{c.area}</Label>
          <Input id="calc-locality" maxLength={60} placeholder={t.forms.localityExample} value={draft.locality} onChange={(e) => updateDraft({ locality: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="calc-price">{c.price}</Label>
          <Input id="calc-price" type="number" inputMode="numeric" min="0" value={draft.askingPrice} onChange={(e) => updateDraft({ askingPrice: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="calc-area">{c.size}</Label>
          <Input id="calc-area" type="number" inputMode="numeric" min="0" value={draft.area} onChange={(e) => updateDraft({ area: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="calc-other">{c.other}</Label>
          <Input id="calc-other" type="number" inputMode="numeric" min="0" value={draft.otherCharges} onChange={(e) => updateDraft({ otherCharges: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="calc-similar">{c.similar}</Label>
          <Input id="calc-similar" type="number" inputMode="numeric" min="0" value={draft.similarPricePerSqFt} onChange={(e) => updateDraft({ similarPricePerSqFt: e.target.value })} />
        </div>
      </div>
      <div className="mt-4 text-sm text-slate-700 dark:text-slate-300" role="status" data-testid="calculator-result">
        {result ? (
          <ul className="space-y-1">
            <li>{c.quoted}: <strong>{rupees(result.quotedPerSqFt)}</strong></li>
            <li>{c.total}: <strong>{rupees(result.totalCost)}</strong></li>
            <li>{c.totalRate}: <strong>{rupees(result.totalPerSqFt)}</strong></li>
            {comparison && <li data-testid="calculator-comparison">{comparisonText(c, comparison)}</li>}
          </ul>
        ) : (
          <p>{c.prompt}</p>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{c.note}</p>
    </div>
  );
}
