"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@catalogar/ui/components/pagination";

export function CatalogPagination({
  totalItems,
  itemsPerPage,
  currentPage = 1,
  searchParamNames,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage?: number;
  searchParamNames: {
    page: string;
  };
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getSearchUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page > 1) {
      params.set(searchParamNames.page, page.toString());
    } else {
      params.delete(searchParamNames.page);
    }

    return params.size >= 1 ? `${pathname}?${params.toString()}` : pathname;
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (page) => Math.abs(page - currentPage) <= 2
  );

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={getSearchUrl(currentPage - 1)}
              data-testid="page-link-prev"
            />
          </PaginationItem>
        )}

        {pages.map((page) => {
          const isCurrent = page === currentPage;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={getSearchUrl(page)}
                isActive={isCurrent}
                data-testid={isCurrent ? "page-link-current" : "page-link"}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={getSearchUrl(currentPage + 1)}
              data-testid="page-link-next"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
