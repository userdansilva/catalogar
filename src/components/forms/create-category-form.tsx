"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { createCategoryAction } from "@/actions/create-category-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/actions/schema";
import { routes } from "@/routes";
import { toast } from "sonner";
import { CategoryForm } from "./category-form";

export function CreateCategoryForm({
  callbackUrl,
}: {
  callbackUrl?: string
}) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    createCategoryAction,
    zodResolver(categorySchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          textColor: "#FFFFFF",
          backgroundColor: "#000000",
          isDisabled: false,
          redirectTo: callbackUrl || routes.categories.url,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success(`Sucesso! ${!callbackUrl ? "Voltando para a lista..." : "Redirecionando..."}`, {
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
    <CategoryForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Criar Categoria"
    />
  );
}
