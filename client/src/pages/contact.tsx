import { PublicLayout } from "@/components/layout/PublicLayout";
import { PublicLeadForm } from "@/components/forms/PublicLeadForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { CONTACT, whatsappUrl } from "@/lib/brand";
import { useTranslation } from "@/lib/i18n/context";

export default function Contact() {
  const t = useTranslation();
  const s = t.contact;
  return (
    <PublicLayout>
      <div className="py-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl text-primary mb-4">{s.title}</h1>
          <p className="text-slate-600 mb-8">{s.intro}</p>
          <Card className="mb-6">
            <CardContent className="p-6 md:p-8">
              <PublicLeadForm
                kind="contact"
                documentNotice
                submitLabel={s.submit}
                successTitle={s.successTitle}
                successText={s.successText}
              />
            </CardContent>
          </Card>
          <div className="flex flex-wrap items-center gap-4">
            <a href={whatsappUrl(t.nav.whatsappMessage)} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2"><MessageSquare className="h-4 w-4" /> {s.whatsapp}</Button>
            </a>
            {CONTACT.email && <a href={`mailto:${CONTACT.email}`} className="text-sm underline text-slate-600">{CONTACT.email}</a>}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
