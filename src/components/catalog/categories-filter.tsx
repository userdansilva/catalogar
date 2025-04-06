"use client";

import { Button } from "@/shadcn/components/ui/button";
import { cn } from "@/shadcn/lib/utils";
import { Category } from "@/types/api-types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function CategoriesFilter(props: {
  categories: Category[]
  currentCategorySlug: string;
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

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        className={cn(!props.currentCategorySlug
          && "underline underline-offset-2")}
        asChild
      >
        <Link href={searchUrl("")}>
          Todos
        </Link>
      </Button>

      {props.categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className={cn(props.currentCategorySlug === category.slug
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
