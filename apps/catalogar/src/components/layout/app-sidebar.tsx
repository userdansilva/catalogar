import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@catalogar/ui/components/sidebar";
import { Suspense } from "react";
import { CatalogSwitcher } from "./catalog-switcher";
import { CatalogSwitcherSkeleton } from "./catalog-switcher/skeleton";
import { NavMain } from "./nav-main";
import { NavMainSkeleton } from "./nav-main/skeleton";
import { NavUser } from "./nav-user";
import { NavUserSkeleton } from "./nav-user/skeleton";

export async function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <Suspense fallback={<CatalogSwitcherSkeleton />}>
          <CatalogSwitcher />
        </Suspense>
      </SidebarHeader>

      <SidebarContent>
        <Suspense fallback={<NavMainSkeleton />}>
          <NavMain />
        </Suspense>
      </SidebarContent>

      <SidebarFooter>
        <Suspense fallback={<NavUserSkeleton />}>
          <NavUser />
        </Suspense>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
