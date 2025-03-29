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
import Link from "next/link";

const groups = [
  {
    name: "Menu",
    items: [
      {
        ...routes.dashboard,
        isActive: true,
      },
      {
        ...routes.catalogItems,
        isActive: false,
      },
      {
        ...routes.categories,
        isActive: false,
      },
      {
        ...routes.products,
        isActive: false,
      },
    ],
  },
  {
    name: "Personalização",
    items: [
      {
        ...routes.company,
        isActive: false,
      },
      {
        ...routes.theme,
        isActive: false,
      },
      {
        ...routes.config,
        isActive: false,
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
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
}
