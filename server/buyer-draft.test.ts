import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import {
  DRAFT_KEY,
  clearDraft,
  emptyDraft,
  hasAnswers,
  loadDraft,
  nextOpenStep,
  parseDraft,
  saveDraft,
  screeningFollowUpIds,
  SCREENING_IDS,
} from "../client/src/lib/buyer-draft";
import { STEPS } from "../client/src/lib/step-navigation";
import { LANGUAGES, SITE_TEXT, fill } from "../client/src/lib/i18n/site";
import { compareWithSimilar } from "../client/src/lib/plot-price";

function memoryStorage(initial: Record<string, string> = {}) {
  const items = new Map(Object.entries(initial));
  return {
    items,
    getItem: (key: string) => items.get(key) ?? null,
    setItem: (key: string, value: string) => void items.set(key, value),
    removeItem: (key: string) => void items.delete(key),
  };
}

describe("buyer draft", () => {
  it("saves and restores what the buyer entered", () => {
    const storage = memoryStorage();
    const draft = { ...emptyDraft(), locality: "Besa", askingPrice: "2000000", screening: { access: "no" as const }, checks: [1, 5] };
    saveDraft(storage, draft);
    assert.deepEqual(loadDraft(storage), draft);
  });

  it("keeps ticks from the older checklist, once", () => {
    const storage = memoryStorage({ safetyChecklist: "[2,4]" });
    const draft = loadDraft(storage);
    assert.deepEqual(draft.checks, [2, 4]);
    saveDraft(storage, draft);
    assert.equal(storage.items.has("safetyChecklist"), false);
  });

  it("survives damaged or unknown saved data", () => {
    assert.equal(parseDraft("not json"), null);
    assert.equal(parseDraft('{"version":99}'), null);
    assert.deepEqual(loadDraft(memoryStorage({ [DRAFT_KEY]: "{", safetyChecklist: "oops" })), emptyDraft());
    const cleaned = parseDraft('{"version":1,"checks":[1,1,99,"x"],"screening":{"access":"maybe","records":"yes","other":"yes"},"secret":"x"}');
    assert.deepEqual(cleaned?.checks, [1]);
    assert.deepEqual(cleaned?.screening, { records: "yes" });
    assert.equal("secret" in (cleaned as object), false);
  });

  it("still works when the browser blocks storage", () => {
    const blocked = {
      getItem: () => { throw new Error("blocked"); },
      setItem: () => { throw new Error("blocked"); },
      removeItem: () => { throw new Error("blocked"); },
    };
    assert.deepEqual(loadDraft(blocked), emptyDraft());
    assert.doesNotThrow(() => saveDraft(blocked, emptyDraft()));
    assert.doesNotThrow(() => clearDraft(blocked));
  });

  it("deletes everything, including older saved progress", () => {
    const storage = memoryStorage({ [DRAFT_KEY]: "{}", safetyChecklist: "[1]", nagpur_land_step_progress: "{}" });
    clearDraft(storage);
    assert.equal(storage.items.size, 0);
  });

  it("knows when a buyer has started and where to resume", () => {
    assert.equal(hasAnswers(emptyDraft()), false);
    assert.equal(nextOpenStep(emptyDraft()), 1);
    const step1 = { ...emptyDraft(), locality: "Besa" };
    assert.equal(hasAnswers(step1), true);
    assert.equal(nextOpenStep(step1), 2);
    const screening = Object.fromEntries(SCREENING_IDS.map((id) => [id, "not_sure"]));
    assert.equal(nextOpenStep({ ...step1, screening }), 3);
    assert.equal(nextOpenStep({ ...step1, screening, checks: Array.from({ length: 12 }, (_, i) => i + 1) }), 4);
  });

  it("raises a question for every answer except Yes, with no score", () => {
    assert.equal(screeningFollowUpIds(emptyDraft()).length, 5);
    const draft = { ...emptyDraft(), screening: { identify: "yes" as const, records: "no" as const, access: "not_sure" as const } };
    assert.equal(screeningFollowUpIds(draft).length, 4);
    assert.doesNotMatch(fs.readFileSync("client/src/lib/buyer-draft.ts", "utf8"), /\bscore\s*[:=]/i);
  });
});

describe("price comparison", () => {
  it("states the difference without judging it", () => {
    assert.deepEqual(compareWithSimilar(2500, 2000), { direction: "above", difference: 500 });
    assert.deepEqual(compareWithSimilar(1500, 2000), { direction: "below", difference: 500 });
    assert.deepEqual(compareWithSimilar(2000, 2000), { direction: "equal", difference: 0 });
    assert.equal(compareWithSimilar(2000, 0), null);
    assert.equal(compareWithSimilar(2000, NaN), null);
  });
});

