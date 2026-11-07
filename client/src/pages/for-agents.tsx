import { PublicLayout } from "@/components/layout/PublicLayout";
import { PublicLeadForm } from "@/components/forms/PublicLeadForm";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n/context";

// Holding page until the agent tools exist. Requests arrive with the other contact leads.
export default function ForAgents() {
  const s = useTranslation().agents;
  return (
    <PublicLayout>
      <div className="py-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl text-primary mb-4">{s.title}</h1>
          <p className="text-slate-600 text-lg mb-4">{s.intro}</p>
          <p className="text-slate-600 mb-8">{s.independence}</p>
          <Card>
            <CardContent className="pt-6">
              <PublicLeadForm
                kind="contact"
                submitLabel={s.submit}
                messageLabel={s.message}
                successTitle={s.successTitle}
                successText={s.successText}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
