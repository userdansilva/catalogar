"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shadcn/components/ui/sidebar";
import { CatalogSwitcher } from "./catalog-switcher";
import NavMain from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar() {
  return (
    <Sidebar className="font-medium" collapsible="icon">
      <SidebarHeader>
        <CatalogSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
