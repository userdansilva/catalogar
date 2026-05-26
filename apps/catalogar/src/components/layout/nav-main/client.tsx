"use client";

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
import { Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type {
  CatalogItem,
  Category,
  Prisma,
  ProductType,
} from "@/generated/prisma/client";
import { routes } from "@/routes";

type NavMainClientProps = {
  productTypes: ProductType[];
  categories: Category[];
  catalogItems: (Omit<CatalogItem, "price"> & {
    price: number | null;
  })[];
  user: Prisma.UserGetPayload<{
    include: {
      currentCatalog: {
        include: {
          company: true;
          theme: true;
        };
      };
      catalogs: true;
    };
  }>;
};

export function NavMainClient({
  user,
  productTypes,
  categories,
  catalogItems,
}: NavMainClientProps) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();

  const groups = [
    {
      name: "Menus",
      items: [
        {
          ...routes.dashboard,
          isLocked: false,
          lockReason: "",
          isActive: pathname === routes.dashboard.url,
        },
        {
          ...routes.productTypes,
          url:
            productTypes.length === 0
              ? routes.productTypes.sub.createFirst.url
              : routes.productTypes.url,
          isLocked: false,
          lockReason: "",
          isActive: pathname.startsWith(routes.productTypes.url),
        },
        {
          ...routes.categories,
          url:
            categories.length === 0
              ? routes.categories.sub.createFirst.url
              : routes.categories.url,
          isLocked: false,
          lockReason: "",
          isActive: pathname.startsWith(routes.categories.url),
        },
        {
          ...routes.catalogItems,
          url:
            catalogItems.length === 0
              ? routes.catalogItems.sub.createFirst.url
              : routes.catalogItems.url,
          isLocked: productTypes.length === 0,
          lockReason: "Adicione um tipo de produto para desbloquear o Catálogo",
          isActive: pathname.startsWith(routes.catalogItems.url),
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
          isActive: pathname.startsWith(routes.preview.url),
        },
      ],
    },
    {
      name: "Personalização",
      items: [
        {
          ...routes.company,
          url: user.currentCatalog?.company
            ? routes.company.url
            : routes.company.sub.new.url,
          isLocked: false,
          lockReason: "",
          isActive: pathname.startsWith(routes.company.url),
        },
        {
          ...routes.theme,
          url: user.currentCatalog?.theme
            ? routes.theme.url
            : routes.theme.sub.new.url,
          isLocked: false,
          lockReason: "",
          isActive: pathname.startsWith(routes.theme.url),
        },
        {
          ...routes.config,
          isLocked: false,
          lockReason: "",
          isActive: pathname.startsWith(routes.config.url),
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
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={item.isActive}
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
