import { Circle, CircleCheck, Lock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@catalogar/ui/badge";
import { Button } from "@catalogar/ui/button";
import { cn } from "@catalogar/ui/utils";
import { routes } from "@/routes";

export function Mission({
  title,
  description,
  status = "PENDING",
  href,
  isOptional,
}: {
  title: string;
  description: string;
  status: "COMPLETE" | "CURRENT" | "PENDING";
  href: string;
  isOptional?: boolean;
}) {
  const isComplete = status === "COMPLETE";
  const isCurrent = status === "CURRENT";
  const isPending = status === "PENDING";

  return (
    <div
      className={cn(
        "space-y-6 rounded-md border px-4 py-2",
        isComplete && "border-green-200 bg-green-50",
      )}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {isComplete && <CircleCheck className="size-5 text-green-500" />}
          {isCurrent && <Circle className="size-5" />}
          {isPending && <Lock className="text-muted-foreground size-5" />}

          <h3
            className={cn(
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
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>

      {isCurrent && (
        <div className="flex items-center gap-2">
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

          {isOptional && (
            <Button variant="outline" asChild>
              <Link
                href={{
                  query: {
                    pular: "categoria",
                  },
                }}
              >
                Pular
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
