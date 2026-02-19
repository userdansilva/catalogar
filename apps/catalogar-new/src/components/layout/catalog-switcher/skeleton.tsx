import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@catalogar/ui/components/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@catalogar/ui/components/dropdown-menu";

export function CatalogSwitcherSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Icon placeholder */}
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 animate-pulse items-center justify-center rounded-lg">
                <div className="bg-sidebar-primary-foreground/30 size-4 rounded" />
              </div>

              {/* Text placeholders */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="bg-muted-foreground h-4 w-28 animate-pulse rounded" />
                <span className="bg-muted-foreground mt-1 h-3 w-20 animate-pulse rounded" />
              </div>

              {/* Chevron placeholder */}
              <div className="bg-muted-foreground ml-auto h-4 w-4 animate-pulse rounded" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
