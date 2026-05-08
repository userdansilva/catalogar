"use client";

import { Button } from "@catalogar/ui/components/button";
import { Separator } from "@catalogar/ui/components/separator";
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
      <div className="border-accent-foreground container border-b-[.5px] flex flex-row flex-wrap">
        <div className="flex-1 sm:flex-none">
          <Button variant="link" className="dark pl-0" size="sm" asChild>
            <Link href={callbackUrl || routes.dashboard.url}>
              <ChevronLeft />
              Voltar
            </Link>
          </Button>
        </div>
        <Separator orientation="vertical" />
        <Button
          size="sm"
          variant="link"
          className="underline underline-offset-2 dark text-xs"
          asChild
        >
          <Link
            href={{
              pathname: company
                ? routes.company.url
                : routes.company.sub.new.url,
              query: {
                callbackUrl: routes.preview.url,
              },
            }}
          >
            <Pencil className="size-3.5" /> Editar nome
          </Link>
        </Button>
        <Button
          size="sm"
          variant="link"
          className="underline underline-offset-2 dark text-xs"
          asChild
        >
          <Link
            href={{
              pathname: theme ? routes.theme.url : routes.theme.sub.new.url,
              query: {
                callbackUrl: routes.preview.url,
              },
            }}
          >
            <Palette className="size-3.5" /> Editar cores
          </Link>
        </Button>
      </div>
    </div>
  );
}
