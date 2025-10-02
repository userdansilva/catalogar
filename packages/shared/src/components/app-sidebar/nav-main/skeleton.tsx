import { route } from "@catalogar/shared/route";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@catalogar/ui/components/sidebar";
import Link from "next/link";

export function NavMainSkeleton() {
  const groups = [
    {
      name: "Menus",
      items: [
        {
          ...route.dashboard,
          isFixed: true,
        },
        {
          ...route.productTypes,
          isFixed: false,
        },
        {
          ...route.categories,
          isFixed: false,
        },
        {
          ...route.catalogItems,
          isFixed: false,
        },
      ],
    },
    {
      name: "Utilidades",
      items: [
        {
          ...route.preview,
          isFixed: false,
        },
      ],
    },
    {
      name: "Personalização",
      items: [
        {
          ...route.company,
          isFixed: false,
        },
        {
          ...route.theme,
          isFixed: false,
        },
        {
          ...route.config,
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
                  <div className="h-4 w-4 rounded bg-muted-foreground animate-pulse" />
                  {/* Text placeholder */}
                  <span className="h-4 w-24 rounded bg-muted-foreground animate-pulse" />
                  {/* Optional right-side lock icon placeholder */}
                  <div className="ml-auto h-4 w-4 rounded bg-muted-foreground animate-pulse" />
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
}
