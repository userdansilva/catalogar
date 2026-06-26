"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@catalogar/ui/components/alert-dialog";
import { Button } from "@catalogar/ui/components/button";
import { cn } from "@catalogar/ui/lib/utils";
import { CloudUpload, EyeOff, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { deleteCatalogItemAction } from "@/actions/delete-catalog-item-action";
import { toggleCatalogItemStatusAction } from "@/actions/toggle-catalog-item-status-action";
import type { Prisma } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { CarouselImages } from "./carousel-images";
import { CategoriesDisplay } from "./categories-display";
import { PriceDisplay } from "./price-display";
import { TitleDisplay } from "./title-display";

type CatalogItemRaw = Prisma.CatalogItemGetPayload<{
  include: {
    categories: true;
    images: true;
    productType: true;
  };
}>;

type PrivateCatalogItemProps = {
  catalogItem: Omit<CatalogItemRaw, "price"> & {
    price: string | null;
  };
};

export function PrivateCatalogItem({ catalogItem }: PrivateCatalogItemProps) {
  const { executeAsync: executeToggleStatusAsync } = useAction(
    toggleCatalogItemStatusAction,
  );

  const { executeAsync: executeDeleteAsync } = useAction(
    deleteCatalogItemAction,
  );

  const handleToggleStatus = () =>
    toast.promise(
      async () => {
        await executeToggleStatusAsync({
          id: catalogItem.id,
          isDisabled: !catalogItem.disabledAt,
        });
      },
      {
        loading: `${catalogItem.disabledAt ? "Ativando" : "Ocultando"}  item de catálogo...`,
        success: `Item de catálogo ${catalogItem.disabledAt ? "ativado" : "ocultado"} com sucesso!`,
      },
    );

  const handleRemove = () =>
    toast.promise(
      async () => {
        await executeDeleteAsync({ id: catalogItem.id });
      },
      {
        loading: "Removendo item de catálogo...",
        success: "Item de catálogo removido com sucesso!",
      },
    );

  return (
    <div className="flex flex-col space-y-2">
      <div className={cn(catalogItem.disabledAt && "opacity-60")}>
        <CarouselImages images={catalogItem.images} unoptimized />
      </div>

      {catalogItem.categories.length > 0 && (
        <CategoriesDisplay categories={catalogItem.categories} />
      )}

      <div className="flex-1">
        <TitleDisplay
          title={catalogItem.title}
          isDisabled={!!catalogItem.disabledAt}
        />

        {catalogItem.price && <PriceDisplay price={catalogItem.price} />}

        <div className="text-muted-foreground text-xs">{`Código: ${catalogItem.reference}`}</div>
      </div>

      <div className="space-x-2">
        <Button size="sm" variant="outline" asChild>
          <Link href={routes.catalogItems.sub.edit.url(catalogItem.id)}>
            <Pencil />
            Editar
          </Link>
        </Button>

        <AlertDialog>
          {catalogItem.disabledAt ? (
            <Button size="sm" variant="outline" onClick={handleToggleStatus}>
              <CloudUpload />
              Ativar
            </Button>
          ) : (
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline">
                <EyeOff />
                Ocultar
              </Button>
            </AlertDialogTrigger>
          )}

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que quer ocultar esse item?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="leading-relaxed">
              Ao ocultar o item ele NÃO será exibido no seu catálogo. Você pode
              voltar a exibir a qualquer momento clicando em{" "}
              <span className="inline rounded-sm border px-2 py-1 text-xs text-nowrap">
                <CloudUpload className="-mt-1 mr-1 inline size-4" />
                Ativar
              </span>
            </AlertDialogDescription>
            <AlertDialogFooter className="mt-6">
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleToggleStatus}>
                Sim! Quero ocultar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Trash />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que quer deletar esse item?
              </AlertDialogTitle>
              <AlertDialogDescription className="leading-relaxed">
                <span className="font-bold">
                  Essa ação não poderá ser desfeita
                </span>
                . Caso queira apenas <span className="font-bold">ocultar</span>{" "}
                temporariamente esse item, você pode clicar em{" "}
                <span className="inline rounded-sm border px-2 py-1 text-xs">
                  <EyeOff className="-mt-1 mr-1 inline size-4" />
                  Ocultar
                </span>
                {" ."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6">
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemove}>
                Sim! Quero deletar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
