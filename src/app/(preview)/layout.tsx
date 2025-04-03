import { routes } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function PreviewLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="space-y-10">
      <header className="w-full border-b border-slate-100 py-4">
        <div className="container">
          <div className="relative h-5 w-full">
            <Link href={routes.preview.url}>
              <Image src="/logo.svg" fill alt="logo" />
            </Link>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
