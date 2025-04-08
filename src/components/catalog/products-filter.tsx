"use client";

import { Button } from "@/shadcn/components/ui/button";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/shadcn/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/components/ui/popover";
import { cn } from "@/shadcn/lib/utils";
import { Product } from "@/types/api-types";
import { Check, ChevronsUpDown, List } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function ProductsFilter({
  products,
  currentProductSlug,
  mode,
}: {
  products: Product[]
  currentProductSlug: string
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
            {currentProductSlug
              ? products.find((product) => product.slug === currentProductSlug)?.name
              : (
                <span className="flex items-center gap-3">
                  <List className="size-4" />
                  Produto
                </span>
              )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar produto..." className="h-9" />
            <CommandList>
              <CommandEmpty>Nenhum produto encontrado</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  asChild
                >
                  <Link href={searchUrl("")}>
                    Todos
                    <Check
                      className={cn(
                        "ml-auto",
                        !currentProductSlug ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                </CommandItem>

                {products.map((product) => (
                  <CommandItem
                    key={product.slug}
                    value={product.slug}
                    asChild
                    className="cursor-pointer"
                  >
                    <Link href={searchUrl(product.slug)}>
                      {product.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          currentProductSlug === product.slug ? "opacity-100" : "opacity-0",
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

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-muted-foreground">Produtos</div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!currentProductSlug
            ? "default"
            : "outline"}
          size="sm"
          asChild
        >
          <Link href={searchUrl("")}>
            Todos
          </Link>
        </Button>

        {products.map((product) => {
          const isSelected = currentProductSlug === product.slug;

          return (
            <Button
              key={product.id}
              variant={isSelected
                ? "default"
                : "outline"}
              size="sm"
              asChild
            >
              <Link href={searchUrl(product.slug)}>
                {product.name}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
