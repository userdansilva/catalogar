import type { PropsWithChildren } from "react";

export default function JourneyLayout({ children }: PropsWithChildren) {
  return (
    <div className="container flex min-h-screen items-center justify-center py-10">
      {children}
    </div>
  );
}
