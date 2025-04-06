"use client";

import { Button } from "@/shadcn/components/ui/button";
import { Product } from "@/types/api-types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export async function ProductsFilter(props: {
  products: Product[]
  currentProductSlug: string
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchUrl = (slug: string) => {
    const params = new URLSearchParams(searchParams);

    if (params.get("page")) {
      params.delete("page");
    }

    if (slug) {
      params.set("produto", slug);
    } else {
      params.delete("produto");
    }

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-muted-foreground">Produtos</div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!props.currentProductSlug
            ? "default"
            : "outline"}
          size="sm"
          asChild
        >
          <Link href={searchUrl("")}>
            Todos
          </Link>
        </Button>

        {props.products.map((product) => {
          const isSelected = props.currentProductSlug === product.slug;

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
