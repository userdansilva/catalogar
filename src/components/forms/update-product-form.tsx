"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { routes } from "@/routes";
import { Product } from "@/types/api-types";
import { updateProductAction } from "@/actions/update-product-action";
import { productSchema } from "@/actions/schema";
import { ProductForm } from "./product-form";

type UpdateProductFormProps = {
  product: Product
}

export function UpdateProductForm({
  product,
}: UpdateProductFormProps) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    updateProductAction,
    zodResolver(productSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          ...product,
          redirectTo: routes.products.url,
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
    <ProductForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
