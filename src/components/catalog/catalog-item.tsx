"use client";

import { deleteCatalogItemAction } from "@/actions/delete-catalog-item-action";
import { routes } from "@/routes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
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
import { Pencil, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function CatalogItem({
  catalogItem,
  withActions,
}: {
  catalogItem: CatalogItemType
  withActions?: boolean
}) {
  const { executeAsync } = useAction(deleteCatalogItemAction);

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

  const handleRemove = () => toast.promise(async () => {
    await executeAsync({ id: catalogItem.id });
  }, {
    loading: "Removendo item de catálogo...",
    success: "Item de catálogo removido com sucesso!",
  });

  return (
    <div className="space-y-2">
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
        <div className="text-base font-semibold">
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
              </AlertDialogHeader>
              <AlertDialogFooter>
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
