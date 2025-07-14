"use client";

import { Eye, EyeOff, Pencil, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { toast } from "sonner";
import { CarouselImages } from "./carousel-images";
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

export function PrivateCatalogItem({
  catalogItem,
}: {
  catalogItem: CatalogItemType;
}) {
  const { executeAsync: executeToggleStatusAsync } = useAction(
    toggleCatalogItemStatusAction,
  );

  const { executeAsync: executeDeleteAsync } = useAction(
    deleteCatalogItemAction,
  );

  const handleToggleStatus = () =>
    toast.promise(
      async () => {
        await executeToggleStatusAsync({ id: catalogItem.id });
      },
      {
        loading: `${catalogItem.isDisabled ? "Ativando" : "Arquivando"}  item de catálogo...`,
        success: `Item de catálogo ${catalogItem.isDisabled ? "ativado" : "arquivado"} com sucesso!`,
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
    <div className="space-y-2">
      <div className={cn(catalogItem.isDisabled && "opacity-60")}>
        <CarouselImages images={catalogItem.images} unoptimized />
      </div>

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
        <div
          className={cn(
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
              <Eye className="size-2" />
              Exibir
            </Button>
          ) : (
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline">
                <EyeOff className="size-2" />
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
              <span className="inline rounded-sm border px-2 py-1 text-xs">
                <Eye className="-mt-1 mr-1 inline size-4" />
                Mostrar
              </span>
              {" ."}
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
              <Trash className="size-2" />
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
