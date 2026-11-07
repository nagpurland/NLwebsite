import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import { AREA_RATES, CONTEXT, SNAPSHOT_CHECKED_ON } from "../client/src/lib/market-snapshot";

describe("Step 1 content", () => {
  // Only Step 1's own wording: other pages, such as the home page, may name areas.
  const siteText = fs.readFileSync("client/src/lib/i18n/site.ts", "utf8");
  const stepOneText = [...siteText.matchAll(/\n  step1: \{\n[\s\S]*?\n  \},\n/g)].map((match) => match[0]).join("\n");
  const page = fs.readFileSync("client/src/pages/step-1-market-intel.tsx", "utf8") + stepOneText;

  it("keeps figures and their sources out of the wording", () => {
    // Every figure lives in market-snapshot.ts, next to its source, month and link.
    assert.doesNotMatch(page, /[+]\d+\s*%|99acres|MagicBricks|Housing\.com|Square Yards/i);
  });
});

describe("step progress", () => {
  it("doesn't mark a step complete because the buyer moved on", () => {
    const bar = fs.readFileSync("client/src/components/ui/progress-bar.tsx", "utf8");
    assert.doesNotMatch(bar, /isCompleted|stepNum < currentStep/);
  });
});

describe("market snapshot data", () => {
  const LANGS = ["en", "hi", "mr"] as const;
  const filled = (text: Record<string, string>) => LANGS.every((code) => text[code]?.trim());

  it("gives every figure a named source, a link and a month", () => {
    for (const row of AREA_RATES) {
      assert.ok(filled(row.area), `${row.id}: area name`);
      if (row.rate === null) {
        assert.equal(row.change, null, `${row.id}: a change with no rate`);
        assert.equal(row.url, null, `${row.id}: a link with no rate`);
        continue;
      }
      assert.ok(row.rate > 0, `${row.id}: rate`);
      assert.match(row.change ?? "", /^[+-]\d+(\.\d+)?%$/, `${row.id}: change`);
      assert.match(row.asOf ?? "", /^\d{4}-(0[1-9]|1[0-2])$/, `${row.id}: month`);
      assert.match(row.url ?? "", /^https:\/\//, `${row.id}: link`);
      assert.ok(row.source.trim(), `${row.id}: source`);
      if (row.changeNote) assert.ok(filled(row.changeNote), `${row.id}: change note`);
    }
    for (const fact of CONTEXT) {
      assert.ok(filled(fact.text), `${fact.id}: text`);
      assert.match(fact.date, /^\d{4}-\d{2}-\d{2}$/, `${fact.id}: date`);
      assert.match(fact.url, /^https:\/\//, `${fact.id}: link`);
      assert.ok(fact.source.trim(), `${fact.id}: source`);
    }
  });

  it("translates the notes into Hindi and Marathi", () => {
    const notes = [...AREA_RATES.flatMap((row) => (row.changeNote ? [row.changeNote] : [])), ...CONTEXT.map((fact) => fact.text)];
    for (const note of notes) {
      assert.match(note.hi, /[\u0900-\u097F]/);
      assert.match(note.mr, /[\u0900-\u097F]/);
    }
  });

  it("has been checked within the last six months", () => {
    const days = (Date.now() - new Date(SNAPSHOT_CHECKED_ON).getTime()) / 86_400_000;
    assert.ok(days <= 183, `the snapshot was last checked ${Math.round(days)} days ago: refresh market-snapshot.ts`);
  });
});
