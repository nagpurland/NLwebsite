import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PublicLeadForm } from "@/components/forms/PublicLeadForm";
import { FORMS_ON } from "@/lib/features";
import { whatsappUrl } from "@/lib/brand";
import { useTranslation } from "@/lib/i18n/context";
import { STEPS } from "@/lib/step-navigation";

export default function PlotCheckupTool() {
  const t = useTranslation();
  const s = t.plotCheckup;
  return (
    <PublicLayout>
      <div className="py-6 md:py-14 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl md:text-5xl text-primary mb-2 md:mb-3">{s.title}</h1>
          <p className="text-slate-600 md:text-lg mb-4 md:mb-6" data-testid="inquiry-promise">{FORMS_ON ? s.intro : s.introPaused}</p>
          <Card className="mb-5">
            <CardContent className="p-4 md:p-6">
              <PublicLeadForm
                kind="plot_question"
                showLocality
                short
                documentNotice
                submitLabel={s.submit}
                messageLabel={s.message}
                successTitle={s.successTitle}
                successText={s.successText}
                successActions={
                  <>
                    <a href={whatsappUrl(t.nav.whatsappMessage)} target="_blank" rel="noopener noreferrer" data-event="whatsapp_click">
                      <Button className="w-full">{t.nav.whatsapp}</Button>
                    </a>
                    <Link href={STEPS[0].link}>
                      <Button variant="outline" className="w-full" data-testid="success-next-step">{s.continueGuide}</Button>
                    </Link>
                  </>
                }
              />
            </CardContent>
          </Card>
          <section className="mb-5" data-testid="what-happens-next">
            <h2 className="text-xl text-primary mb-2">{s.nextTitle}</h2>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
              {s.nextSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <p className="mt-2 text-xs text-slate-500">{s.cardNote}</p>
          </section>
          <Link href="/step-3-safety-check">
            <Button variant="outline" className="whitespace-normal h-auto py-2">{s.checklist}</Button>
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
