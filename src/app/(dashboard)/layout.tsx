import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shadcn/components/ui/sidebar";
import { PropsWithChildren } from "react";
import { AppSidebar } from "./_components/app-sidebar";
import { Separator } from "@/shadcn/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/shadcn/components/ui/breadcrumb";
import Link from "next/link";
import { getUser } from "@/services/get-user";
import { redirect } from "next/navigation";
import { User } from "@/types/api-types";

export default async function DashboardLayout({
  children
}: PropsWithChildren) {
  const { data } = await getUser<User>();

  if (!data.currentCatalog) {
    return redirect("/primeiro-catalogo")
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" asChild>
                    <Link href="/">
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Meu Catálogo</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
