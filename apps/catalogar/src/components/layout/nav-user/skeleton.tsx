"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@catalogar/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@catalogar/ui/dropdown-menu";
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
              <div className="size-8 rounded-lg bg-muted-foreground animate-pulse" />

              {/* Name & email placeholders */}
              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="h-4 w-24 bg-muted-foreground rounded animate-pulse" />
                <span className="h-3 w-32 bg-muted-foreground rounded animate-pulse mt-1" />
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
                <div className="size-8 rounded-lg bg-muted animate-pulse" />
                {/* Name/email placeholders */}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <span className="h-3 w-32 bg-muted rounded animate-pulse mt-1" />
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
                <Link href="/auth/logout">
                  <LogOut />
                  Sair
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
