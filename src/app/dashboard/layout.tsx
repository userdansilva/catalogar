import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <span>me</span>
      {children}
    </div>
  );
}
