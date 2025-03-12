"use client";

import { catalogSchema } from "@/actions/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { createCatalogAction } from "@/actions/create-catalog-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CatalogForm } from "./catalog-form";

export type CatalogFormValues = z.infer<typeof catalogSchema>

export function CreateCatalogForm() {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    createCatalogAction,
    zodResolver(catalogSchema),
    {
      formProps: {
        defaultValues: {
          name: "",
          slug: "",
          isPublished: true
        }
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Sucesso!", {
            description: res.data?.message
          })
          router.push("/")
        },
        onError: (e) => {
          const { serverError } = e.error;

          if (serverError) {
            toast.error("Ops! Algo deu errado", {
              description: serverError.message
            })
          }
        }
      }
    }
  );

  return (
    <CatalogForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Criar catálogo"
    />
  )
}
