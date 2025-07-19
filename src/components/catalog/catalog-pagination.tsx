"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/components/ui/pagination";

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

    return `${pathname}?${params.toString()}`;
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious href={getSearchUrl(currentPage - 1)} />
            </PaginationItem>

            {currentPage === totalPages && totalPages > 2 && (
              <PaginationItem>
                <PaginationLink href={getSearchUrl(currentPage - 2)}>
                  {currentPage - 2}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={getSearchUrl(currentPage - 1)}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationLink href={getSearchUrl(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink href={getSearchUrl(currentPage + 1)}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>

            {currentPage === 1 && totalPages > 2 && (
              <PaginationItem>
                <PaginationLink href={getSearchUrl(3)}>3</PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext href={getSearchUrl(currentPage + 1)} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
