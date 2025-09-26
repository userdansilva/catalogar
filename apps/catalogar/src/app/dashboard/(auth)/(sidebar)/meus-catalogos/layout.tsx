import { PropsWithChildren } from "react";
import { routes } from "@/routes";
import { PrevButton } from "@/components/inputs/prev-button";

export default function MyCatalogsLayout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-6">
      <PrevButton url={routes.dashboard.url} />
      {children}
    </div>
  );
}
