import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { cn } from "@/shadcn/lib/utils";
import {
  Circle, CircleCheck, CircleDashed,
} from "lucide-react";

type MissionProps = {
  title: string
  status?: "COMPLETE" | "CURRENT" | "PENDING"
}

export function Mission({
  title, status = "PENDING",
}: MissionProps) {
  const isComplete = status === "COMPLETE";
  const isCurrent = status === "CURRENT";
  const isPending = status === "PENDING";

  return (
    <div
      className={cn(
        "space-y-2 rounded-md border py-2 px-4",
        isComplete && "border-green-200 bg-green-50",
      )}
    >
      <div className="flex items-center gap-4">
        {isComplete && <CircleCheck className="size-5 text-green-500" />}
        {isCurrent && <Circle className="size-5" />}
        {isPending && <CircleDashed className="size-5" />}

        <h3 className={cn(
          "flex-1 text-sm font-medium",
          isPending && "text-muted-foreground",
        )}
        >
          {title}
        </h3>

        <Badge
          className={cn(
            isComplete && "bg-green-100 text-green-500 shadow-none",
          )}
          variant={isPending ? "outline" : "default"}
        >
          {isComplete && "Finalizada"}
          {isCurrent && "Atual"}
          {isPending && "Pendente"}
        </Badge>
      </div>

      {isCurrent && (
        <p className="text-sm text-muted-foreground">
          Nessa etapa, você cadastra o nome da empresa, uma breve descrição e um link
          (como site, Instagram ou formulário).
          Essas informações ajudam seus clientes a conhecer e se conectar com seu negócio.
        </p>
      )}

      {isCurrent && (
        <Button>
          Vamos lá
        </Button>
      )}
    </div>
  );
}
