"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductTypeForm } from "./product-type-form";
import { productTypeSchema } from "@/actions/schema";
import { routes } from "@/routes";
import { createProductTypeAction } from "@/actions/create-product-type-action";

export function CreateProductTypeForm({
  callbackUrl,
}: {
  callbackUrl?: string;
}) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    createProductTypeAction,
    zodResolver(productTypeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          isDisabled: false,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success(
            `Sucesso! ${!callbackUrl ? "Voltando para a lista..." : "Redirecionando..."}`,
            {
              description: res.data?.message,
            },
          );
          router.push(callbackUrl || routes.productTypes.url);
        },
        onError: (e) => {
          console.error(e);

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
      submitButtonLabel="Criar Tipo de Produto"
    />
  );
}
