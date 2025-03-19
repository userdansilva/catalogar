import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shadcn/components/ui/sidebar";
import { getUser } from "@/services/get-user";
import { CatalogSwitcher } from "./catalog-switcher";
import NavMain from "./nav-main";
import { NavUser } from "./nav-user";

export async function AppSidebar() {
  const { data: user } = await getUser();

  return (
    <Sidebar className="font-medium" collapsible="icon">
      <SidebarHeader>
        <CatalogSwitcher
          catalogs={user.catalogs}
          currentCatalog={user.currentCatalog}
        />
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={{ name: user.name, email: user.email }} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
