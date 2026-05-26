import { cn } from "@catalogar/ui/lib/utils";

export function TitleDisplay({
  title,
  isDisabled,
  className,
}: {
  title: string;
  isDisabled?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("text-sm", isDisabled && "line-through", className)}>
      {title}
    </div>
  );
}
