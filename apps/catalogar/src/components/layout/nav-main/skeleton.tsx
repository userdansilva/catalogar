import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@catalogar/ui/sidebar";
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
