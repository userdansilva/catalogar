"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@catalogar/ui/components/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@catalogar/ui/components/dropdown-menu";
import { Book, ChevronsUpDown, LogOut } from "lucide-react";
import Link from "next/link";
import { routes } from "@/routes";

export function NavUserSkeleton() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Avatar placeholder */}
              <div className="bg-muted-foreground size-8 animate-pulse rounded-lg" />

              {/* Name & email placeholders */}
              <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
                <span className="bg-muted-foreground h-4 w-24 animate-pulse rounded" />
                <span className="bg-muted-foreground mt-1 h-3 w-32 animate-pulse rounded" />
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {/* Avatar placeholder */}
                <div className="bg-muted size-8 animate-pulse rounded-lg" />
                {/* Name/email placeholders */}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="bg-muted h-4 w-24 animate-pulse rounded" />
                  <span className="bg-muted mt-1 h-3 w-32 animate-pulse rounded" />
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={routes.catalog.url}>
                  <Book />
                  Meus Catálogos
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <a
                  href={`/auth/logout?returnTo=${process.env.NEXT_PUBLIC_BASE_URL}`}
                >
                  <LogOut />
                  Sair
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
