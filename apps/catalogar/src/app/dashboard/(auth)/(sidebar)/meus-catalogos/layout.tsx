import type { PropsWithChildren } from "react";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";

export default function MyCatalogsLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PrevButton url={routes.dashboard.url} />
      {children}
    </div>
  );
}
