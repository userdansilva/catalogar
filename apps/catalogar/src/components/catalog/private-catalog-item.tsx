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
import { Badge } from "@catalogar/ui/components/badge";
import { Button } from "@catalogar/ui/components/button";
import { cn } from "@catalogar/ui/lib/utils";
import { CloudUpload, EyeOff, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { deleteCatalogItemAction } from "@/actions/delete-catalog-item-action";
import { toggleCatalogItemStatusAction } from "@/actions/toggle-catalog-item-status-action";
import { routes } from "@/routes";
import { CarouselImages } from "./carousel-images";

type CatalogItem = {
  id: string;
  reference: string;
  title: string;
  isDisabled: boolean;
  images: {
    id: string;
    url: string;
  }[];
  categories: {
    id: string;
    name: string;
    textColor: string;
    backgroundColor: string;
    isDisabled: boolean;
  }[];
};

type PrivateCatalogItemProps = {
  catalogItem: CatalogItem;
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
        await executeToggleStatusAsync({ id: catalogItem.id });
      },
      {
        loading: `${catalogItem.isDisabled ? "Ativando" : "Ocultando"}  item de catálogo...`,
        success: `Item de catálogo ${catalogItem.isDisabled ? "ativado" : "ocultado"} com sucesso!`,
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
      <div className={cn(catalogItem.isDisabled && "opacity-60")}>
        <CarouselImages images={catalogItem.images} unoptimized />
      </div>

      <div className="flex flex-wrap gap-1">
        {catalogItem.categories
          .filter((category) => !category.isDisabled)
          .map((category) => (
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

      <div className="flex-1">
        <div
          className={cn(
            "text-base font-semibold",
            catalogItem.isDisabled && "line-through",
          )}
        >
          {catalogItem.title}
        </div>
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
          {catalogItem.isDisabled ? (
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
