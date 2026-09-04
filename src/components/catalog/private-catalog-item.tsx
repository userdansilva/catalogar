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
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CloudUpload, EyeOff, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { deleteCatalogItemAction } from "@/actions/delete-catalog-item-action";
import { toggleCatalogItemStatusAction } from "@/actions/toggle-catalog-item-status-action";
import type { Prisma } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { CarouselImages } from "./carousel-images";
import { CategoriesDisplay } from "./categories-display";
import { PriceDisplay } from "./price-display";
import { TitleDisplay } from "./title-display";
import { toast } from "../ui/toast";
import { useState } from "react";

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
  const [deleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);
  const [hideAlertDialogOpen, setHideAlertDialogOpen] = useState(false);

  const { executeAsync: executeToggleStatusAsync } = useAction(
    toggleCatalogItemStatusAction,
  );

  const { executeAsync: executeDeleteAsync } = useAction(
    deleteCatalogItemAction,
  );

  const handleToggleStatus = () =>
    toast.promise(
      executeToggleStatusAsync({
        id: catalogItem.id,
        isDisabled: !catalogItem.disabledAt,
      }),
      {
        loading: `${catalogItem.disabledAt ? "Ativando" : "Ocultando"}  item de catálogo...`,
        success: `Item de catálogo ${catalogItem.disabledAt ? "ativado" : "ocultado"} com sucesso!`,
        error: "Ocorreu uma falha ao alterar status do item de catálogo",
      },
    );

  const handleRemove = () =>
    toast.promise(executeDeleteAsync({ id: catalogItem.id }), {
      loading: "Removendo item de catálogo...",
      success: "Item de catálogo removido com sucesso!",
      error: "Ocorreu uma falha ao remover item de catálogo",
    });

  return (
    <div className="flex flex-col space-y-2">
      <div className={cn(catalogItem.disabledAt && "opacity-60")}>
        <CarouselImages images={catalogItem.images} unoptimized />
      </div>

      {catalogItem.categories.length > 0 && (
        <CategoriesDisplay
          categories={catalogItem.categories}
          shouldDisplayDisabledCategory
        />
      )}

      <div className="flex-1">
        <TitleDisplay
          title={catalogItem.title}
          isDisabled={!!catalogItem.disabledAt}
        />

        {catalogItem.price && <PriceDisplay price={catalogItem.price} />}

        <div className="text-muted-foreground text-xs">{`Código: ${catalogItem.reference}`}</div>
      </div>

      <div className="space-y-2 space-x-2">
        <Link
          href={routes.catalogItems.sub.edit.url(catalogItem.id)}
          className={buttonVariants({
            variant: "outline",
            size: "sm",
          })}
        >
          <Pencil />
          Editar
        </Link>

        {/** Hide Alert Dialog */}
        {catalogItem.disabledAt ? (
          <Button size="sm" variant="outline" onClick={handleToggleStatus}>
            <CloudUpload />
            Ativar
          </Button>
        ) : (
          <AlertDialog
            open={hideAlertDialogOpen}
            onOpenChange={setHideAlertDialogOpen}
          >
            <AlertDialogTrigger render={<Button size="sm" variant="outline" />}>
              <EyeOff />
              Ocultar
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que quer ocultar esse item?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Ao ocultar o item, ele NÃO será exibido no seu catálogo. Você
                  pode voltar a exibir a qualquer momento clicando em{" "}
                  <span
                    className={buttonVariants({
                      size: "xs",
                      variant: "outline",
                    })}
                  >
                    <CloudUpload />
                    Ativar
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleToggleStatus();
                    setHideAlertDialogOpen(false);
                  }}
                >
                  Sim! Quero ocultar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {/** Delete Alert Dialog */}
        <AlertDialog
          open={deleteAlertDialogOpen}
          onOpenChange={setDeleteAlertDialogOpen}
        >
          <AlertDialogTrigger render={<Button size="sm" variant="outline" />}>
            <Trash />
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
              <AlertDialogAction
                onClick={() => {
                  handleRemove();
                  setDeleteAlertDialogOpen(false);
                }}
              >
                Sim! Quero deletar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
