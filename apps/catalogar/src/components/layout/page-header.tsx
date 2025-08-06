import { Separator } from "@catalogar/ui/components/separator";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

        <p className="text-muted-foreground">{description}</p>
      </div>

      <Separator />
    </div>
  );
}
