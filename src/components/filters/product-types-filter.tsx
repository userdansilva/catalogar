"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, Circle, CircleCheckBig, List } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProductType } from "@/generated/prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ProductTypesFilterProps = {
  productTypes: ProductType[];
  currentProductTypeSlug?: string;
  mode: "preview" | "dashboard";
  searchParamNames: {
    page: string;
    productSlug: string;
  };
};

export function ProductTypesFilter({
  productTypes,
  currentProductTypeSlug,
  mode,
  searchParamNames,
}: ProductTypesFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getSearchUrl = (slug: string) => {
    const params = new URLSearchParams(searchParams);

    // Reset page
    if (params.get(searchParamNames.page)) {
      params.delete(searchParamNames.page);
    }

    if (slug) {
      params.set(searchParamNames.productSlug, slug);
    } else {
      params.delete(searchParamNames.productSlug);
    }

    return `${pathname}?${params.toString()}`;
  };

  if (mode === "dashboard") {
    return (
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              role="combobox"
              className="max-w-48 cursor-pointer justify-between"
            />
          }
        >
          {currentProductTypeSlug ? (
            <span>
              {
                productTypes.find(
                  (productType) => productType.slug === currentProductTypeSlug,
                )?.name
              }
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <List className="size-4" />
              Tipo de Produto
            </span>
          )}
          <ChevronsUpDown className="opacity-50" />
        </PopoverTrigger>
        <PopoverContent className="w-60 p-0">
          <Command>
            <CommandInput
              placeholder="Buscar tipo de produto..."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>Nenhum tipo de produto encontrado</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  onSelect={() => router.push(getSearchUrl(""))}
                  className="cursor-pointer"
                >
                  {!currentProductTypeSlug ? <CircleCheckBig /> : <Circle />}
                  Todos
                </CommandItem>

                {productTypes
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((productType) => (
                    <CommandItem
                      key={productType.slug}
                      value={productType.slug}
                      onSelect={() =>
                        router.push(getSearchUrl(productType.slug))
                      }
                      className="cursor-pointer"
                    >
                      {currentProductTypeSlug === productType.slug ? (
                        <CircleCheckBig />
                      ) : (
                        <Circle />
                      )}
                      {productType.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  if (
    productTypes.filter((productType) => !productType.disabledAt).length === 0
  ) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-wrap gap-2">
        <Link
          href={getSearchUrl("")}
          className={buttonVariants({
            variant: !currentProductTypeSlug ? "default" : "outline",
            size: "sm",
            className: cn(
              !currentProductTypeSlug &&
                "bg-black text-white hover:bg-neutral-800 hover:text-neutral-50",
            ),
          })}
        >
          Todos
        </Link>

        {productTypes
          .filter((productType) => !productType.disabledAt)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((productType) => {
            const isSelected = currentProductTypeSlug === productType.slug;

            return (
              <Link
                key={productType.id}
                href={getSearchUrl(isSelected ? "" : productType.slug)}
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
