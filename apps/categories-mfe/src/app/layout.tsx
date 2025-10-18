import "@catalogar/ui/globals.css";
import { RootLayout } from "@catalogar/shared/root-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Catalogar",
    default: "Catalogar",
  },
};

import { Geist, Geist_Mono } from "next/font/google";
import { PropsWithChildren } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <RootLayout className={`${geistSans.variable} ${geistMono.variable}`}>
      {children}
    </RootLayout>
  );
}
