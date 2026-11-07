// Build switches, set in vercel.json for the live site. That site is static, with no server
// behind it, so the forms can't send anything, and the older unsourced pages stay off it until
// they are sourced (gate condition 16). Local builds and tests leave both on.
export const FORMS_ON = import.meta.env.VITE_FORMS !== "off";
export const OLDER_PAGES_ON = import.meta.env.VITE_OLDER_PAGES !== "off";
