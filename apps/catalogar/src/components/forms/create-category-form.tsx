"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CategoryForm } from "./category-form";
import { routes } from "@/routes";
import { categorySchema } from "@/actions/schema";
import { createCategoryAction } from "@/actions/create-category-action";
import { toastServerError } from "@/utils/toast-server-error";

export function CreateCategoryForm({ callbackUrl }: { callbackUrl?: string }) {
  const router = useRouter();

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
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Categoria adicionada!", {
            description: res.data.message,
          });
          router.push(callbackUrl || routes.categories.url);
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
      submitButtonLabel="Adicionar"
    />
  );
}
