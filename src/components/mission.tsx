import { routes } from "@/routes";
import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { cn } from "@/shadcn/lib/utils";
import { Circle, CircleCheck, Lock } from "lucide-react";
import Link from "next/link";

export function Mission({
  title, description, status = "PENDING", href,
}: {
  title: string;
  description: string;
  status: "COMPLETE" | "CURRENT" | "PENDING";
  href: string;
}) {
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
        {isPending && <Lock className="size-5 text-muted-foreground" />}

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
          {description}
        </p>
      )}

      {isCurrent && (
        <Button asChild>
          <Link
            href={{
              pathname: href,
              query: {
                callbackUrl: routes.dashboard.url,
              },
            }}
            prefetch
          >
            Vamos lá
          </Link>
        </Button>
      )}
    </div>
  );
}
