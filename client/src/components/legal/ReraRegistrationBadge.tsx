import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export function ReraRegistrationBadge({ reraNumber = "P50500012345" }) {
  return (
    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-100 w-fit">
      <CheckCircle2 className="h-5 w-5 text-green-600" />
      <span className="font-bold text-sm text-green-900">RERA Registered</span>
      <Badge className="bg-white text-green-700 border-green-200 font-semibold">
        {reraNumber}
      </Badge>
    </div>
  );
}
