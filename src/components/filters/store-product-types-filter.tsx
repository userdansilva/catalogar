"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ProductType } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

type StoreProductTypesFilterProps = {
  productTypes: ProductType[];
  currentproductTypeSlug?: string;
};

export function StoreProductTypesFilter({
  productTypes,
  currentproductTypeSlug,
}: StoreProductTypesFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getSearchUrl = (productTypeSlug: string) => {
    const params = new URLSearchParams(searchParams);

    // Reset page
    if (params.get("p")) params.delete("p");

    if (productTypeSlug) {
      params.set("produto", productTypeSlug);
    } else {
      params.delete("produto");
    }

    const paramsString = params.toString();

    if (paramsString) {
      return `${pathname}?${params.toString()}`;
    }

    return pathname;
  };

  return (
    <div className="space-y-2">
      <span className="block text-lg font-semibold">Produtos</span>
      <div className="flex flex-wrap gap-2">
        <Link
          href={getSearchUrl("")}
          replace
          className={buttonVariants({
            variant: !currentproductTypeSlug ? "default" : "outline",
            size: "sm",
            className: cn(
              !currentproductTypeSlug &&
                "bg-black text-white hover:bg-neutral-800 hover:text-neutral-50",
            ),
          })}
        >
          Todos
        </Link>

        {productTypes.map((productType) => {
          const isSelected = currentproductTypeSlug === productType.slug;

          return (
            <Link
              key={productType.id}
              href={getSearchUrl(isSelected ? "" : productType.slug)}
              replace
              className={buttonVariants({
                variant: isSelected ? "default" : "outline",
                size: "sm",
                className: cn(
                  isSelected &&
                    "bg-black text-white hover:bg-neutral-800 hover:text-neutral-50",
                ),
              })}
            >
              {productType.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
