// Counts actions on the public site. It sends only an event name, the page type and the
// language: no names, numbers, form text, cookies or visitor ids.
export const TRACKED_EVENTS = [
  "hero_check_click",
  "hero_guide_click",
  "sticky_check_click",
  "start_guide_click",
  "step_click",
  "checklist_click",
  "ask_click",
  "callout_open",
  "whatsapp_click",
  "form_start",
  "form_send",
  "language_change",
] as const;

export type TrackedEvent = (typeof TRACKED_EVENTS)[number];

function pageType(): "home" | "inquiry" | "contact" | "steps" | "other" {
  const path = window.location.pathname;
  if (path === "/") return "home";
  if (path === "/plot-checkup") return "inquiry";
  if (path === "/contact") return "contact";
  if (path.startsWith("/step-") || path === "/4-step-system") return "steps";
  return "other";
}

export function track(event: TrackedEvent) {
  try {
    const body = JSON.stringify({ event, page: pageType(), language: document.documentElement.lang });
    const sent = navigator.sendBeacon?.("/api/public/events", new Blob([body], { type: "application/json" }));
    if (!sent) {
      void fetch("/api/public/events", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => undefined);
    }
  } catch {
    // Counting must never get in the way of the visitor.
  }
}
