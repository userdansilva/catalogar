import { RootLayout } from "@catalogar/shared/components/layouts/root-layout/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Catalogar",
    default: "Catalogar",
  },
};

export default RootLayout;
