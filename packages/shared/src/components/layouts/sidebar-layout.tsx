import { PropsWithChildren } from "react";
import Link from "next/link";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@catalogar/ui/sidebar";
import { Separator } from "@catalogar/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@catalogar/ui/breadcrumb";
import { AppSidebar } from "@catalogar/shared/app-sidebar";
import { route } from "../../routes";
import { Loader } from "@catalogar/shared/loader";

export function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="mx-auto max-w-6xl">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex h-5 items-center space-x-4 px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={route.dashboard.url}
                      className="underline underline-offset-2"
                    >
                      Página Inicial
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function SidebarLayoutLoading() {
  return (
    <div className="flex h-[calc(100vh-(64px+32px))] items-center justify-center">
      <Loader />
    </div>
  );
}
