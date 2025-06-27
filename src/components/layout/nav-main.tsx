"use client";

import { routes } from "@/routes";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shadcn/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/components/ui/tooltip";
import {
  CatalogItem, Category, ProductType,
  UserWithCatalog,
} from "@/types/api-types";
import { Lock } from "lucide-react";
import Link from "next/link";

type NavMainProps = {
  productTypes: ProductType[];
  categories: Category[];
  catalogItems: CatalogItem[];
  user: UserWithCatalog;
}

export default function NavMain({
  user, productTypes, categories, catalogItems,
}: NavMainProps) {
  const { setOpenMobile } = useSidebar();

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
          ...routes.productTypes,
          url: productTypes.length === 0
            ? routes.productTypes.sub.createFirst.url
            : routes.productTypes.url,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
        {
          ...routes.categories,
          url: categories.length === 0
            ? routes.categories.sub.createFirst.url
            : routes.categories.url,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
        {
          ...routes.catalogItems,
          url: catalogItems.length === 0
            ? routes.catalogItems.sub.createFirst.url
            : routes.catalogItems.url,
          isLocked: productTypes.length === 0,
          lockReason: "Adicione um tipo de produto para desbloquear o Catálogo",
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
          lockReason: "Adicione um item no Catálogo para desbloquear o Preview",
          isActive: false,
        },
      ],
    },
    {
      name: "Personalização",
      items: [
        {
          ...routes.company,
          url: user.currentCatalog.company
            ? routes.company.url
            : routes.company.sub.new.url,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
        {
          ...routes.theme,
          url: user.currentCatalog.theme
            ? routes.theme.url
            : routes.theme.sub.new.url,
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
              {item.isLocked ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                      <Lock className="ml-auto" />
                    </SidebarMenuButton>
                  </TooltipTrigger>

                  <TooltipContent side="right" className="ml-2 max-w-80">
                    {item.lockReason}
                  </TooltipContent>

                </Tooltip>
              ) : (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                >
                  <Link href={item.url} onClick={() => setOpenMobile(false)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
}
