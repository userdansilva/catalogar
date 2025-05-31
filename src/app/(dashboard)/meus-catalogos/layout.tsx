import { PropsWithChildren } from "react";
import { Page } from "@/components/page-layout/page";

export default function Layout({
  children,
}: PropsWithChildren) {
  return (
    <Page>
      {children}
    </Page>
  );
}
