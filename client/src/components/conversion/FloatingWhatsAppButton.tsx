import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { whatsappUrl } from "@/lib/brand";
import { useTranslation } from "@/lib/i18n/context";

export function FloatingWhatsAppButton({ hideOnPhone }: { hideOnPhone?: boolean }) {
  const t = useTranslation();
  return (
    <Button
      onClick={() => window.open(whatsappUrl(t.nav.whatsappMessage), "_blank", "noopener")}
      aria-label="Message us on WhatsApp"
      data-event="whatsapp_click"
      className={`print:hidden fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 min-[700px]:h-12 min-[700px]:w-auto min-[700px]:px-5 rounded-full gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg z-50 ${hideOnPhone ? "max-[699px]:hidden" : ""}`}
    >
      <MessageSquare className="h-6 w-6" />
      <span className="hidden min-[700px]:inline">{t.nav.whatsapp}</span>
    </Button>
  );
}
