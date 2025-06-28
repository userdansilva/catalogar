import { routes } from "@/routes";
import { Alert, AlertTitle } from "@/shadcn/components/ui/alert";
import { Button } from "@/shadcn/components/ui/button";
import {
  CatalogItem, ProductType, UserWithCatalog,
} from "@/types/api-types";
import {
  AlertCircle, Check, CircleCheckBigIcon, Lock, X,
} from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { PublishCatalogForm } from "./forms/publish-catalog-form";

function RequireItem({ done, children, href }: PropsWithChildren<{
  done?: boolean
  href: string
}>) {
  return (
    <li className="flex items-center gap-2">
      {done ? (
        <>
          <Check className="size-4 text-green-600" />
          <span>{children}</span>
        </>
      ) : (
        <>
          <X className="size-4 text-red-600" />
          <Link
            href={{
              pathname: href,
              query: {
                callbackUrl: routes.catalog.sub.prePublish.url,
              },
            }}
            prefetch
            className="underline underline-offset-2"
          >
            {children}
          </Link>
        </>
      )}
    </li>
  );
}

type PublishRequirementsProps = {
  user: UserWithCatalog;
  productTypes: ProductType[];
  catalogItems: CatalogItem[];
}

export function PublishRequirements({
  user, productTypes, catalogItems,
}: PublishRequirementsProps) {
  const isRequerimentsDone = productTypes.length >= 1
    && catalogItems.length >= 1
    && !!user.currentCatalog.company
    && !!user.currentCatalog.theme;

  return (
    <div className="space-y-6">
      {!isRequerimentsDone ? (
        <Alert variant="destructive">
          <AlertCircle className="-mt-1 size-4" />

          <AlertTitle>
            Alguns requisitos ainda não foram finalizados
          </AlertTitle>
        </Alert>
      ) : (
        <Alert>
          <CircleCheckBigIcon className="-mt-1 size-4" />

          <AlertTitle>
            Tudo pronto! Defina um Link Customizado e clique em Publicar Catálogo
          </AlertTitle>
        </Alert>
      )}

      <div>Requisitos para publicar seu catálogo</div>

      <ul className="space-y-2">
        <RequireItem done={productTypes.length >= 1} href={routes.productTypes.sub.createFirst.url}>
          Adicione um tipo de produto
        </RequireItem>
        <RequireItem done={catalogItems.length >= 1} href={routes.catalogItems.sub.createFirst.url}>
          Adicione um item de catálogo
        </RequireItem>
        <RequireItem done={!!user.currentCatalog.company} href={routes.company.sub.new.url}>
          Adicione informações da empresa
        </RequireItem>
        <RequireItem done={!!user.currentCatalog.theme} href={routes.theme.sub.new.url}>
          Adicione o tema ao catálogo
        </RequireItem>
      </ul>

      {isRequerimentsDone ? (
        <PublishCatalogForm
          currentCatalog={user.currentCatalog}
        />
      ) : (
        <Button className="w-full" size="lg" disabled>
          <Lock />
          Publicar
        </Button>
      )}
    </div>
  );
}
