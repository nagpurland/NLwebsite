import { AREA_RATES, type AreaRate } from "@/lib/market-snapshot";

// The area pages show a rate only where market-snapshot.ts has a dated, linked source.
// An area without one says so. Add no figure here: add it to market-snapshot.ts with its source.
const NAMES: [string, string][] = [
  ["mihan", "MIHAN"],
  ["besa", "Besa"],
  ["wardha-road", "Wardha Road"],
  ["civil-lines", "Civil Lines"],
  ["hingna", "Hingna"],
  ["manish-nagar", "Manish Nagar"],
];

export interface Locality {
  id: string;
  name: string;
  rate: AreaRate | null;
}

export const LOCALITIES: Locality[] = NAMES.map(([id, name]) => ({
  id,
  name,
  rate: AREA_RATES.find((row) => row.id === id && row.rate && row.asOf && row.url) ?? null,
}));

export function findLocality(id: string | undefined): Locality | undefined {
  return LOCALITIES.find((locality) => locality.id === id?.toLowerCase());
}

// The same checks apply in every area, so they are listed once and linked to the guides.
export const AREA_CHECKS = [
  { id: "ownership", title: "Ownership", body: "Ask for the 7/12 (Satbara) extract, the registry and the ferfar, and check the seller's name matches.", guide: "/guide/ownership-verification" },
  { id: "land-use", title: "Land use", body: "Find out whether your use of the plot needs NA conversion or NIT/NMRDA sanction, and whether it is in place.", guide: "/guide/na-conversion" },
  { id: "reservations", title: "TP scheme and reservations", body: "Ask the planning authority whether any part of the plot is reserved for a road or public use.", guide: "/guide/tp-scheme-check" },
  { id: "boundary", title: "Boundary", body: "Have the plot measured on the ground and compared with the records before you pay.", guide: "/guide/boundary-verification" },
];
