"use client";

import { Button } from "@/shadcn/components/ui/button";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/shadcn/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/components/ui/popover";
import { cn } from "@/shadcn/lib/utils";
import { Category } from "@/types/api-types";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function CategoriesFilter({
  categories,
  currentCategorySlug,
  mode,
}: {
  categories: Category[]
  currentCategorySlug: string
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
      params.set("categoria", slug);
    } else {
      params.delete("categoria");
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
            {currentCategorySlug
              ? categories.find((category) => category.slug === currentCategorySlug)?.name
              : (
                <span className="flex items-center gap-3">
                  <Filter className="size-4" />
                  Categoria
                </span>
              )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar categoria..." className="h-9" />
            <CommandList>
              <CommandEmpty>Nenhuma categoria encontrada</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  asChild
                >
                  <Link href={searchUrl("")}>
                    Todos
                    <Check
                      className={cn(
                        "ml-auto",
                        !currentCategorySlug ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                </CommandItem>

                {categories
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((category) => (
                    <CommandItem
                      key={category.slug}
                      value={category.slug}
                      asChild
                      className="cursor-pointer"
                    >
                      <Link
                        href={searchUrl(category.slug)}
                        className={cn(category.isDisabled && "line-through")}
                      >
                        {category.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            currentCategorySlug === category.slug ? "opacity-100" : "opacity-0",
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

  if (categories.filter((category) => !category.isDisabled).length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        className={cn(!currentCategorySlug
          && "underline underline-offset-2")}
        asChild
      >
        <Link href={searchUrl("")}>
          Todos
        </Link>
      </Button>

      {categories
        .filter((category) => !category.isDisabled)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className={cn(currentCategorySlug === category.slug
              && "underline underline-offset-2")}
            asChild
          >
            <Link href={searchUrl(category.slug)}>
              {category.name}
            </Link>
          </Button>
        ))}
    </div>
  );
}
