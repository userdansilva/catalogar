"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@catalogar/ui/components/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@catalogar/ui/components/tooltip";
import { useRouter } from "next/navigation";
import { User } from "@catalogar/shared/services/get-user";
import { route } from "@catalogar/shared/route";
import { ProductType } from "@catalogar/shared/services/get-product-types";
import { Category } from "@catalogar/shared/services/get-categories";
import { CatalogItem } from "@catalogar/shared/services/get-catalog-items";

type NavMainProps = {
  productTypes: ProductType[];
  categories: Category[];
  catalogItems: CatalogItem[];
  user: User;
};

export function NavMainClient({
  user,
  productTypes,
  categories,
  catalogItems,
}: NavMainProps) {
  const { setOpenMobile } = useSidebar();
  const router = useRouter();

  if (!user.currentCatalog) {
    router.push(route.catalog.sub.createFirst.url);
    return;
  }

  const groups = [
    {
      name: "Menus",
      items: [
        {
          ...route.dashboard,
          isLocked: false,
          lockReason: "",
          isActive: true,
        },
        {
          ...route.productTypes,
          url:
            productTypes.length === 0
              ? route.productTypes.sub.createFirst.url
              : route.productTypes.url,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
        {
          ...route.categories,
          url:
            categories.length === 0
              ? route.categories.sub.createFirst.url
              : route.categories.url,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
        {
          ...route.catalogItems,
          url:
            catalogItems.length === 0
              ? route.catalogItems.sub.createFirst.url
              : route.catalogItems.url,
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
          ...route.preview,
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
          ...route.company,
          url: user.currentCatalog.company
            ? route.company.url
            : route.company.sub.new.url,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
        {
          ...route.theme,
          url: user.currentCatalog.theme
            ? route.theme.url
            : route.theme.sub.new.url,
          isLocked: false,
          lockReason: "",
          isActive: false,
        },
        {
          ...route.config,
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

                  <TooltipContent side="right" className="max-w-80">
                    {item.lockReason}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <SidebarMenuButton asChild tooltip={item.title}>
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
