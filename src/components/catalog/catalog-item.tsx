"use client";

import { deleteCatalogItemAction } from "@/actions/delete-catalog-item-action";
import { toggleCatalogItemStatusAction } from "@/actions/toggle-catalog-item-status-action";
import { routes } from "@/routes";
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
} from "@/shadcn/components/ui/alert-dialog";
import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { cn } from "@/shadcn/lib/utils";
import { CatalogItem as CatalogItemType } from "@/types/api-types";
import {
  Archive, ChevronsUp, Pencil, Trash,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { toast } from "sonner";
import { CarouselImages } from "./carousel-images";

export function CatalogItem({
  catalogItem,
  withActions,
  unoptimized,
}: {
  catalogItem: CatalogItemType
  withActions?: boolean
  unoptimized?: boolean
}) {
  const {
    executeAsync: executeToggleStatusAsync,
  } = useAction(toggleCatalogItemStatusAction);

  const {
    executeAsync: executeDeleteAsync,
  } = useAction(deleteCatalogItemAction);

  const handleToggleStatus = () => toast.promise(async () => {
    await executeToggleStatusAsync({ id: catalogItem.id });
  }, {
    loading: `${catalogItem.isDisabled ? "Ativando" : "Arquivando"}  item de catálogo...`,
    success: `Item de catálogo ${catalogItem.isDisabled ? "ativado" : "arquivado"} com sucesso!`,
  });

  const handleRemove = () => toast.promise(async () => {
    await executeDeleteAsync({ id: catalogItem.id });
  }, {
    loading: "Removendo item de catálogo...",
    success: "Item de catálogo removido com sucesso!",
  });

  return (
    <div className={cn("space-y-2", catalogItem.isDisabled && "opacity-60")}>
      <CarouselImages
        images={catalogItem.images}
        unoptimized={unoptimized}
      />

      <div className="flex flex-wrap gap-1">
        {catalogItem.categories.map((category) => (
          <Badge
            key={category.id}
            style={{
              color: category.textColor,
              background: category.backgroundColor,
            }}
            className="px-1 shadow-none"
          >
            {category.name}
          </Badge>
        ))}
      </div>

      <div>
        <div className={cn(
          "text-base font-semibold",
          catalogItem.isDisabled && "line-through",
        )}
        >
          {catalogItem.title}
        </div>
        <div className="text-xs text-muted-foreground">
          {`Código: ${catalogItem.reference}`}
        </div>
      </div>

      {withActions && (
        <div className="space-x-2">
          <Button size="sm" variant="outline" asChild>
            <Link href={routes.catalogItems.sub.edit.url(catalogItem.id)}>
              <Pencil className="size-2" />
              Editar
            </Link>
          </Button>

          <AlertDialog>
            {catalogItem.isDisabled ? (
              <Button size="sm" variant="outline" onClick={handleToggleStatus}>
                <ChevronsUp className="size-2" />
              </Button>
            ) : (
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Archive className="size-2" />
                </Button>
              </AlertDialogTrigger>
            )}

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que quer arquivar esse item?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                Ao arquivar o item ele será ocultado do seu catálogo.
                Você pode reativar a qualquer momento clicando em
                {" "}
                <div className="inline rounded-sm border p-2">
                  <ChevronsUp className="inline size-4" />
                </div>
                {" ."}
              </AlertDialogDescription>
              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleToggleStatus}>
                  Sim! Quero arquivar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Trash className="size-2" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que quer remover esse item?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não poderá ser desfeita. Caso queira apenas
                  {" "}
                  <span className="font-bold">
                    ocultar
                  </span>
                  {" "}
                  esse item você pode
                  {" "}
                  <span className="font-bold">
                    arquivar
                  </span>
                  .
                </AlertDialogDescription>
                <AlertDialogTitle className="text-base">
                  Como arquivar esse item?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Clique em
                  {" "}
                  <span className="rounded-sm border p-2 text-xs">
                    Cancelar
                  </span>
                  {" "}
                  e depois no botão
                  {" "}
                  <div className="inline rounded-sm border p-2">
                    <Archive className="inline size-4" />
                  </div>
                  {" ."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemove}>
                  Sim! Quero remover
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
