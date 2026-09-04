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
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Circle, CircleCheckBig, Filter } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/generated/prisma/client";

type CategoriesFilterProps = {
  categories: Category[];
  currentCategorySlug?: string;
  mode: "preview" | "dashboard";
  searchParamNames: {
    page: string;
    categorySlug: string;
  };
};

export function CategoriesFilter({
  categories,
  currentCategorySlug,
  mode,
  searchParamNames,
}: CategoriesFilterProps) {
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
      params.set(searchParamNames.categorySlug, slug);
    } else {
      params.delete(searchParamNames.categorySlug);
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

  if (categories.filter((category) => !category.disabledAt).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={getSearchUrl("")}
        className={buttonVariants({
          variant: "ghost",
          className: cn(!currentCategorySlug && "underline underline-offset-2"),
          size: "sm",
        })}
      >
        Todos
      </Link>

      {categories
        .filter((category) => !category.disabledAt)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((category) => {
          const isSelected = currentCategorySlug === category.slug;

          return (
            <Link
              key={category.id}
              href={getSearchUrl(isSelected ? "" : category.slug)}
              className={buttonVariants({
                variant: "ghost",
                className: cn(isSelected && "underline underline-offset-2"),
                size: "sm",
              })}
            >
              {category.name}
            </Link>
          );
        })}
    </div>
  );
}
