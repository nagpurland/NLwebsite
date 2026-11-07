import crypto from "crypto";
import { z } from "zod";

const SCRYPT_KEYLEN = 64;

// Stored as scrypt$<salt>$<hash>. Older unsalted-style SHA-256 hashes never verify,
// so accounts from before this change must be reset with `npm run admin:set-password`.
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = crypto.scryptSync(password, salt, SCRYPT_KEYLEN);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export const DUMMY_PASSWORD_HASH = hashPassword(generateToken());

// Only a hash of the session token is stored, so a database leak can't be replayed as a login.
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// Every /api route needs a login unless it is listed here. Paths exclude the /api prefix.
const PUBLIC_API: Array<{ method: string; path: RegExp }> = [
  { method: "POST", path: /^\/auth\/login$/ },
  { method: "POST", path: /^\/public\/leads$/ },
  { method: "POST", path: /^\/public\/events$/ },
  { method: "GET", path: /^\/notifications$/ },
  { method: "POST", path: /^\/notifications\/\d+\/click$/ },
];

export function isPublicApi(method: string, path: string): boolean {
  return PUBLIC_API.some((route) => route.method === method && route.path.test(path));
}

// Anonymous counts only: fixed names, with no free text and no visitor id.
export const publicEventSchema = z
  .object({
    event: z.enum([
      "hero_check_click", "hero_guide_click", "sticky_check_click", "start_guide_click", "step_click",
      "checklist_click", "ask_click", "callout_open", "whatsapp_click", "form_start", "form_send", "language_change",
    ]),
    page: z.enum(["home", "inquiry", "contact", "steps", "other"]),
    language: z.enum(["en", "hi", "mr"]),
  })
  .strict();

// What a visitor may send. Status, score and notes stay server-controlled.
export const publicLeadSchema = z
  .object({
    kind: z.enum(["contact", "plot_question", "newsletter"]),
    name: z.string().trim().max(100).optional(),
    phone: z
      .string()
      .trim()
      .regex(/^[+\d][\d\s-]{7,16}$/, "Enter a valid phone number")
      .optional(),
    email: z.string().trim().email().max(200).optional(),
    locality: z.string().trim().max(100).optional(),
    message: z.string().trim().max(2000).optional(),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Please agree to the privacy policy" }),
    }),
    // Hidden field. People never fill it, simple bots do.
    website: z.string().max(200).optional(),
  })
  .superRefine((lead, ctx) => {
    if (lead.kind === "newsletter" && !lead.email) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Email is required" });
    }
    if (lead.kind !== "newsletter" && (!lead.name || !lead.phone)) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Name and phone are required" });
    }
  });
