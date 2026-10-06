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
import { ChevronsUpDown, Circle, CircleCheckBig, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/generated/prisma/client";

type CategoriesFilterProps = {
  categories: Category[];
  currentCategorySlug?: string;
};

export function CategoriesFilter({
  categories,
  currentCategorySlug,
}: CategoriesFilterProps) {
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
      params.set("categoria", slug);
    } else {
      params.delete("categoria");
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
        {currentCategorySlug ? (
          <span className="truncate">
            {
              categories.find(
                (category) => category.slug === currentCategorySlug,
              )?.name
            }
          </span>
        ) : (
          <span className="flex items-center gap-3">
            <Filter className="size-4" />
            Categoria
          </span>
        )}
        <ChevronsUpDown className="opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder="Buscar categoria..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhuma categoria encontrada</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => router.push(getSearchUrl(""))}
                className="cursor-pointer"
              >
                {!currentCategorySlug ? <CircleCheckBig /> : <Circle />}
                Todas
              </CommandItem>

              {categories
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <CommandItem
                    key={category.slug}
                    value={category.slug}
                    onSelect={() => router.push(getSearchUrl(category.slug))}
                    className="cursor-pointer"
                  >
                    {currentCategorySlug === category.slug ? (
                      <CircleCheckBig />
                    ) : (
                      <Circle />
                    )}
                    {category.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