describe("four-step journey", () => {
  it("uses the same step names in every language file", () => {
    assert.deepEqual(SITE_TEXT.en.steps.map((step) => step.title), [
      "Check the Area & Rate",
      "First Plot Check",
      "12-Point Paper & Site Check",
      "Your Plot Summary",
    ]);
    assert.deepEqual(STEPS.map((step) => step.title), SITE_TEXT.en.steps.map((step) => step.title));
  });

  const pages = ["step-1-market-intel", "step-2-filter-risky", "step-3-safety-check", "step-4-decision-report"];
  const read = (page: string) => fs.readFileSync(`client/src/pages/${page}.tsx`, "utf8");
  const siteText = fs.readFileSync("client/src/lib/i18n/site.ts", "utf8");

  it("doesn't use retired names or misleading results", () => {
    const retired = /Pre-Screen|Pre-screen|Filter Risky|Safety Check\b|Safety Checklist|Compare Prices|checks complete|has passed|verified by lawyer|Save Progress/;
    for (const page of [...pages, "four-step-system", "invest-safely", "public-home"]) {
      assert.doesNotMatch(read(page), retired, page);
    }
    assert.doesNotMatch(siteText, retired);
  });

  it("keeps the self-reported notice on the summary", () => {
    assert.match(read("step-4-decision-report"), /s\.notice/);
    assert.match(siteText, /self-reported by you/);
    assert.match(siteText, /isn't sent with it/);
  });
});

describe("site languages", () => {
  // Every piece of wording as [path, text], so languages can be compared one by one.
  const leaves = (value: unknown, path = ""): [string, string][] =>
    typeof value === "string"
      ? [[path, value]]
      : Object.entries(value as object).flatMap(([key, child]) => leaves(child, `${path}.${key}`));

  const english = leaves(SITE_TEXT.en);
  const placeholders = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort();

  for (const code of ["hi", "mr"] as const) {
    const translated = leaves(SITE_TEXT[code]);

    it(`${code} has the same wording slots as English`, () => {
      assert.deepEqual(translated.map(([path]) => path), english.map(([path]) => path));
    });

    it(`${code} is actually translated`, () => {
      translated.forEach(([path, text], index) => {
        // A slot left empty in English, such as a callout with no note, stays empty.
        if (english[index][1]) assert.match(text, /[\u0900-\u097F]/, `${path}: ${text}`);
      });
    });

    it(`${code} keeps every placeholder`, () => {
      translated.forEach(([path, text], index) => {
        assert.deepEqual(placeholders(text), placeholders(english[index][1]), path);
      });
    });

    it(`${code} keeps the safety wording`, () => {
      assert.match(SITE_TEXT[code].forms.documentNotice, code === "hi" ? /अपलोड न करें/ : /अपलोड करू नका/);
      assert.match(SITE_TEXT[code].step4.notice, code === "hi" ? /कानूनी राय नहीं/ : /कायदेशीर मत नाही/);
    });
  }

  it("offers English, Hindi and Marathi", () => {
    assert.deepEqual(LANGUAGES.map((lang) => lang.code), ["en", "hi", "mr"]);
  });

  it("fills in placeholders", () => {
    assert.equal(fill("{a} of {b}", { a: 1, b: 2 }), "1 of 2");
    assert.equal(fill("{a}", {}), "{a}");
  });
});

describe("site look", () => {
  const routed = fs.readFileSync("client/src/App.tsx", "utf8").matchAll(/from "@\/pages\/([\w/-]+)"/g);
  const old = /(?<![:\w-])(?:bg|text|border)-(?:indigo|blue|violet|purple|sky|cyan|teal|pink|rose|orange)-\d+|font-black|#2180a8/;

  it("keeps every routed page on the navy and gold palette", () => {
    for (const [, page] of routed) {
      assert.doesNotMatch(fs.readFileSync(`client/src/pages/${page}.tsx`, "utf8"), old, page);
    }
  });
});

describe("home page wording", () => {
  it("makes no verification or safety promises in any language", () => {
    for (const code of ["en", "hi", "mr"] as const) {
      const home = JSON.stringify(SITE_TEXT[code].home);
      assert.doesNotMatch(home, /guarantee|100%|verified|safe to buy|safer|trusted|connect you|गारंटी/i, code);
    }
  });
});
