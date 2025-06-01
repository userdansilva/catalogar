import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shadcn/components/ui/sidebar";
import { getUser } from "@/services/get-user";
import { getProducts } from "@/services/get-products";
import { getCatalogItems } from "@/services/get-catalog-items";
import { CatalogSwitcher } from "./catalog-switcher";
import NavMain from "./nav-main";
import { NavUser } from "./nav-user";

export async function AppSidebar() {
  const { data: user } = await getUser();
  const { data: products } = await getProducts();
  const { data: catalogItems } = await getCatalogItems();

  return (
    <Sidebar className="font-medium" collapsible="icon">
      <SidebarHeader>
        <CatalogSwitcher
          catalogs={user.catalogs}
          currentCatalog={user.currentCatalog}
        />
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          products={products}
          catalogItems={catalogItems}
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={{ name: user.name, email: user.email }} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
