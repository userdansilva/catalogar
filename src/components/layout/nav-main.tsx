"use client";

import { routes } from "@/routes";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shadcn/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/components/ui/tooltip";
import { CatalogItem, Product } from "@/types/api-types";
import { Lock } from "lucide-react";
import Link from "next/link";

type NavMainProps = {
  products: Product[];
  catalogItems: CatalogItem[];
}

export default function NavMain({
  products, catalogItems,
}: NavMainProps) {
  const groups = [
    {
      name: "Menus",
      items: [
        {
          ...routes.dashboard,
          isLocked: false,
          lockReason: "",
          isActive: true,
        },
        {
          ...routes.products,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
        {
          ...routes.categories,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
        {
          ...routes.catalogItems,
          isLocked: products.length === 0,
          lockReason: "Para desbloquear o Catálogo, primeiro adicione um produto, pois cada item de catálogo é vinculado a um tipo de produto",
          isActive: false,
        },
      ],
    },
    {
      name: "Utilidades",
      items: [
        {
          ...routes.preview,
          isLocked: catalogItems.length === 0,
          lockReason: "Para desbloquear o Preview, primeiro adicione um item de catálogo",
          isActive: false,
        },
      ],
    },
    {
      name: "Personalização",
      items: [
        {
          ...routes.company,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
        {
          ...routes.theme,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
        {
          ...routes.config,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
      ],
    },
  ];

  return groups.map((group) => (
    <SidebarGroup key={group.name}>
      <SidebarGroupLabel>{group.name}</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    disabled={item.isLocked}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.isLocked && <Lock className="ml-auto" />}
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                {item.isLocked && (
                  <TooltipContent side="right" className="ml-2">
                    {item.lockReason}
                  </TooltipContent>
                )}
              </Tooltip>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
}
