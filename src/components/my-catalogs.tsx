"use client";

import { Box, Check, Plus, Settings } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "./inputs/button";
import { routes } from "@/routes";
import { switchCatalogAction } from "@/actions/switch-catalog-action";
import { Catalog } from "@/types/api-types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";

type MyCatalogsProps = {
  catalogs: Catalog[];
  currentCatalog: Catalog;
};

export function MyCatalogs({ catalogs, currentCatalog }: MyCatalogsProps) {
  const switchCatalog = useAction(switchCatalogAction);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <h2 className="flex-1 scroll-m-20 text-2xl font-bold tracking-tight first:mt-0 sm:flex-none">
          Meus catálogos
        </h2>

        <Button asChild variant="outline" size="sm">
          <Link href={routes.catalog.sub.new.url}>
            <Plus />
            Adicionar
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {catalogs
          .sort((a, b) => {
            if (a.id === currentCatalog.id) return -1;
            if (b.id === currentCatalog.id) return 1;

            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((catalog) => {
            const isCurrentCatalog = catalog.id === currentCatalog.id;

            return (
              <Card key={catalog.id}>
                <CardHeader className="relative">
                  <CardDescription>
                    {catalog.isPublished ? "Público" : "Privado"}
                  </CardDescription>

                  <CardTitle className="text-2xl">{catalog.name}</CardTitle>

                  <div className="absolute top-4 right-4">
                    <Box className="text-muted-foreground size-4" />
                  </div>
                </CardHeader>

                <CardFooter className="space-x-2">
                  <Button
                    size="sm"
                    className="w-full"
                    disabled={isCurrentCatalog}
                    variant="outline"
                    onClick={() => {
                      if (isCurrentCatalog) return;

                      toast.promise(
                        switchCatalog.executeAsync({ id: catalog.id }),
                        {
                          loading: "Trocando de catálogo...",
                          success: () => {
                            setTimeout(() => {
                              window.location.reload();
                            }, 1_000);

                            return "Catálogo atual alterado!";
                          },
                        },
                      );
                    }}
                  >
                    {isCurrentCatalog ? "Selecionado (Atual)" : "Selecionar"}
                    {isCurrentCatalog && <Check />}
                  </Button>

                  {isCurrentCatalog && (
                    <Button size="sm" asChild>
                      <Link href={routes.config.url}>
                        <Settings />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
