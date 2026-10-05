import { Catalog } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

type SearchLinkProps = {
  catalog: Catalog;
  isPreview?: boolean;
  currentProductTypeSlug?: string;
  currentCategorySlug?: string;
  currentQuery?: string;
};

export function StoreSearchLink({
  catalog,
  isPreview,
  currentProductTypeSlug,
  currentCategorySlug,
  currentQuery,
}: SearchLinkProps) {
  const searchLink = isPreview
    ? routes.preview.sub.search.url
    : routes.public.sub.search.url(catalog.slug || "");

  const homeLink = isPreview
    ? routes.preview.url
    : routes.public.url(catalog.slug || "");

  const getSearchUrl = () => {
    const params = new URLSearchParams();

    if (currentQuery) {
      params.set("busca", currentQuery);
    }

    if (currentCategorySlug) {
      params.set("categoria", currentCategorySlug);
    }

    if (currentProductTypeSlug) {
      params.set("produto", currentProductTypeSlug);
    }

    const paramsString = params.toString();

    if (paramsString) {
      return `${searchLink}?${params}`;
    }

    return searchLink;
  };

  const getClearSearchUrl = () => {
    const params = new URLSearchParams();

    if (currentCategorySlug) {
      params.set("categoria", currentCategorySlug);
    }

    if (currentProductTypeSlug) {
      params.set("produto", currentProductTypeSlug);
    }

    const paramsString = params.toString();

    if (paramsString) {
      return `${homeLink}?${params}`;
    }

    return homeLink;
  };

  return (
    <div className="space-y-4">
      <div className="border-input flex items-center rounded-full border pr-3 shadow-xs">
        <Link
          href={getSearchUrl()}
          className={cn(
            !currentQuery && "text-muted-foreground",
            "mr-3 flex flex-1 items-center gap-3 truncate rounded-l-full py-4 pl-4 text-sm",
          )}
        >
          <SearchIcon
            className={cn(!currentQuery && "text-muted-foreground", "size-5")}
          />
          <span className="flex-1 truncate">
            {currentQuery ? currentQuery : "O que você está procurando?"}
          </span>
        </Link>
        {currentQuery && (
          <Link
            href={getClearSearchUrl()}
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "mr-2",
            })}
          >
            <XIcon />
          </Link>
        )}
      </div>
    </div>
  );
}
