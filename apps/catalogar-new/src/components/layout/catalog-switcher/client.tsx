"use client";

import { Badge } from "@catalogar/ui/components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@catalogar/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@catalogar/ui/components/sidebar";
import { Box, ChevronsUpDown, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { switchCatalogAction } from "@/actions/switch-catalog-action";
import { routes } from "@/routes";
import type { Catalog } from "@/schemas/catalog";

type CatalogSwitcherClientProps = {
  catalogs: Array<Catalog>;
  currentCatalog: Catalog;
};

export function CatalogSwitcherClient({
  catalogs,
  currentCatalog,
}: CatalogSwitcherClientProps) {
  const router = useRouter();
  const switchCatalog = useAction(switchCatalogAction);
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Box className="size-4" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentCatalog.name}
                </span>
                <span className="truncate text-xs">
                  {currentCatalog.isPublished ? "Público" : "Privado"}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Catálogos
            </DropdownMenuLabel>

            {catalogs.map((catalog) => {
              const isCurrentCatalog = catalog.id === currentCatalog.id;

              return (
                <DropdownMenuItem
                  key={catalog.name}
                  onClick={() => {
                    if (isCurrentCatalog) return;

                    toast.promise(
                      switchCatalog.executeAsync({ id: catalog.id }),
                      {
                        loading: "Trocando de catálogo...",
                        success: () => {
                          router.push(routes.dashboard.url);

                          return "Catálogo atual alterado!";
                        },
                      },
                    );
                  }}
                  className="cursor-pointer gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <Box className="size-4 shrink-0" />
                  </div>

                  <span className="flex-1 truncate">{catalog.name}</span>

                  {isCurrentCatalog && <Badge>Atual</Badge>}
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer gap-2 p-2" asChild>
              <Link href={routes.catalog.sub.new.url}>
                <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add Catálogo
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
