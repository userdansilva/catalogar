"use client";

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shadcn/components/ui/sidebar";
import { Book, Building2, Filter, House, List, Palette } from "lucide-react";
import Link from "next/link";

const items = [
  { name: "Dashboard", url: "/", icon: House, isActive: true },
  { name: "Meu Catálogo", url: "/catalogo", icon: Book, isActive: false },
  { name: "Categorias", url: "/categorias", icon: Filter, isActive: false },
  { name: "Produtos", url: "/produtos", icon: List, isActive: false },
  { name: "Empresa", url: "/empresa", icon: Building2, isActive: false },
  { name: "Tema", url: "/tema", icon: Palette, isActive: false }
];

export default function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
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
  )
}
