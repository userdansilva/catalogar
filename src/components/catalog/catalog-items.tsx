import { CatalogItem as TCatalogItem } from "@/types/api-types";
import { CatalogItem } from "./catalog-item";

export function CatalogItems(props: {
  catalogItems: TCatalogItem[]
}) {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-8">
      {props.catalogItems.map((catalogItem) => (
        <CatalogItem
          key={catalogItem.id}
          catalogItem={catalogItem}
        />
      ))}
    </div>
  );
}
