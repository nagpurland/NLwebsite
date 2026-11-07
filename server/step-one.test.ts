import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import { calculatePlotCost } from "../client/src/lib/plot-price";

describe("plot cost calculator", () => {
  it("works out the price per sq.ft and the total", () => {
    assert.deepEqual(calculatePlotCost(2000000, 1000, 500000), {
      quotedPerSqFt: 2000,
      totalCost: 2500000,
      totalPerSqFt: 2500,
    });
  });

  it("treats other charges as optional", () => {
    assert.equal(calculatePlotCost(2000000, 1000)?.totalCost, 2000000);
  });

  it("gives no result for missing or impossible figures", () => {
    for (const [price, area, other] of [[0, 1000, 0], [2000000, 0, 0], [-1, 1000, 0], [2000000, 1000, -1], [NaN, 1000, 0]]) {
      assert.equal(calculatePlotCost(price, area, other), null);
    }
  });
});

describe("Step 1 content", () => {
  const page = fs.readFileSync("client/src/pages/step-1-market-intel.tsx", "utf8") + fs.readFileSync("client/src/lib/i18n/site.ts", "utf8");

  it("shows no unsourced growth figures", () => {
    assert.doesNotMatch(page, /[+]\d+\s*%|Market Snapshot|MIHAN|Hingna/);
  });
});

describe("step progress", () => {
  it("doesn't mark a step complete because the buyer moved on", () => {
    const bar = fs.readFileSync("client/src/components/ui/progress-bar.tsx", "utf8");
    assert.doesNotMatch(bar, /isCompleted|stepNum < currentStep/);
  });
});
