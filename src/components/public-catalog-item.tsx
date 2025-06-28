"use client";

import { Badge } from "@/shadcn/components/ui/badge";
import { cn } from "@/shadcn/lib/utils";
import { CatalogItem as CatalogItemType } from "@/types/api-types";
import { Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function PublicCatalogItem({
  catalogItem,
  unoptimized,
}: {
  catalogItem: CatalogItemType
  unoptimized?: boolean
}) {
  const pathname = usePathname();

  return (
    <Link
      className={cn("space-y-2", catalogItem.isDisabled && "opacity-60")}
      href={`${pathname}/${catalogItem.reference}`}
      prefetch={!unoptimized}
    >
      <div className="relative">
        <Image
          src={catalogItem.images[0].url}
          alt="Mockup"
          width={600}
          height={600}
          unoptimized={unoptimized}
          className="rounded-md bg-background"
        />

        {catalogItem.images.length >= 2 && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-sm bg-white px-1 py-0.5 text-xs font-semibold text-muted-foreground">
            <Images className="size-3.5" />
            {catalogItem.images.length}
          </div>
        )}
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
    </Link>
  );
}
