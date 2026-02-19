import { Button } from "@catalogar/ui/components/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import { CatalogLayout } from "@/components/catalog/catalog-layout";
import { ExpectedError } from "@/components/error-handling/expected-error";
import { routes } from "@/routes";
import { getUser } from "@/services/get-user";

export default async function PreviewLayout({ children }: PropsWithChildren) {
  const [error, data] = await getUser();

  if (error) {
    return <ExpectedError error={error} />;
  }

  const user = data.data;

  if (!user.currentCatalog) {
    return redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  const { company, theme } = user.currentCatalog;

  return (
    <div>
      <div className="bg-foreground">
        <div className="border-accent-foreground container border-b-[.5px]">
          <Button variant="link" className="dark pl-0" size="sm" asChild>
            <Link href={routes.dashboard.url}>
              <ChevronLeft />
              Voltar para Página Inicial
            </Link>
          </Button>
        </div>
      </div>

      <CatalogLayout
        baseUrl={routes.preview.url}
        company={
          company ?? {
            name: "Empresa",
            mainSiteUrl: "",
            description: "",
          }
        }
        theme={
          theme ?? {
            primaryColor: "var(--foreground)",
            secondaryColor: "var(--background)",
          }
        }
      >
        {children}
      </CatalogLayout>
    </div>
  );
}
