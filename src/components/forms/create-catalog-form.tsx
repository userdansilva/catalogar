"use client";

import { catalogSchema } from "@/actions/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { createCatalogAction } from "@/actions/create-catalog-action";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { CatalogForm } from "./catalog-form";

export type CatalogFormValues = z.infer<typeof catalogSchema>

export function CreateCatalogForm() {
  const { form, handleSubmitWithAction } = useHookFormAction(
    createCatalogAction,
    zodResolver(catalogSchema),
    {
      formProps: {
        defaultValues: {
          name: "Meu Catálogo",
          slug: "meu-catalogo",
          isPublished: true
        }
      },
      actionProps: {
        onSuccess: (v) => {
          toast.success(
            // atualizar com mensagem vinda do backend
            `Catálogo: ${v.data?.catalog.name} criado com sucesso`
          )
          redirect("/")
        },
        onError: (e) => {
          const { serverError } = e.error;

          if (serverError) {
            toast.error(serverError.message)
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
