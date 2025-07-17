import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { PrevButton } from "@/components/prev-button";

export default function MyCatalogsLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PrevButton fallbackUrl={routes.dashboard.url} />
      {children}
    </div>
  );
}
