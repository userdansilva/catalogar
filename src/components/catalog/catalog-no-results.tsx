"use client";

import { buttonVariants } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function CatalogNoResults({
  query,
  page,
}: {
  query?: string;
  page?: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getClearUrl = () => {
    const params = new URLSearchParams(searchParams);

    // Reset page filter
    if (params.get("p")) {
      params.delete("p");
    }

    params.delete("busca");

    return params.size >= 1 ? `${pathname}?${params.toString()}` : pathname;
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="bg-muted mb-4 rounded-full p-4">
        <Search className="text-muted-foreground h-8 w-8" />
      </div>
      <h3 className="text-foreground mb-2 text-lg font-semibold">
        Nenhum resultado encontrado
      </h3>
      {(query || (page && page > 1)) && (
        <>
          <p className="text-muted-foreground mb-6 max-w-sm text-sm">
            Nenhum item foi encontrado
            {query && ` para a busca ${query}`}
            {page && page >= 2 && ` na página ${page}`}
          </p>
          <Link
            href={getClearUrl()}
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Limpar busca
          </Link>
        </>
      )}
    </div>
  );
}
