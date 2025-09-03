import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@catalogar/ui/components/sidebar";
import { CatalogSwitcher } from "./catalog-switcher";
import NavMain from "./nav-main";
import { NavUser } from "./nav-user";
import { getUser } from "@/services/get-user";
import { getProductTypes } from "@/services/get-product-types";
import { getCatalogItems } from "@/services/get-catalog-items";
import { getCategories } from "@/services/get-categories";

export async function AppSidebar() {
  const { data: user } = await getUser();
  const { data: productTypes } = await getProductTypes();
  const [err, data] = await getCategories();
  const { data: catalogItems } = await getCatalogItems();

  if (err) return;

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
          user={user}
          productTypes={productTypes}
          categories={data.data}
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
