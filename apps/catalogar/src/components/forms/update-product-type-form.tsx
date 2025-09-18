"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductTypeForm } from "./product-type-form";
import { routes } from "@/routes";
import { updateProductTypeAction } from "@/actions/update-product-type-action";
import { productTypeSchema } from "@/actions/schema";
import { ProductType } from "@/services/get-product-type-by-id";
import { toastServerError } from "@/utils/toast-server-error";

type UpdateProductTypeFormProps = {
  productType: ProductType;
};

export function UpdateProductTypeForm({
  productType,
}: UpdateProductTypeFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    updateProductTypeAction,
    zodResolver(productTypeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          ...productType,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Alterações salvas!", {
            description: res.data.message,
          });
          router.push(routes.productTypes.url);
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
    <ProductTypeForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
