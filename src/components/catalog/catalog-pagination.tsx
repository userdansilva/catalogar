"use client";

import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/shadcn/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export function CatalogPagination(props: {
  totalItems: number
  itemsPerPage: number
  currentPage: number
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page > 1) {
      params.set("p", page.toString());
    } else {
      params.delete("p");
    }

    return `${pathname}?${params.toString()}`;
  };

  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);

  return (
    <Pagination>
      <PaginationContent>
        {props.currentPage > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious href={searchUrl(props.currentPage - 1)} />
            </PaginationItem>

            {props.currentPage === totalPages && (
              <PaginationItem>
                <PaginationLink href={searchUrl(props.currentPage - 2)}>
                  {props.currentPage - 2}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={searchUrl(props.currentPage - 1)}>
                {props.currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationLink href={searchUrl(props.currentPage)} isActive>
            {props.currentPage}
          </PaginationLink>
        </PaginationItem>

        {props.currentPage < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink href={searchUrl(props.currentPage + 1)}>
                {props.currentPage + 1}
              </PaginationLink>
            </PaginationItem>

            {props.currentPage === 1 && (
              <PaginationItem>
                <PaginationLink href={searchUrl(3)}>
                  3
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext href={searchUrl(props.currentPage + 1)} />
            </PaginationItem>
          </>
        )}

      </PaginationContent>
    </Pagination>
  );
}
