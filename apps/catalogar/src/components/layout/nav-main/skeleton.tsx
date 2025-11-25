import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@catalogar/ui/components/sidebar";
import Link from "next/link";
import { routes } from "@/routes";

export function NavMainSkeleton() {
  const groups = [
    {
      name: "Menus",
      items: [
        {
          ...routes.dashboard,
          isFixed: true,
        },
        {
          ...routes.productTypes,
          isFixed: false,
        },
        {
          ...routes.categories,
          isFixed: false,
        },
        {
          ...routes.catalogItems,
          isFixed: false,
        },
      ],
    },
    {
      name: "Utilidades",
      items: [
        {
          ...routes.preview,
          isFixed: false,
        },
      ],
    },
    {
      name: "Personalização",
      items: [
        {
          ...routes.company,
          isFixed: false,
        },
        {
          ...routes.theme,
          isFixed: false,
        },
        {
          ...routes.config,
          isFixed: false,
        },
      ],
    },
  ];

  return groups.map((group) => (
    <SidebarGroup key={group.name}>
      <SidebarGroupLabel>{group.name}</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.isFixed ? (
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton>
                  {/* Icon placeholder */}
                  <div className="bg-muted-foreground h-4 w-4 animate-pulse rounded" />
                  {/* Text placeholder */}
                  <span className="bg-muted-foreground h-4 w-24 animate-pulse rounded" />
                  {/* Optional right-side lock icon placeholder */}
                  <div className="bg-muted-foreground ml-auto h-4 w-4 animate-pulse rounded" />
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
}
