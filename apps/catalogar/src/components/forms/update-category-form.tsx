"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CategoryForm } from "./category-form";
import { updateCategoryAction } from "@/actions/update-category-action";
import { categorySchema } from "@/actions/schema";
import { routes } from "@/routes";
import { Category } from "@/services/get-category-by-id";
import { toastServerError } from "@/utils/toast-server-error";

type UpdateCategoryFormProps = {
  category: Category;
};

export function UpdateCategoryForm({ category }: UpdateCategoryFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    updateCategoryAction,
    zodResolver(categorySchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          ...category,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Sucesso! Voltando para a lista...", {
            description: res.data?.message,
          });
          router.push(routes.categories.url);
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
    <CategoryForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
