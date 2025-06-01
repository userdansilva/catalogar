"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { routes } from "@/routes";
import { ProductType } from "@/types/api-types";
import { updateProductTypeAction } from "@/actions/update-product-type-action";
import { productTypeSchema } from "@/actions/schema";
import { ProductTypeForm } from "./product-type-form";

type UpdateProductTypeFormProps = {
  productType: ProductType
}

export function UpdateProductTypeForm({
  productType,
}: UpdateProductTypeFormProps) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    updateProductTypeAction,
    zodResolver(productTypeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          ...productType,
          redirectTo: routes.productTypes.url,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Sucesso! Voltando para a lista...", {
            description: res.data?.message,
          });
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
    <ProductTypeForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
