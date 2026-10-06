"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Category } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

type StoreCategoriesFilterProps = {
  categories: Category[];
  currentCategorySlug?: string;
};

export function StoreCategoriesFilter({
  categories,
  currentCategorySlug,
}: StoreCategoriesFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getSearchUrl = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);

    // Reset page
    if (params.get("p")) params.delete("p");

    if (categorySlug) {
      params.set("categoria", categorySlug);
    } else {
      params.delete("categoria");
    }

    const paramsString = params.toString();

    if (paramsString) {
      return `${pathname}?${params.toString()}`;
    }

    return pathname;
  };

  return (
    <div className="space-y-2">
      <span className="block text-lg font-semibold">Categorias</span>
      <div className="flex flex-wrap gap-2">
        <Link
          href={getSearchUrl("")}
          replace
          className={buttonVariants({
            variant: !currentCategorySlug ? "default" : "outline",
            size: "sm",
            className: cn(
              !currentCategorySlug &&
                "bg-black text-white hover:bg-neutral-800 hover:text-neutral-50",
            ),
          })}
        >
          Todas
        </Link>

        {categories.map((category) => {
          const isSelected = currentCategorySlug === category.slug;

          return (
            <Link
              key={category.id}
              href={getSearchUrl(isSelected ? "" : category.slug)}
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
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
