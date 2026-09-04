"use client";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Palette, Pencil } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Company, Theme } from "@/generated/prisma/client";
import { routes } from "@/routes";

export function PreviewToolsBar({
  company,
  theme,
}: {
  theme: Theme | null;
  company: Company | null;
}) {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <div className="bg-foreground">
      <div className="border-accent-foreground container flex flex-row flex-wrap border-b-[.5px]">
        <div className="flex-1 sm:flex-none">
          <Link
            href={callbackUrl || routes.dashboard.url}
            className={buttonVariants({
              variant: "link",
              className: "dark",
              size: "xs",
            })}
          >
            <ChevronLeft />
            Voltar
          </Link>
        </div>
        <Separator orientation="vertical" className="dark" />
        <Link
          href={{
            pathname: company ? routes.company.url : routes.company.sub.new.url,
            query: {
              callbackUrl: routes.preview.url,
            },
          }}
          className={buttonVariants({
            size: "xs",
            variant: "link",
            className: "dark",
          })}
        >
          <Pencil /> Editar empresa
        </Link>
        <Link
          href={{
            pathname: theme ? routes.theme.url : routes.theme.sub.new.url,
            query: {
              callbackUrl: routes.preview.url,
            },
          }}
          className={buttonVariants({
            size: "xs",
            variant: "link",
            className: "dark",
          })}
        >
          <Palette />
          Editar cores
        </Link>
      </div>
    </div>
  );
}
