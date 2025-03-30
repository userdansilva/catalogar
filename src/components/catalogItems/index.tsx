import { getCatalogItems } from "@/services/get-catalog-items";
import { CatalogItem } from "./catalogItem";

type CatalogItemsProps = {
  currentPage: number;
}

export async function CatalogItems({
  currentPage,
}: CatalogItemsProps) {
  const { data: catalogItems } = await getCatalogItems({
    field: "createdAt",
    page: currentPage,
    perPage: 10,
    sort: "desc",
  });

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-8">
      {catalogItems.map((catalogItem) => (
        <CatalogItem
          key={catalogItem.id}
          catalogItem={catalogItem}
        />
      ))}
    </div>
  );
}
