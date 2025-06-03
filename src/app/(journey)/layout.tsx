import { PropsWithChildren } from "react";

export default function JourneyLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
