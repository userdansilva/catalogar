"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CatalogItemForm } from "./catalog-item-form";
import { routes } from "@/routes";
import { updateCatalogItemAction } from "@/actions/update-catalog-item-action";
import { catalogItemSchema } from "@/actions/schema";
import { CatalogItem } from "@/services/get-catalog-item-by-id";
import { Category } from "@/services/get-category-by-id";
import { ProductType } from "@/services/get-product-type-by-id";
import { toastServerError } from "@/utils/toast-server-error";

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
            url: image.url,
            sizeInBytes: image.sizeInBytes,
            width: image.width,
            height: image.height,
            altText: image.altText,
            position: image.position,
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
            toastServerError(serverError);
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
