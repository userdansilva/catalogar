import { CatalogLayout } from "@/components/catalog-layout";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";
import { Button } from "@/shadcn/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";

export default async function PreviewLayout({
  children,
  drawerdialog,
}: PropsWithChildren<{
  drawerdialog: ReactNode // Slot
}>) {
  const { data: user } = await getUser();

  const { company, theme } = user.currentCatalog;

  if (!theme || !company) return null;

  return (
    <div>
      <div className="container bg-primary">
        <Button variant="link" className="dark pl-0" size="sm" asChild>
          <Link href={routes.dashboard.url}>
            <ChevronLeft />
            Voltar para Página Inicial
          </Link>
        </Button>
      </div>

      <CatalogLayout
        baseUrl={routes.preview.url}
        company={company}
        theme={theme}
      >
        {children}
        {drawerdialog}
      </CatalogLayout>
    </div>
  );
}
