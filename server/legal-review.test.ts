import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import { isPublicApi } from "./auth";

const read = (path: string) => fs.readFileSync(path, "utf8");
const STATUSES = ["Not reviewed", "Advocate changes requested", "Advocate approved"];

const checklist = read("docs/legal/REVIEW-CHECKLIST.md");
const rows = checklist
  .split("\n")
  .filter((line) => /^\| [A-Z]\d{2} \|/.test(line))
  .map((line) => {
    const [id, item, source, status, reviewer, version, date] = line.split("|").slice(1, -1).map((cell) => cell.trim());
    return { id, item, source, status, reviewer, version, date };
  });

describe("legal review checklist", () => {
  it("uses only the agreed statuses", () => {
    assert.ok(rows.length > 0);
    for (const row of rows) assert.ok(STATUSES.includes(row.status), `${row.id}: ${row.status}`);
  });

  it("records reviewer, version and date on every approval", () => {
    for (const row of rows.filter((r) => r.status === "Advocate approved")) {
      assert.ok(row.reviewer, `${row.id} has no reviewer`);
      assert.match(row.version, /^[0-9a-f]{7,40}$/, `${row.id} has no commit version`);
      assert.match(row.date, /^\d{4}-\d{2}-\d{2}$/, `${row.id} has no date`);
    }
  });

  it("points only at files that exist", () => {
    for (const row of rows) assert.ok(fs.existsSync(row.source), `${row.id}: ${row.source}`);
  });

  it("lists every routed guide", () => {
    const guides = read("client/src/App.tsx").matchAll(/@\/pages\/guides\/([\w-]+)/g);
    for (const [, guide] of guides) {
      const source = `client/src/pages/guides/${guide}.tsx`;
      assert.ok(rows.some((row) => row.source === source), `${source} is not on the checklist`);
    }
  });

  it("lists every Terms and Privacy section", () => {
    for (const [name, label] of [["terms", "Terms"], ["privacy", "Privacy"]]) {
      const sections = read(`client/src/pages/${name}.tsx`).matchAll(/<h2[^>]*>([^<]+)<\/h2>/g);
      for (const [, section] of sections) {
        assert.ok(rows.some((row) => row.item === `${label}: ${section}`), `${label}: ${section} is not on the checklist`);
      }
    }
  });
});

describe("while the readiness gate is closed", () => {
  it("keeps document uploads and payments out of the public API", () => {
    for (const path of ["/documents", "/public/documents", "/upload", "/public/upload", "/payments", "/public/payments"]) {
      assert.equal(isPublicApi("POST", path), false, path);
    }
  });

  it("keeps the document notice on both inquiry forms", () => {
    assert.match(read("client/src/lib/i18n/site.ts"), /Do not upload or send property deeds/);
    assert.match(read("client/src/components/forms/PublicLeadForm.tsx"), /t\.forms\.documentNotice/);
    for (const page of ["plot-checkup", "contact"]) {
      assert.match(read(`client/src/pages/${page}.tsx`), /documentNotice/, page);
    }
  });

  it("sends inquiries only to the number set in brand.ts, never a placeholder", () => {
    for (const file of fs.readdirSync("client/src/pages")) {
      if (file.endsWith(".tsx")) assert.doesNotMatch(read(`client/src/pages/${file}`), /9876543210|help@nagpurland\.com/, file);
    }
  });

  it("doesn't tell a buyer the plot passed", () => {
    for (const file of ["pages/step-2-filter-risky.tsx", "pages/step-3-safety-check.tsx", "lib/i18n/site.ts"]) {
      assert.doesNotMatch(read(`client/src/${file}`), /has passed/i, file);
    }
  });
});
