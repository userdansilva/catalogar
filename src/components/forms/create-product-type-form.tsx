"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { productTypeSchema } from "@/actions/schema";
import { toast } from "sonner";
import { routes } from "@/routes";
import { createProductTypeAction } from "@/actions/create-product-type-action";
import { ProductTypeForm } from "./product-type-form";

export function CreateProductTypeForm({
  callbackUrl,
}: {
  callbackUrl?: string
}) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    createProductTypeAction,
    zodResolver(productTypeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          slug: "",
          isDisabled: false,
          redirectTo: callbackUrl || routes.productTypes.url,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success(`Sucesso!${!callbackUrl ? " Voltando para a lista..." : ""}`, {
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
      submitButtonLabel="Criar produto"
    />
  );
}
