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
import {
  Book, Building2, Filter, House, List, Palette, Settings,
} from "lucide-react";
import Link from "next/link";

const groups = [
  {
    name: "Menu",
    items: [
      {
        name: "Dashboard", url: routes.dashboard.home, icon: House, isActive: true,
      },
      {
        name: "Meus Itens", url: routes.catalogItem.home, icon: Book, isActive: false,
      },
      {
        name: "Categorias", url: routes.category.home, icon: Filter, isActive: false,
      },
      {
        name: "Produtos", url: routes.product.home, icon: List, isActive: false,
      },
    ],
  },
  {
    name: "Personalização",
    items: [
      {
        name: "Empresa", url: routes.company.home, icon: Building2, isActive: false,
      },
      {
        name: "Tema", url: routes.theme.home, icon: Palette, isActive: false,
      },
      {
        name: "Configuração", url: routes.config.home, icon: Settings, isActive: false,
      },
    ],
  },
];

export default function NavMain() {
  return groups.map((group) => (
    <SidebarGroup key={group.name}>
      <SidebarGroupLabel>{group.name}</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild tooltip={item.name}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
}
