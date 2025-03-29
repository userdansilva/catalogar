"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/actions/schema";
import { toast } from "sonner";
import { routes } from "@/routes";
import { createProductAction } from "@/actions/create-product-action";
import { ProductForm } from "./product-form";

export function CreateProductForm() {
  const { form, handleSubmitWithAction } = useHookFormAction(
    createProductAction,
    zodResolver(productSchema),
    {
      formProps: {
        defaultValues: {
          name: "",
          slug: "",
          isDisabled: false,
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
      submitButtonLabel="Criar produto"
    />
  );
}
