"use client";

import { Button } from "@/components/ui/button";
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

type ProductTypesFilterProps = {
  productTypes: ProductType[];
  currentProductTypeSlug?: string;
};

export function ProductTypesFilter({
  productTypes,
  currentProductTypeSlug,
}: ProductTypesFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getSearchUrl = (slug: string) => {
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
                    onSelect={() => router.push(getSearchUrl(productType.slug))}
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
