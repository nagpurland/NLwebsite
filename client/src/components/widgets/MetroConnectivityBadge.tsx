import { Badge } from "@/components/ui/badge";
import { TrainFront } from "lucide-react";

export function MetroConnectivityBadge({ distance = "1.2 km" }) {
  return (
    <Badge className="bg-primary text-white border-none flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg">
      <TrainFront className="h-4 w-4" />
      <span className="font-semibold text-[10px] uppercase tracking-widest">Metro Phase 2: {distance}</span>
    </Badge>
  );
}
