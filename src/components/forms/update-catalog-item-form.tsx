"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { routes } from "@/routes";
import { toast } from "sonner";
import { CatalogItem, Category, ProductType } from "@/types/api-types";
import { updateCatalogItemAction } from "@/actions/update-catalog-item-action";
import { catalogItemSchema } from "@/actions/schema";
import { useRouter } from "next/navigation";
import { CatalogItemForm } from "./catalog-item-form";

type UpdateCatalogItemFormProps = {
  catalogItem: CatalogItem;
  categories: Category[];
  productTypes: ProductType[];
};

export function UpdateCatalogItemForm({
  catalogItem,
  categories,
  productTypes,
}: UpdateCatalogItemFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    updateCatalogItemAction,
    zodResolver(catalogItemSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          ...catalogItem,
          images: catalogItem.images.map((image) => ({
            fileName: image.fileName,
            position: image.position,
            accessUrl: image.url,
          })),
          productTypeId: catalogItem.productType.id,
          categoryIds: catalogItem.categories.map((category) => category.id),
          price: catalogItem.price?.toString(),
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Sucesso! Voltando para a lista...", {
            description: res.data?.message,
          });
          router.push(routes.catalogItems.url);
        },
        onError: (e) => {
          const { serverError } = e.error;

          if (serverError) {
            toast.error("Ops! Algo deu errado", {
              description: serverError.message,
            });
          }
        },
      },
    },
  );

  return (
    <CatalogItemForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
      categories={categories}
      productTypes={productTypes}
    />
  );
}
