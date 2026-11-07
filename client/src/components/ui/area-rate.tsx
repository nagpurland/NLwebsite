import type { Locality } from "@/lib/localities";

const formatMonth = (month: string) => new Date(`${month}-01`).toLocaleDateString("en-IN", { month: "short", year: "numeric" });

// One area's dated asking rate and its source, or a plain "no figure" line.
export function AreaRate({ locality }: { locality: Locality }) {
  const row = locality.rate;
  if (!row || !row.rate || !row.asOf || !row.url) {
    return (
      <p className="text-sm text-muted-foreground" data-testid={`area-rate-${locality.id}`}>
        No rate we can source yet.
      </p>
    );
  }
  return (
    <div data-testid={`area-rate-${locality.id}`}>
      <p className="text-2xl font-bold text-primary">
        ₹{row.rate.toLocaleString("en-IN")} <span className="text-sm font-medium text-muted-foreground">per sq ft</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Apartment asking rate, {formatMonth(row.asOf)}, {row.change} as the source reports it. Not a plot rate or a sale price.
      </p>
      <p className="mt-1 text-sm">
        Source:{" "}
        <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-primary underline" data-testid={`area-source-${locality.id}`}>
          {row.source}
        </a>
      </p>
    </div>
  );
}
