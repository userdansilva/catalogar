"use client";

import { switchCatalogAction } from "@/actions/switch-catalog-action";
import { Badge } from "@/shadcn/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shadcn/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/shadcn/components/ui/sidebar";
import { Catalog } from "@/types/api-types";
import { Box, ChevronsUpDown, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";

type CatalogSwitcheProps = {
  catalogs: Array<Catalog>
  currentCatalog: Catalog
}

export function CatalogSwitcher({
  catalogs, currentCatalog
}: CatalogSwitcheProps) {
  const switchCatalog = useAction(switchCatalogAction)
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
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
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
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Catálogos
            </DropdownMenuLabel>

            {catalogs.map((catalog) => {
              const isCurrentCatalog = catalog.id === currentCatalog.id

              return (
                <DropdownMenuItem
                  key={catalog.name}
                  onClick={() => {
                    if (isCurrentCatalog) return;

                    switchCatalog.execute({ id: catalog.id })
                  }}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <Box className="size-4 shrink-0" />
                  </div>

                  <span className="truncate flex-1">
                    {catalog.name}
                  </span>

                  {isCurrentCatalog && (
                    <Badge>Atual</Badge>
                  )}
                </DropdownMenuItem>
              )
            })}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2 cursor-pointer" asChild>
              <Link href="/criar-catalogo">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Add Catálogo</div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
