"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { updateCategoryAction } from "@/actions/update-category-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/actions/schema";
import { routes } from "@/routes";
import { toast } from "sonner";
import { Category } from "@/types/api-types";
import { CategoryForm } from "./category-form";

type UpdateCategoryFormProps = {
  category: Category
}

export function UpdateCategoryForm({
  category,
}: UpdateCategoryFormProps) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    updateCategoryAction,
    zodResolver(categorySchema),
    {
      formProps: {
        defaultValues: {
          ...category,
          redirectTo: routes.category.home,
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
    <CategoryForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
