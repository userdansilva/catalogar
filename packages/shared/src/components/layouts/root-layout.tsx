import "@catalogar/ui/globals.css";
import { ReactNode } from "react";
import { Toaster } from "@catalogar/ui/sonner";
import { ThemeProvider } from "@catalogar/shared/theme-provider";
import clsx from "clsx";
import { Loader } from "@catalogar/shared/loader";

export function RootLayout({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: string;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(className, "antialiased")}>
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

export function RootLayoutLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
}
