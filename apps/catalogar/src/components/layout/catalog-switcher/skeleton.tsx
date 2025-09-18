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
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg animate-pulse">
                <div className="size-4 bg-sidebar-primary-foreground/30 rounded" />
              </div>

              {/* Text placeholders */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="h-4 w-28 bg-muted-foreground rounded animate-pulse" />
                <span className="h-3 w-20 bg-muted-foreground rounded animate-pulse mt-1" />
              </div>

              {/* Chevron placeholder */}
              <div className="ml-auto h-4 w-4 bg-muted-foreground rounded animate-pulse" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
