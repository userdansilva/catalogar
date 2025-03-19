import { PropsWithChildren } from "react";

export function Section({
  children,
}: PropsWithChildren) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
}

type SectionHeaderProps = {
  title: string
  description: string
}

export function SectionHeader({
  title, description,
}: SectionHeaderProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function SectionContent({
  children,
}: PropsWithChildren) {
  return (
    <div>
      {children}
    </div>
  );
}
