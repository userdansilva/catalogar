import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";
import Image from "next/image";

type ProductTypeWithCatalogItem = Prisma.ProductTypeGetPayload<{
  include: {
    catalogItems: {
      select: {
        images: {
          take: 1;
          orderBy: {
            position: "asc";
          };
        };
      };
    };
  };
}>;

type StoreProductTypeLinksProps = {
  productTypes: ProductTypeWithCatalogItem[];
  currentProductTypeSlug?: string;
};

/**
 * Verificar o link
 */
export function StoreProductTypeLinks({
  productTypes,
}: StoreProductTypeLinksProps) {
  const filteredProductTypes = productTypes.filter(
    (productType) =>
      !productType.disabledAt && productType.catalogItems.length >= 1,
  );

  if (filteredProductTypes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Produtos</h2>

      <div className="flex items-center space-x-2">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProductTypes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((productType) => {
              return (
                <Link
                  key={productType.id}
                  href={`busca/produto/${productType.slug}`}
                  className="border-input space-y-2 rounded-lg border px-3 pt-3 pb-2 text-center"
                >
                  <Image
                    src={productType.catalogItems[0].images[0].url}
                    width={300}
                    height={300}
                    alt=""
                    className="rounded-lg"
                  />
                  <span className="text-sm">{productType.name}</span>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
