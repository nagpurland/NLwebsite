# Legal Review Checklist

Each row has one status: `Not reviewed`, `Advocate changes requested` or
`Advocate approved`.

An approved row must name the reviewer, the version (the commit reviewed) and the date.
If the text changes after approval, set the row back to `Not reviewed`.
`npm test` enforces these rules, and fails if a routed guide or a Terms or Privacy
section is missing from this list.

| ID | Item | Source | Status | Reviewer | Version | Date | Notes |
|---|---|---|---|---|---|---|---|
| G01 | Ownership verification guide | client/src/pages/guides/ownership-verification.tsx | Not reviewed | | | | Portal address changed; check the steps |
| G02 | Litigation search guide | client/src/pages/guides/litigation-search.tsx | Not reviewed | | | | Portal address changed; check the steps |
| G03 | TP scheme check guide | client/src/pages/guides/tp-scheme-check.tsx | Not reviewed | | | | |
| G04 | Mutations and transfers guide | client/src/pages/guides/mutations-transfers.tsx | Not reviewed | | | | Portal address changed; check the steps |
| G05 | Property tax guide | client/src/pages/guides/property-tax.tsx | Not reviewed | | | | |
| G06 | Encumbrance certificate guide | client/src/pages/guides/encumbrance-certificate.tsx | Not reviewed | | | | |
| G07 | Title verification guide | client/src/pages/guides/title-verification.tsx | Not reviewed | | | | Check the "clear title" definition and "safe property buying" |
| G08 | Identity verification guide | client/src/pages/guides/identity-verification.tsx | Not reviewed | | | | Portal address changed; check the steps |
| G09 | NA conversion guide | client/src/pages/guides/na-conversion.tsx | Not reviewed | | | | Portal address changed; check the steps |
| G10 | Boundary verification guide | client/src/pages/guides/boundary-verification.tsx | Not reviewed | | | | |
| G11 | Possession verification guide | client/src/pages/guides/possession-verification.tsx | Not reviewed | | | | |
| G12 | Neighbor verification guide | client/src/pages/guides/neighbor-verification.tsx | Not reviewed | | | | |
| G13 | Dharampeth area guide | client/src/pages/guides/dharampeth.tsx | Not reviewed | | | | Older page: figures and examples have no source |
| G14 | Area guide pages (Localities and each area) | client/src/pages/localities.tsx | Not reviewed | | | | Rebuilt on 2026-11-07: shows only the dated Square Yards rates from market-snapshot.ts, four generic checks, no legal status, listings or forecasts. Area page: client/src/pages/locality-os.tsx. Refresh the rates with Step 1 |
| T01 | Terms: General information only | client/src/pages/terms.tsx | Not reviewed | | | | Add the service boundaries |
| T02 | Terms: Your decision | client/src/pages/terms.tsx | Not reviewed | | | | |
| T03 | Terms: We don't sell land | client/src/pages/terms.tsx | Not reviewed | | | | Conflicts with planned agent "listing management" |
| P01 | Privacy: What we collect | client/src/pages/privacy.tsx | Not reviewed | | | | Agent details and anonymous action counts are now also collected |
| P02 | Privacy: Why we use it | client/src/pages/privacy.tsx | Not reviewed | | | | Doesn't cover passing an inquiry to the advocate |
| P03 | Privacy: Where it is kept | client/src/pages/privacy.tsx | Not reviewed | | | | Set a real retention period |
| P04 | Privacy: Your choices | client/src/pages/privacy.tsx | Not reviewed | | | | |
| C01 | Home headline and opening panel: "Before you buy land, know what to check" | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C02 | Home points: "We don't sell land", "Step by step", "You stay in control" | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C03 | Home step cards and the two free tools | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C04 | Home lines on advocate review, and on free guides and paid consultations | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C05 | Document notice on the inquiry forms | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C06 | "Agent services won't buy or influence any review" | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C07 | Checklist results: "doesn't establish clear title", and the red, yellow and green flag wording | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C08 | Step 3 advocate card, including "Written legal opinion" | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C09 | Property Summary wording, including the self-reported notice | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C10 | Learn page | client/src/pages/learn.tsx | Not reviewed | | | | |
| C11 | Four-step page | client/src/pages/four-step-system.tsx | Not reviewed | | | | |
| C12 | Footer and guide disclaimer | client/src/components/layout/PublicLayout.tsx | Not reviewed | | | | |
| C13 | Step 1 price guidance, including stamp duty and ready reckoner wording | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C15 | Pre-screen questions and their note | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C16 | Follow-up questions shown in the summary | client/src/lib/i18n/site.ts | Not reviewed | | | | |
| C17 | Nagpur terms: mouza, khasra, 7/12 (Satbara), ferfar, NIT/NMRDA sanction, token | client/src/lib/i18n/site.ts | Not reviewed | | | | Confirm correct and in common local use |
| C18 | Slogan: "Better information. Safer decisions." | client/src/lib/i18n/site.ts | Not reviewed | | | | Owner chose this wording; check whether "safer" implies an outcome |
| C19 | "Free guides", "any fee before you pay" and the inquiry "What happens next" steps | client/src/lib/i18n/site.ts | Not reviewed | | | | Owner plans paid consultations; wording depends on who charges |
| C20 | Step 1 market snapshot: third-party asking rates and context, refreshed every six months | client/src/lib/market-snapshot.ts | Not reviewed | | | | Checked 2026-11-07 |
| H01 | Hindi wording of the home page, four steps, forms and notices | client/src/lib/i18n/site.ts | Not reviewed | | | | Drafted by AI; needs a Hindi-speaking reviewer and the advocate |
| M01 | Marathi wording of the home page, four steps, forms and notices | client/src/lib/i18n/site.ts | Not reviewed | | | | Drafted by AI; needs a Marathi-speaking reviewer and the advocate |
| L01 | Hindi and Marathi Privacy, Terms and guides | client/src/components/layout/PublicLayout.tsx | Not reviewed | | | | English only for now; translate after the advocate approves the English |
