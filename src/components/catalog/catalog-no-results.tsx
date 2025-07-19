"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shadcn/components/ui/button";

export function CatalogNoResults({
  query,
  searchParamNames,
}: {
  query?: string;
  searchParamNames: {
    query: string;
    page: string;
  };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);

    // Reset page filter
    if (params.get(searchParamNames.page)) {
      params.delete(searchParamNames.page);
    }

    params.delete(searchParamNames.query);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="bg-muted mb-4 rounded-full p-4">
        <Search className="text-muted-foreground h-8 w-8" />
      </div>
      <h3 className="text-foreground mb-2 text-lg font-semibold">
        Nenhum resultado
      </h3>
      {query && (
        <>
          <p className="text-muted-foreground mb-6 max-w-sm text-sm">
            {`Nenhum resultado encontrado para: ${query}`}
          </p>
          <Button variant="outline" onClick={handleClear}>
            Limpar busca
          </Button>
        </>
      )}
    </div>
  );
}
