import { PropsWithChildren } from "react";

export default function JourneyLayout({
  children
}: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center h-screen">
      {children}
    </div>
  )
}