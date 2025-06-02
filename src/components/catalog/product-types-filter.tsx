"use client";

import { Button } from "@/shadcn/components/ui/button";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/shadcn/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/components/ui/popover";
import { cn } from "@/shadcn/lib/utils";
import { ProductType } from "@/types/api-types";
import { Check, ChevronsUpDown, List } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function ProductTypesFilter({
  productTypes,
  currentProductTypeSlug,
  mode,
}: {
  productTypes: ProductType[]
  currentProductTypeSlug: string
  mode: "preview" | "dashboard"
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchUrl = (slug: string) => {
    const params = new URLSearchParams(searchParams);

    // Reset page
    if (params.get("p")) {
      params.delete("p");
    }

    if (slug) {
      params.set("produto", slug);
    } else {
      params.delete("produto");
    }

    return `${pathname}?${params.toString()}`;
  };

  if (mode === "dashboard") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[200px] justify-between"
          >
            {currentProductTypeSlug
              ? productTypes
                .find((productType) => productType.slug === currentProductTypeSlug)?.name
              : (
                <span className="flex items-center gap-3">
                  <List className="size-4" />
                  Tipo de produto
                </span>
              )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar tipo de produto..." className="h-9" />
            <CommandList>
              <CommandEmpty>Nenhum tipo de produto encontrado</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  asChild
                >
                  <Link href={searchUrl("")}>
                    Todos
                    <Check
                      className={cn(
                        "ml-auto",
                        !currentProductTypeSlug ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                </CommandItem>

                {productTypes.map((productType) => (
                  <CommandItem
                    key={productType.slug}
                    value={productType.slug}
                    asChild
                    className="cursor-pointer"
                  >
                    <Link
                      href={searchUrl(productType.slug)}
                      className={cn(productType.isDisabled && "line-through")}
                    >
                      {productType.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          currentProductTypeSlug === productType.slug ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  if (productTypes.filter((productType) => !productType.isDisabled).length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-muted-foreground">Tipos de Produto</div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!currentProductTypeSlug
            ? "default"
            : "outline"}
          size="sm"
          asChild
        >
          <Link href={searchUrl("")}>
            Todos
          </Link>
        </Button>

        {productTypes
          .filter((productType) => !productType.isDisabled)
          .map((productType) => {
            const isSelected = currentProductTypeSlug === productType.slug;

            return (
              <Button
                key={productType.id}
                variant={isSelected
                  ? "default"
                  : "outline"}
                size="sm"
                asChild
              >
                <Link href={searchUrl(productType.slug)}>
                  {productType.name}
                </Link>
              </Button>
            );
          })}
      </div>
    </div>
  );
}
