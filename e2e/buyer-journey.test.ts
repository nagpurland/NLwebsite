// Walks the four steps in a real browser. Needs Chrome and a running site:
// BASE_URL=http://localhost:5000 npm run test:e2e
import { after, before, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { chromium, type Browser, type Page } from "playwright-core";

const base = process.env.BASE_URL;
if (!base) throw new Error("Set BASE_URL to a running copy of the site");

const STEP_LINKS = ["/step-1-market-intel", "/step-2-filter-risky", "/step-3-safety-check", "/step-4-decision-report"];

for (const [label, viewport] of [["desktop", { width: 1280, height: 800 }], ["phone", { width: 375, height: 812 }]] as const) {
  describe(`buyer journey on ${label}`, () => {
    let browser: Browser;
    let page: Page;
    let requestBodies: string[] = [];

    before(async () => {
      browser = await chromium.launch({ channel: "chrome", headless: true });
    });

    after(async () => {
      await browser?.close();
    });

    beforeEach(async () => {
      const context = await browser.newContext({ viewport });
      page = await context.newPage();
      requestBodies = [];
      page.on("request", (request) => {
        const body = request.postData();
        if (body) requestBodies.push(body);
      });
    });

    const fillAnswers = async () => {
      await page.goto(`${base}${STEP_LINKS[1]}`);
      await page.getByTestId("screening-access").getByText("No", { exact: true }).click();
    };

    it("carries answers from Steps 1 to 3 into the summary, without sending them", async () => {
      await page.goto(`${base}${STEP_LINKS[0]}`);
      await page.getByTestId("button-next-step").click();
      await page.waitForURL(`**${STEP_LINKS[1]}`);
      await page.getByTestId("screening-identify").getByText("Yes", { exact: true }).click();
      await page.getByTestId("screening-access").getByText("No", { exact: true }).click();
      assert.equal(await page.getByTestId("screening-count").innerText(), "2 of 5 answered");

      await page.getByTestId("button-next-step").click();
      await page.waitForURL(`**${STEP_LINKS[2]}`);
      await page.getByTestId("check-item-1").locator("div").first().click();

      // Leaves through the page's own button, with no separate save.
      await page.getByTestId("button-next-step").click();
      await page.waitForURL(`**${STEP_LINKS[3]}`);

      assert.match(await page.getByTestId("summary-identify").innerText(), /Yes/);
      assert.match(await page.getByTestId("summary-access").innerText(), /No/);
      assert.match(await page.getByTestId("summary-records").innerText(), /Not answered/);
      assert.match(await page.getByTestId("section-prescreen").innerText(), /3 not answered/);
      assert.match(await page.getByTestId("section-summary").innerText(), /1 of 12 marked by you/);
      assert.match(await page.getByTestId("list-done").innerText(), /ownership name/);
      assert.match(await page.getByTestId("section-advocate-questions").innerText(), /How is the plot reached/);

      assert.equal(requestBodies.some((body) => /screening|"access"|not_sure/.test(body)), false, "answers were sent");
    });

    it("restores answers after a reload", async () => {
      await page.goto(`${base}${STEP_LINKS[1]}`);
      await page.getByTestId("screening-access").getByText("Not sure", { exact: true }).click();
      await page.reload();
      assert.equal(await page.getByTestId("screening-count").innerText(), "1 of 5 answered");
      assert.equal(await page.getByTestId("screening-access").getByLabel("Not sure").isChecked(), true);
    });

    it("shows missing information plainly on an empty summary", async () => {
      await page.goto(`${base}${STEP_LINKS[3]}`);
      assert.equal(await page.getByTestId("section-location-price").count(), 0);
      assert.match(await page.getByTestId("section-prescreen").innerText(), /5 not answered/);
      assert.match(await page.getByTestId("section-summary").innerText(), /0 of 12/);
      assert.match(await page.getByTestId("self-reported-notice").innerText(), /self-reported/);
    });

    it("doesn't announce success when every answer is positive", async () => {
      await page.goto(`${base}${STEP_LINKS[1]}`);
      for (const id of ["identify", "records", "approvals", "access", "concerns"]) {
        await page.getByTestId(`screening-${id}`).getByText("Yes", { exact: true }).click();
      }
      await page.goto(`${base}${STEP_LINKS[2]}`);
      for (let id = 1; id <= 12; id++) await page.getByTestId(`check-item-${id}`).locator("div").first().click();
      const checklist = await page.locator("body").innerText();
      assert.doesNotMatch(checklist, /passed|checks complete/i);
      assert.match(checklist, /no one has verified it/i);

      await page.goto(`${base}${STEP_LINKS[3]}`);
      const summary = await page.locator("main").innerText();
      assert.doesNotMatch(summary, /\b(passed|verified plot|plot is safe\.|safe to buy|clear title confirmed)\b/i);
      assert.match(summary, /doesn't establish clear title/);
      assert.match(summary, /a legal expert should still review/i);
    });

    it("deletes answers and starts a new plot", async () => {
      await fillAnswers();
      await page.goto(`${base}${STEP_LINKS[3]}`);
      page.once("dialog", (dialog) => dialog.accept());
      await page.getByTestId("button-reset-draft").click();
      await page.waitForURL(`**${STEP_LINKS[0]}`);
      const stored = await page.evaluate(() => Object.keys(localStorage));
      assert.deepEqual(stored, []);
      await page.goto(`${base}${STEP_LINKS[3]}`);
      assert.match(await page.getByTestId("section-prescreen").innerText(), /5 not answered/);
    });

    it("keeps answers when the buyer cancels the delete", async () => {
      await fillAnswers();
      await page.goto(`${base}${STEP_LINKS[3]}`);
      page.once("dialog", (dialog) => dialog.dismiss());
      await page.getByTestId("button-reset-draft").click();
      assert.match(await page.getByTestId("summary-access").innerText(), /No/);
    });

    it("sends the homepage cards to the matching steps", async () => {
      for (let step = 1; step <= 4; step++) {
        await page.goto(`${base}/`);
        await page.getByTestId(`home-step-${step}`).click();
        await page.waitForURL(`**${STEP_LINKS[step - 1]}`);
        assert.equal(await page.getByTestId("step-indicator").innerText(), `Step ${step} of 4`);
      }
    });

    it("has no sideways scrolling or dead internal links on the journey", async () => {
      const links = new Set<string>();
      for (const path of ["/", "/4-step-system", ...STEP_LINKS, "/plot-checkup"]) {
        await page.goto(`${base}${path}`);
        const size = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
        assert.ok(size.scroll <= size.width, `${path} scrolls sideways: ${size.scroll} > ${size.width}`);
        for (const href of await page.locator('a[href^="/"]').evaluateAll((items) => items.map((a) => a.getAttribute("href")))) {
          if (href) links.add(href);
        }
      }
      for (const href of links) {
        await page.goto(`${base}${href}`);
        assert.equal(await page.getByText("Page Not Found", { exact: false }).count(), 0, `${href} is dead`);
      }
    });

    it("changes language, keeps it after a reload, and keeps the answers", async () => {
      await page.goto(`${base}${STEP_LINKS[1]}`);
      await page.getByTestId("screening-access").locator('input[data-answer="no"]').check({ force: true });

      await page.getByTestId("lang-hi").click();
      assert.equal(await page.locator("html").getAttribute("lang"), "hi");
      assert.match(await page.getByTestId("step-title").innerText(), /जोखिम वाली ज़मीन छाँटें/);
      assert.match(await page.getByTestId("screening-identify").innerText(), /मौजा, खसरा/);
      await page.reload();
      assert.match(await page.getByTestId("step-title").innerText(), /जोखिम वाली ज़मीन छाँटें/);

      await page.getByTestId("lang-mr").click();
      assert.equal(await page.locator("html").getAttribute("lang"), "mr");
      assert.match(await page.getByTestId("step-title").innerText(), /धोकादायक जमीन बाजूला करा/);
      assert.match(await page.getByTestId("screening-count").innerText(), /5 पैकी 1/);

      await page.goto(`${base}${STEP_LINKS[3]}`);
      assert.match(await page.getByTestId("summary-access").innerText(), /नाही/);
      assert.match(await page.getByTestId("section-advocate-questions").innerText(), /प्लॉटपर्यंत कसे जाता येते/);
    });

    it("says when a page is English only, in the buyer's language", async () => {
      await page.goto(`${base}/privacy`);
      assert.equal(await page.getByTestId("english-only-notice").count(), 0);
      await page.getByTestId("lang-mr").click();
      assert.match(await page.getByTestId("english-only-notice").innerText(), /फक्त इंग्रजीत/);
      await page.goto(`${base}/locality/mihan`);
      assert.equal(await page.getByTestId("english-only-notice").count(), 1);
      await page.goto(`${base}/`);
      assert.equal(await page.getByTestId("english-only-notice").count(), 0);
    });

    it("shows the document warning in each language", async () => {
      await page.goto(`${base}/plot-checkup`);
      assert.match(await page.getByTestId("document-notice").innerText(), /Do not upload/);
      await page.getByTestId("lang-hi").click();
      assert.match(await page.getByTestId("document-notice").innerText(), /अपलोड न करें/);
      await page.getByTestId("lang-mr").click();
      assert.match(await page.getByTestId("document-notice").innerText(), /अपलोड करू नका/);
    });

    it("opens Learn with all 12 guides and links them from the checklist too", async () => {
      await page.goto(`${base}/learn`);
      assert.equal(await page.locator('[data-testid^="learn-guide-"]').count(), 12);
      assert.match(await page.getByTestId("learn-trust").innerText(), /don't take commission/);
      await page.getByTestId("learn-guide-7").click();
      await page.waitForURL("**/guide/title-verification");
      await page.getByTestId("site-footer").getByTestId("footer-learn").click();
      await page.waitForURL("**/learn");
      await page.goto(`${base}/invest-safely`);
      await page.waitForURL("**/learn");
      await page.goto(`${base}/step-3-safety-check`);
      await page.getByTestId("expand-8").click();
      assert.equal(await page.getByTestId("read-guide-8").getAttribute("href"), "/guide/litigation-search");
    });

    it("shows the old Step 2 sections around the five questions", async () => {
      await page.goto(`${base}/step-2-filter-risky`);
      for (const id of ["section-why-filtering", "section-filtering-criteria", "section-screening", "section-checklist"]) {
        assert.equal(await page.getByTestId(id).count(), 1, id);
      }
      assert.equal(await page.locator('[data-testid^="criteria-card-"]').count(), 5);
      assert.equal(await page.locator('[data-testid^="checklist-item-"]').count(), 8);
      await page.getByTestId("checklist-item-1").click();
      assert.match(await page.getByTestId("tick-count").innerText(), /^1 of 8/);
      assert.doesNotMatch(await page.locator("main").innerText(), /\d+%|\d+x higher|success rate/i);
      await page.getByTestId("button-jump-report").click();
      await page.waitForURL("**/step-4-decision-report");
    });

    it("opens every restored older page and links them from the home page", async () => {
      await page.goto(`${base}/`);
      assert.equal(await page.getByTestId("home-explore-1").getAttribute("href"), "/localities");
      assert.equal(await page.getByTestId("home-checks").locator("li").count(), 12);
      assert.match(await page.getByTestId("home-checks").innerText(), /Road access and no TP scheme restriction/);
      assert.equal(await page.getByTestId("link-hero-checklist").innerText(), "Skip to the 12-point checklist");
      const paths = [
        "/localities", "/public/localities", "/locality/mihan", "/locality/besa", "/public/blog", "/blog", "/public/intel",
        "/public/search", "/search", "/pre-purchase-wizard", "/premium-verification", "/step-complete", "/my-watchlist",
        "/area-guide/dharampeth", "/awareness", "/find-properties",
      ];
      for (const path of paths) {
        await page.goto(`${base}${path}`);
        assert.equal(await page.getByText("Page Not Found", { exact: false }).count(), 0, `${path} is missing`);
        assert.ok((await page.locator("main").innerText()).length > 50, `${path} is empty`);
      }
    });

    it("shows only sourced figures on the area pages and opens the right area", async () => {
      await page.goto(`${base}/localities`);
      assert.equal(await page.locator('[data-testid^="area-card-"]').count(), 6);
      for (const id of ["mihan", "besa", "hingna"]) {
        assert.match((await page.getByTestId(`area-source-${id}`).getAttribute("href")) ?? "", /^https:\/\/www\.squareyards\.com\//, id);
      }
      for (const id of ["wardha-road", "civil-lines", "manish-nagar"]) {
        assert.match(await page.getByTestId(`area-rate-${id}`).innerText(), /No rate we can source yet/, id);
      }
      const text = await page.locator("main").innerText();
      assert.doesNotMatch(text, /active listings|Rental Yield|Legal Risk|Proprietary|Verified Projects|Legal Transparency|Appreciation|Confidence Score|Unable to load/i);
      for (const [id, name] of [["hingna", "Hingna"], ["wardha-road", "Wardha Road"], ["besa", "Besa"]]) {
        await page.goto(`${base}/locality/${id}`);
        assert.equal(await page.getByTestId("area-title").innerText(), name);
        assert.equal(await page.locator('[data-testid^="area-check-"]').count(), 4);
      }
      await page.goto(`${base}/locality/not-an-area`);
      await page.waitForURL(/\/localities$/);
    });

    it("shows the dated, sourced market snapshot on Step 1", async () => {
      await page.goto(`${base}${STEP_LINKS[0]}`);
      assert.equal(await page.locator('[data-testid^="learn-card-"]').count(), 5);
      assert.equal(await page.getByTestId("plot-cost-calculator").count(), 0);
      assert.equal(await page.locator('[data-testid^="learn-how-"]').count(), 0);
      assert.match(await page.getByTestId("learn-card-4").innerText(), /Divide the asking price by the plot size/);
      assert.equal(await page.getByTestId("link-learn-igr").getAttribute("href"), "https://igrmaharashtra.gov.in");
      assert.equal(await page.getByTestId("link-learn-igr").getAttribute("rel"), "noopener noreferrer");
      assert.equal(await page.getByTestId("link-learn-snapshot").getAttribute("href"), "#market-snapshot");
      assert.equal(await page.locator("#market-snapshot").count(), 1);
      assert.match(await page.getByTestId("learn-card-1").innerText(), /Price Trends Analysis/);
      assert.equal(await page.locator('[data-testid^="snapshot-row-"]').count(), 5);
      for (const id of ["mihan", "besa", "hingna"]) {
        assert.match((await page.getByTestId(`snapshot-source-${id}`).getAttribute("href")) ?? "", /^https:\/\/www\.squareyards\.com\//, id);
      }
      assert.match(await page.getByTestId("snapshot-row-civil-lines").innerText(), /No source we can name/);
      assert.match(await page.getByTestId("figures-note").innerText(), /not NagpurLand's own data/);
      assert.equal(await page.getByTestId("snapshot-context").locator("a").count(), 2);
      assert.match(await page.getByTestId("snapshot-checked").innerText(), /Checked on/);
    });

    it("lets a buyer call, WhatsApp or book a consultation", async () => {
      await page.goto(`${base}/contact`);
      assert.match((await page.getByTestId("contact-call").getAttribute("href")) ?? "", /^tel:\+91\d{10}$/);
      assert.match((await page.getByTestId("contact-whatsapp").getAttribute("href")) ?? "", /^https:\/\/wa\.me\/91\d{10}/);
      assert.match(await page.getByTestId("booking-fee-note").innerText(), /fee before you confirm/);
      await page.getByTestId("booking-day-2").click();
      await page.getByTestId("booking-time-evening").click();
      assert.equal(await page.getByTestId("booking-time-evening").getAttribute("aria-pressed"), "true");
      await page.fill("#lead-name", "Booking Test");
      await page.fill("#lead-phone", "+91 98230 12345");
      await page.getByTestId("checkbox-consent").click();
      const [request] = await Promise.all([
        page.waitForRequest("**/api/public/leads"),
        page.getByTestId("button-submit-lead").click(),
      ]);
      const sent = request.postDataJSON();
      assert.equal(sent.kind, "consultation");
      assert.match(sent.message, /^Consultation preferred: .*Evening$/);
      assert.match(await page.getByTestId("form-success").innerText(), /isn't confirmed yet/);
    });

    it("has no sideways scrolling in Hindi or Marathi", async () => {
      for (const code of ["hi", "mr"]) {
        await page.goto(`${base}/`);
        await page.getByTestId(`lang-${code}`).click();
        for (const path of ["/", "/4-step-system", ...STEP_LINKS, "/plot-checkup", "/contact", "/learn", "/localities", "/for-agents"]) {
          await page.goto(`${base}${path}`);
          const size = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
          assert.ok(size.scroll <= size.width, `${code} ${path} scrolls sideways: ${size.scroll} > ${size.width}`);
        }
      }
    });

    it("shows the main action on the first screen of the home page", async () => {
      await page.goto(`${base}/`);
      const button = await page.getByTestId("button-hero-guide").boundingBox();
      assert.ok(button && button.y + button.height <= viewport.height, "main button is below the first screen");
    });

    it("keeps the home page short and fits a small phone", async () => {
      await page.setViewportSize({ width: 320, height: 640 });
      for (const code of ["en", "hi", "mr"]) {
        await page.goto(`${base}/`);
        await page.getByTestId(`lang-${code}`).click();
        const size = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
        assert.ok(size.scroll <= size.width, `${code} scrolls sideways at 320px: ${size.scroll}`);
      }
      await page.setViewportSize({ width: 375, height: 812 });
      await page.getByTestId("lang-en").click();
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      assert.ok(height <= 5000, `home page is ${height}px tall on a phone`);
    });

    it("shows the light hero with its trust line and opens each land topic from the picture", async () => {
      await page.goto(`${base}/`);
      assert.match(await page.getByTestId("hero-kicker").innerText(), /For plot buyers in Nagpur/);
      assert.equal(await page.getByTestId("hero-trust").locator("li").count(), 4);
      assert.match(await page.getByTestId("section-hero").innerText(), /legal expert \(advocate\)/);
      assert.equal(await page.getByTestId("section-points").locator("h3").count(), 3);
      assert.equal(await page.getByTestId("callout-detail").count(), 0);
      await page.getByTestId("callout-ownership").click();
      assert.match(await page.getByTestId("callout-detail").innerText(), /7\/12/);
      await page.getByTestId("callout-boundary").click();
      assert.match(await page.getByTestId("callout-detail").innerText(), /survey stones/);
      await page.getByTestId("callout-guide").click();
      await page.waitForURL("**/guide/boundary-verification");
    });

    it("says what is free and what is paid, and links to booking", async () => {
      await page.goto(`${base}/`);
      assert.match(await page.getByTestId("home-fee-note").innerText(), /Guides are free\. Consultations .* are paid/);
      await page.getByTestId("button-book-consultation").click();
      await page.waitForURL("**/contact");
      assert.equal(await page.getByTestId("consultation-booking").count(), 1);
    });

    it("marks nothing as verified on the home page", async () => {
      await page.goto(`${base}/`);
      assert.match(await page.getByTestId("home-tools-note").innerText(), /not legal advice/);
      const text = await page.locator("main").innerText();
      assert.doesNotMatch(text, /verified|guarantee|100%|safe to buy/i);
      await page.getByTestId("button-hero-guide").click();
      await page.waitForURL(`**${STEP_LINKS[0]}`);
    });

    it("shows the footer artwork and keeps the design's shape from tablet width up", async () => {
      await page.goto(`${base}/`);
      await page.waitForLoadState("networkidle");
      for (const id of ["footer-dome", "footer-branch"]) {
        assert.equal(await page.getByTestId(id).isVisible(), true, id);
        assert.ok(await page.getByTestId(id).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), `${id} did not load`);
      }
      for (const width of [804, 1024, 1280, 1440]) {
        await page.setViewportSize({ width, height: 800 });
        const scale = Math.min(width, 1280) / 1024;
        const box = await page.getByTestId("site-footer").boundingBox();
        const dome = await page.getByTestId("footer-dome").boundingBox();
        assert.ok(box && box.height >= 200 * scale, `footer height at ${width}: ${box?.height}`);
        assert.ok(dome && Math.abs(dome.width - 320 * scale) < 4, `dome width at ${width}: ${dome?.width}`);
        const scroll = await page.evaluate(() => document.documentElement.scrollWidth);
        assert.ok(scroll <= width, `sideways scroll at ${width}: ${scroll}`);
      }
    });

    it("links to the agent page from the footer", async () => {
      await page.goto(`${base}/`);
      await page.getByTestId("footer-agents").click();
      await page.waitForURL("**/for-agents");
    });

    it("sends a short inquiry, says what happens next and counts it anonymously", async () => {
      // Beacon bodies aren't visible to the test, so the page's own beacon call is recorded instead.
      await page.addInitScript({
        content: `
          window.sentEvents = [];
          Object.defineProperty(navigator, "sendBeacon", {
            value: (url, body) => {
              body.text().then((text) => window.sentEvents.push(text));
              return true;
            },
          });
        `,
      });
      await page.goto(`${base}/plot-checkup`);
      assert.equal(await page.locator("#lead-email").count(), 0);
      assert.match(await page.getByTestId("inquiry-promise").innerText(), /any fee before you pay/);
      assert.match(await page.getByTestId("what-happens-next").innerText(), /What happens next/);
      await page.fill("#lead-name", "Short Form Test");
      await page.fill("#lead-phone", "+91 98230 12345");
      await page.fill("#lead-locality", "Besa");
      await page.getByTestId("checkbox-consent").click();
      await page.getByTestId("button-submit-lead").click();
      await page.getByTestId("form-success").waitFor();
      assert.equal(await page.getByTestId("success-next-step").isVisible(), true);
      await page.waitForTimeout(300);
      const events = await page.evaluate(() => (window as unknown as { sentEvents: string[] }).sentEvents);
      assert.ok(events.some((body) => body.includes("form_start")), "form start not counted");
      assert.ok(events.some((body) => body.includes("form_send")), "form send not counted");
      assert.equal(events.some((body) => /Short Form|98230|Besa/.test(body)), false, "personal details were sent");
    });

    it("prints only the summary", async () => {
      await page.goto(`${base}${STEP_LINKS[3]}`);
      await page.emulateMedia({ media: "print" });
      assert.equal(await page.locator("header").isVisible(), false);
      assert.equal(await page.locator("footer").isVisible(), false);
      assert.equal(await page.getByTestId("button-print-summary").isVisible(), false);
      assert.equal(await page.getByTestId("self-reported-notice").isVisible(), true);
    });
  });
}

describe("WhatsApp button", () => {
  it("shows the round button on a phone, except on the inquiry page", async () => {
    const browser = await chromium.launch({ channel: "chrome", headless: true });
    const phone = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await phone.goto(`${base}/`);
    assert.equal(await phone.getByRole("button", { name: "Message us on WhatsApp" }).isVisible(), true);
    await phone.goto(`${base}/plot-checkup`);
    assert.equal(await phone.getByRole("button", { name: "Message us on WhatsApp" }).isVisible(), false);
    const wide = await browser.newPage({ viewport: { width: 1024, height: 800 } });
    await wide.goto(`${base}/`);
    assert.equal(await wide.getByRole("button", { name: "Message us on WhatsApp" }).isVisible(), true);
    await browser.close();
  });

  it("keeps tablet text and buttons usable", async () => {
    const browser = await chromium.launch({ channel: "chrome", headless: true });
    for (const width of [700, 804, 900]) {
      const tablet = await browser.newPage({ viewport: { width, height: 800 } });
      await tablet.goto(`${base}/`);
      const result = await tablet.evaluate(() => {
        const texts = [...document.querySelectorAll("main *, footer *, header *")].filter(
          (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent?.trim()) && e.getBoundingClientRect().width > 0,
        );
        return {
          smallest: Math.min(...texts.map((e) => parseFloat(getComputedStyle(e).fontSize))),
          button: Math.min(...[...document.querySelectorAll('.old-home a[data-testid^="button-hero"], .old-home a[data-testid^="home-step-"]')].map((e) => e.getBoundingClientRect().height)),
          scroll: document.documentElement.scrollWidth,
        };
      });
      assert.ok(result.smallest >= 10, `smallest text at ${width}: ${result.smallest}`);
      assert.ok(result.button >= 40, `smallest button at ${width}: ${result.button}`);
      assert.ok(result.scroll <= width, `sideways scroll at ${width}: ${result.scroll}`);
    }
    await browser.close();
  });
});
