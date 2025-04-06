import { getCatalogItems } from "@/services/get-catalog-items";
import Fuse from "fuse.js";
import { CatalogItem } from "./catalog-item";

export async function CatalogItems(props: {
  query: string
  productSlug: string
  categorySlug: string
  // currentPage: number
}) {
  await new Promise((res) => {
    setTimeout(() => {
      res("");
    }, 500);
  });

  const { data: catalogItems } = await getCatalogItems();

  const filterdCatalogItems = (() => {
    let result = catalogItems;

    if (props.query) {
      const fuse = new Fuse(catalogItems, {
        keys: [
          "title",
          "caption",
          "product.name",
          "category.name",
        ],
      });

      result = fuse.search(props.query)
        .map((_) => _.item);
    }

    if (props.productSlug || props.categorySlug) {
      result = result.filter((catalogItem) => {
        const isProductMatch = props.productSlug
          ? catalogItem.product.slug === props.productSlug
          : true;

        const isCategoryMatch = props.categorySlug
          ? catalogItem.categories
            .some((category) => category.slug === props.categorySlug)
          : true;

        if (props.productSlug && !props.categorySlug) return isProductMatch;
        if (!props.productSlug && props.categorySlug) return isCategoryMatch;

        return isProductMatch && isCategoryMatch;
      });
    }

    return result;
  })();

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-8">
      {filterdCatalogItems.map((catalogItem) => (
        <CatalogItem
          key={catalogItem.id}
          catalogItem={catalogItem}
        />
      ))}
    </div>
  );
}
