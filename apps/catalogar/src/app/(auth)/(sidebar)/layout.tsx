import { PropsWithChildren } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@catalogar/ui/components/sidebar";
import { Separator } from "@catalogar/ui/components/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@catalogar/ui/components/breadcrumb";
import { getUser } from "@/services/get-user";
import { User } from "@/types/api-types";
import { routes } from "@/routes";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const { data: user } = await getUser<User>();

  if (!user.currentCatalog) {
    return redirect(routes.catalog.sub.createFirst.url);
  }

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
                  <BreadcrumbLink href="#" asChild>
                    <Link
                      href={routes.dashboard.url}
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
