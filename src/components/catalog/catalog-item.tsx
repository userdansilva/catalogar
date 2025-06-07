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
import {
  Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/shadcn/components/ui/carousel";
import { cn } from "@/shadcn/lib/utils";
import { CatalogItem as CatalogItemType } from "@/types/api-types";
import {
  Archive, ChevronsUp, Pencil, Trash,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const isMultiple = catalogItem.images.length > 1;

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
      <Carousel className="group w-full overflow-hidden rounded-md bg-background" setApi={setApi}>
        <CarouselContent>
          {catalogItem.images.map((image) => (
            <CarouselItem
              key={image.id}
            >
              <Image
                src={image.url}
                alt={catalogItem.title}
                width={600}
                height={600}
                unoptimized={unoptimized}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {isMultiple && (
          <>
            {current > 1 && (
              <CarouselPrevious className="left-2" />
            )}

            {current < catalogItem.images.length && (
              <CarouselNext className="right-2" />
            )}

            <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
              <div className="flex space-x-2">
                {Array.from({ length: count }).map((_, i) => (
                  <span
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className={cn(
                      "block size-2 rounded-full bg-background",
                      (current === (i + 1)) && "bg-primary",
                    )}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </Carousel>

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
        <div className="text-sm text-muted-foreground">
          {catalogItem.caption}
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
