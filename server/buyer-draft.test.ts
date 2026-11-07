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
    const draft = { ...emptyDraft(), screening: { access: "no" as const }, checks: [1, 5] };
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

  it("drops the area and price fields that older saved answers may hold", () => {
    const old = parseDraft('{"version":1,"locality":"Besa","askingPrice":"2000000","area":"1000","screening":{"access":"no"},"checks":[2]}');
    assert.deepEqual(old, { ...emptyDraft(), screening: { access: "no" }, checks: [2] });
    for (const key of ["locality", "askingPrice", "area"]) assert.equal(key in (old as object), false, key);
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
    const started = { ...emptyDraft(), screening: { access: "no" as const } };
    assert.equal(hasAnswers(started), true);
    assert.equal(nextOpenStep(started), 2);
    const screening = Object.fromEntries(SCREENING_IDS.map((id) => [id, "not_sure"]));
    assert.equal(nextOpenStep({ ...emptyDraft(), screening }), 3);
    assert.equal(nextOpenStep({ ...emptyDraft(), screening, checks: Array.from({ length: 12 }, (_, i) => i + 1) }), 4);
  });

  it("raises a question for every answer except Yes, with no score", () => {
    assert.equal(screeningFollowUpIds(emptyDraft()).length, 5);
    const draft = { ...emptyDraft(), screening: { identify: "yes" as const, records: "no" as const, access: "not_sure" as const } };
    assert.equal(screeningFollowUpIds(draft).length, 4);
    assert.doesNotMatch(fs.readFileSync("client/src/lib/buyer-draft.ts", "utf8"), /\bscore\s*[:=]/i);
  });
});

describe("four-step journey", () => {
  it("uses the same step names in every language file", () => {
    assert.deepEqual(SITE_TEXT.en.steps.map((step) => step.title), [
      "Check the Area & Rate",
      "Filter Risky Land",
      "12-Point Paper & Site Check",
      "Decision Report",
    ]);
    assert.deepEqual(STEPS.map((step) => step.title), SITE_TEXT.en.steps.map((step) => step.title));
  });

  const pages = ["step-1-market-intel", "step-2-filter-risky", "step-3-safety-check", "step-4-decision-report"];
  const read = (page: string) => fs.readFileSync(`client/src/pages/${page}.tsx`, "utf8");
  const siteText = fs.readFileSync("client/src/lib/i18n/site.ts", "utf8");

  it("doesn't use retired names or misleading results", () => {
    const retired = /Pre-Screen|Pre-screen|First Plot Check|Your Plot Summary|Safety Check\b|Safety Checklist|Compare Prices|checks complete|has passed|verified by lawyer|Save Progress/;
    for (const page of [...pages, "four-step-system", "public-home"]) {
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

const OLDER_LOOK = ["public-home", "property-detail", "pre-purchase-wizard", "my-watchlist", "premium-verification", "step-complete", "public-intel", "public", "search", "guides/dharampeth", "awareness-dashboard", "blog-list", "blog-detail", "find-properties"];

describe("site look", () => {
  const routed = fs.readFileSync("client/src/App.tsx", "utf8").matchAll(/from "@\/pages\/([\w/-]+)"/g);
  const old = /(?<![:\w-])(?:bg|text|border)-(?:indigo|blue|violet|purple|sky|cyan|teal|pink|rose|orange)-\d+|font-black|#2180a8/;

  it("keeps every routed page on the navy and gold palette", () => {
    for (const [, page] of routed) {
      // The home page and the restored older pages keep their own look, chosen by the owner.
      if (OLDER_LOOK.includes(page)) continue;
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

describe("legal expert wording", () => {
  // Every wording value, without the key names.
  const values = (node: unknown): string[] =>
    typeof node === "string" ? [node] : node && typeof node === "object" ? Object.values(node).flatMap(values) : [];
  const named = {
    en: /legal expert \(advocate\)/,
    hi: /कानूनी विशेषज्ञ \(वकील\)/,
    mr: /कायदेशीर तज्ज्ञ\S* \(वकील\)/,
  } as const;

  it("names the advocate where a consultation, fee or legal opinion is mentioned", () => {
    for (const code of ["en", "hi", "mr"] as const) {
      const t = SITE_TEXT[code];
      for (const text of [t.contact.intro, t.home.feeNote, t.learn.helpBody, t.step3.advocateBody, t.fourStep.intro]) {
        assert.match(text, named[code], `${code}: ${text}`);
      }
    }
  });

  it("never uses 'advocate' without 'legal expert', or calls the legal role a real estate expert", () => {
    for (const code of ["en", "hi", "mr"] as const) {
      const all = values(SITE_TEXT[code]).join("\n");
      assert.doesNotMatch(all, /real estate expert|property expert|रियल एस्टेट विशेषज्ञ|मालमत्ता तज्ज्ञ|प्रॉपर्टी विशेषज्ञ/i, code);
    }
    assert.doesNotMatch(values(SITE_TEXT.en).join("\n").replace(/legal expert \(advocate\)/g, ""), /advocate/i);
    assert.doesNotMatch(values(SITE_TEXT.hi).join("\n").replace(/\(वकील\)/g, ""), /वकील/);
    assert.doesNotMatch(values(SITE_TEXT.mr).join("\n").replace(/\(वकील\)/g, ""), /वकि|वकी/);
  });
});
