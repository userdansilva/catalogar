"use client";

import { cn } from "@catalogar/ui/lib/utils";
import { Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Prisma } from "@/generated/prisma/client";
import { CategoriesDisplay } from "./categories-display";
import { PriceDisplay } from "./price-display";
import { TitleDisplay } from "./title-display";

type CatalogItemRaw = Prisma.CatalogItemGetPayload<{
  include: {
    categories: true;
    images: true;
  };
}>;

type PublicCatalogItemProps = {
  catalogItem: Omit<CatalogItemRaw, "price"> & {
    price: string | null;
  };
  unoptimized?: boolean;
};

export function PublicCatalogItem({
  catalogItem,
  unoptimized,
}: PublicCatalogItemProps) {
  const pathname = usePathname();

  return (
    <Link
      className={cn("space-y-2", catalogItem.disabledAt && "opacity-60")}
      href={`${pathname}/${catalogItem.reference}`}
      prefetch={!unoptimized}
    >
      <div className="relative">
        <Image
          src={catalogItem.images[0]?.url || ""}
          alt="Mockup"
          width={600}
          height={600}
          unoptimized={unoptimized}
          className="bg-background rounded-md"
        />

        {catalogItem.images.length >= 2 && (
          <div className="text-muted-foreground absolute top-2 right-2 flex items-center gap-1 rounded-sm bg-white px-1 py-0.5 text-xs font-semibold">
            <Images className="size-3.5" />
            {catalogItem.images.length}
          </div>
        )}
      </div>

      {catalogItem.categories.length > 0 && (
        <CategoriesDisplay categories={catalogItem.categories} />
      )}

      <div>
        <TitleDisplay
          title={catalogItem.title}
          isDisabled={!!catalogItem.disabledAt}
        />

        {catalogItem.price && <PriceDisplay price={catalogItem.price} />}

        <div className="text-muted-foreground text-xs">{`Código: ${catalogItem.reference}`}</div>
      </div>
    </Link>
  );
}
