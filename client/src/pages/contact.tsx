import { useMemo, useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PublicLeadForm } from "@/components/forms/PublicLeadForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MessageSquare, Phone } from "lucide-react";
import { CONTACT, phoneDisplay, whatsappUrl } from "@/lib/brand";
import { useI18n } from "@/lib/i18n/context";

const TIMES = ["morning", "afternoon", "evening"] as const;
const ENGLISH_TIMES = { morning: "Morning", afternoon: "Afternoon", evening: "Evening" };
const DATE_FORMAT: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" };

function nextDays(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const day = new Date();
    day.setDate(day.getDate() + index + 1);
    return day;
  });
}

function Choice({ selected, onClick, testId, children }: { selected: boolean; onClick: () => void; testId: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      data-testid={testId}
      className={`min-h-11 rounded-md border px-1 py-2 text-sm font-medium transition-colors ${selected ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background text-foreground hover:border-primary"}`}
    >
      {children}
    </button>
  );
}

export default function Contact() {
  const { language, t } = useI18n();
  const s = t.contact;
  const days = useMemo(() => nextDays(7), []);
  const [dayIndex, setDayIndex] = useState(0);
  const [time, setTime] = useState<(typeof TIMES)[number]>("morning");
  const locale = `${language}-IN`;

  return (
    <PublicLayout>
      <div className="py-12 md:py-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl text-primary mb-4">{s.title}</h1>
          <p className="text-slate-600 mb-6">{s.intro}</p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            <a href={`tel:+${CONTACT.phone}`} data-event="call_click" data-testid="contact-call">
              <Button className="w-full h-auto min-h-14 py-2 gap-3 text-base font-semibold">
                <Phone className="h-5 w-5" />
                <span className="text-left leading-tight">
                  {s.call}
                  <span className="block text-sm font-normal" dir="ltr">{phoneDisplay()}</span>
                </span>
              </Button>
            </a>
            <a href={whatsappUrl(t.nav.whatsappMessage)} target="_blank" rel="noopener noreferrer" data-event="whatsapp_click" data-testid="contact-whatsapp">
              <Button className="w-full h-auto min-h-14 py-2 gap-3 text-base font-semibold bg-green-700 hover:bg-green-800 text-white">
                <MessageSquare className="h-5 w-5" />
                {s.whatsapp}
              </Button>
            </a>
          </div>

          <Card className="mb-6" data-testid="consultation-booking">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl text-primary mb-2">{s.bookTitle}</h2>
              <p className="text-slate-600 mb-6">{s.bookBody}</p>
              <PublicLeadForm
                kind="consultation"
                short
                documentNotice
                messageLabel={s.messageLabel}
                messagePrefix={`Consultation preferred: ${days[dayIndex].toLocaleDateString("en-IN", DATE_FORMAT)}, ${ENGLISH_TIMES[time]}`}
                submitLabel={s.submit}
                successTitle={s.successTitle}
                successText={s.successText}
                beforeFields={
                  <>
                    <div className="space-y-2">
                      <Label>{s.bookDay}</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {days.map((day, index) => (
                          <Choice key={day.toISOString()} selected={dayIndex === index} onClick={() => setDayIndex(index)} testId={`booking-day-${index}`}>
                            <span className="block">{day.toLocaleDateString(locale, { weekday: "short" })}</span>
                            <span className="block whitespace-nowrap">{day.toLocaleDateString(locale, { day: "numeric", month: "short" })}</span>
                          </Choice>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>{s.bookTime}</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {TIMES.map((option) => (
                          <Choice key={option} selected={time === option} onClick={() => setTime(option)} testId={`booking-time-${option}`}>
                            {s[option]}
                          </Choice>
                        ))}
                      </div>
                    </div>
                  </>
                }
                afterFields={<p className="text-sm text-slate-600" data-testid="booking-fee-note">{s.feeNote}</p>}
              />
            </CardContent>
          </Card>

          {CONTACT.email && <a href={`mailto:${CONTACT.email}`} className="text-sm underline text-slate-600">{CONTACT.email}</a>}
        </div>
      </div>
    </PublicLayout>
  );
}
