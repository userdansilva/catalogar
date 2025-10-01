import type { Metadata } from "next";
import "@catalogar/ui/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "@catalogar/ui/components/sonner";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster duration={3_000} position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
