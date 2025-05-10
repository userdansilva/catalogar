import { Badge } from "@/shadcn/components/ui/badge";
import { Gift } from "lucide-react";

type RewardProps = {
  title: string
  isRewarded?: boolean
}

export function Reward({
  title, isRewarded,
}: RewardProps) {
  return (
    <div
      className="space-y-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-2"
    >
      <div className="flex items-center gap-4">
        <Gift className="size-5 text-amber-500" />

        <h3 className="flex-1 text-sm font-medium">
          {title}
        </h3>

        <Badge className="bg-amber-100 text-amber-500 shadow-none">
          {isRewarded ? "Entregue" : "Pendente"}
        </Badge>
      </div>
    </div>
  );
}
