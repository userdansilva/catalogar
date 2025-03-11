"use client";

import { createCatalogAction } from "@/actions/create-catalog-action";
import { CatalogForm, CatalogFormValues } from "./catalog-form";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export function CreateCatalogForm() {
  const { executeAsync, isExecuting } = useAction(createCatalogAction)

  function onSubmit(values: CatalogFormValues) {
    toast.promise(executeAsync(values), {
      loading: "Criando catálogo...",
      success: (data) => {
        console.log("toast sucess says: ", data)
        return "Catálogo criado com sucesso!"
      },
      // Continuar ajustando os erros
      error: (e) => {
        console.log("toast error says: ", e)
        return "fail"
      }
    })
  }

  return (
    <CatalogForm
      submitButtonLabel="Criar catálogo"
      onSubmit={onSubmit}
      isSubmitting={isExecuting}
    />
  )
}
