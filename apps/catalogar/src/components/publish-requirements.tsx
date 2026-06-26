import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@catalogar/ui/components/alert";
import { Button } from "@catalogar/ui/components/button";
import { AlertCircle, Check, CircleCheckBigIcon, Lock, X } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import type { Prisma } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { PublishCatalogForm } from "./forms/publish-catalog-form";

type RequireItemProps = PropsWithChildren<{
  done?: boolean;
  href: string;
}>;

function RequireItem({ done, children, href }: RequireItemProps) {
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

export function PublishRequirements({
  currentCatalog,
}: {
  currentCatalog: Prisma.CatalogGetPayload<{
    include: {
      company: true;
      theme: true;
      productTypes: true;
      catalogItems: true;
    };
  }>;
}) {
  const { catalogItems, company, theme, productTypes } = currentCatalog;

  const isRequerimentsDone =
    productTypes.length >= 1 &&
    catalogItems.length >= 1 &&
    !!company &&
    !!theme;

  return (
    <div className="space-y-6">
      {!isRequerimentsDone ? (
        <Alert variant="destructive">
          <AlertCircle className="-mt-1 size-4" />

          <AlertTitle>Alguns requisitos ainda não foram finalizados</AlertTitle>
        </Alert>
      ) : (
        <Alert>
          <CircleCheckBigIcon className="-mt-1 size-4" />

          <AlertTitle>Tudo pronto!</AlertTitle>
          <AlertDescription>
            Defina um Link Customizado e clique em Publicar Catálogo
          </AlertDescription>
        </Alert>
      )}

      <div>Requisitos para publicar seu catálogo</div>

      <ul className="space-y-2">
        <RequireItem
          done={productTypes.length >= 1}
          href={routes.productTypes.sub.createFirst.url}
        >
          Adicione um tipo de produto
        </RequireItem>
        <RequireItem
          done={catalogItems.length >= 1}
          href={routes.catalogItems.sub.createFirst.url}
        >
          Adicione um item de catálogo
        </RequireItem>
        <RequireItem done={!!company} href={routes.company.sub.new.url}>
          Adicione informações da empresa
        </RequireItem>
        <RequireItem done={!!theme} href={routes.theme.sub.new.url}>
          Adicione o tema ao catálogo
        </RequireItem>
      </ul>

      {isRequerimentsDone ? (
        <PublishCatalogForm currentCatalog={currentCatalog} />
      ) : (
        <Button className="w-full" size="lg" disabled>
          <Lock />
          Publicar
        </Button>
      )}
    </div>
  );
}
