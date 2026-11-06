import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function FloatingWhatsAppButton({ phone = "918857801966" }) {
  return (
    <Button
      onClick={() => window.open(`https://wa.me/${phone}`, "_blank")}
      className="fixed bottom-24 right-6 h-14 w-14 md:h-16 md:w-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl z-50 p-0 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 mb-[env(safe-area-inset-bottom)]"
    >
      <MessageSquare className="h-7 w-7 md:h-8 md:w-8 text-white" />
    </Button>
  );
}
