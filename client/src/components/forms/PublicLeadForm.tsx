import { useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import { track } from "@/lib/track";

export async function submitPublicLead(data: Record<string, unknown>) {
  const res = await fetch("/api/public/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || "Could not send your request. Please try again.");
  }
}

export function ConsentCheckbox({
  checked,
  onChange,
  dark,
  text,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  dark?: boolean;
  text?: string;
}) {
  const t = useTranslation();
  return (
    <div className="flex items-start gap-3 text-left">
      <Checkbox
        id="consent"
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
        className={dark ? "mt-0.5 border-white data-[state=checked]:bg-white data-[state=checked]:text-primary" : "mt-0.5"}
        data-testid="checkbox-consent"
      />
      <Label htmlFor="consent" className={`text-sm font-normal leading-snug ${dark ? "text-white/80" : "text-slate-600"}`}>
        {text ?? t.forms.consent} {t.forms.seePolicy}{" "}
        <Link href="/privacy" className="underline">{t.forms.policy}</Link>.
      </Label>
    </div>
  );
}

export function PublicLeadForm({
  kind,
  submitLabel,
  messageLabel,
  showLocality,
  successTitle,
  successText,
  documentNotice,
  short,
  successActions,
}: {
  documentNotice?: boolean;
  short?: boolean;
  successActions?: ReactNode;
  kind: "contact" | "plot_question";
  submitLabel: string;
  messageLabel?: string;
  showLocality?: boolean;
  successTitle: string;
  successText: string;
}) {
  const t = useTranslation();
  const [values, setValues] = useState({ name: "", phone: "", email: "", locality: "", message: "", website: "" });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const started = useRef(false);

  const set = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError(t.forms.consentRequired);
      return;
    }
    setError("");
    setSending(true);
    try {
      await submitPublicLead({
        kind,
        consent,
        name: values.name,
        phone: values.phone,
        email: values.email || undefined,
        locality: values.locality || undefined,
        message: values.message || undefined,
        website: values.website || undefined,
      });
      setSent(true);
      track("form_send");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.forms.sendFailed);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-8" data-testid="form-success" role="status">
        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-primary mb-2">{successTitle}</h2>
        <p className="text-slate-600">{successText}</p>
        {successActions && <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">{successActions}</div>}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      onFocusCapture={() => {
        if (!started.current) {
          started.current = true;
          track("form_start");
        }
      }}
    >
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="lead-name">{t.forms.name}</Label>
          <Input id="lead-name" value={values.name} onChange={set("name")} className="h-12" required maxLength={100} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-phone">{t.forms.phone}</Label>
          <Input id="lead-phone" type="tel" value={values.phone} onChange={set("phone")} className="h-12" required />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {!short && (
          <div className="space-y-2">
            <Label htmlFor="lead-email">{t.forms.email}</Label>
            <Input id="lead-email" type="email" value={values.email} onChange={set("email")} className="h-12" />
          </div>
        )}
        {showLocality && (
          <div className="space-y-2">
            <Label htmlFor="lead-locality">{t.forms.locality}</Label>
            <Input id="lead-locality" value={values.locality} onChange={set("locality")} placeholder={t.forms.localityExample} className="h-12" required maxLength={100} />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lead-message">{messageLabel ?? t.forms.question}</Label>
        <Textarea id="lead-message" value={values.message} onChange={set("message")} rows={short ? 3 : 5} required={!short} maxLength={2000} />
      </div>
      {/* Hidden from people. Bots that fill it are ignored by the server. */}
      <input type="text" name="website" value={values.website} onChange={set("website")} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {documentNotice && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900" role="note" data-testid="document-notice">
          {t.forms.documentNotice}
        </p>
      )}
      <ConsentCheckbox checked={consent} onChange={setConsent} />
      {error && <p className="text-sm font-medium text-red-600" role="alert">{error}</p>}
      <Button type="submit" disabled={sending} className="w-full h-14 font-bold text-base" data-testid="button-submit-lead">
        {sending ? t.forms.sending : submitLabel}
      </Button>
    </form>
  );
}
