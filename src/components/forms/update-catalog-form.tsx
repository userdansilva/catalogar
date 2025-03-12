"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { CatalogForm } from "./catalog-form";
import { updateCatalogAction } from "@/actions/update-catalog-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { catalogSchema } from "@/actions/schema";
import { toast } from "sonner";
import { Catalog } from "@/types/api-types";

type UpdateCatalogFormProps = {
  catalog: Catalog
}

export function UpdateCatalogForm({
  catalog,
}: UpdateCatalogFormProps) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    updateCatalogAction,
    zodResolver(catalogSchema),
    {
      formProps: {
        defaultValues: {
          name: catalog.name,
          slug: catalog.slug,
          isPublished: catalog.isPublished
        }
      },
      actionProps: {
        onSuccess: (v) => {
          toast.success(
            // atualizar com mensagem vinda do backend
            `Catálogo: ${v.data?.catalog.name} atualizado com sucesso`
          )
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
      submitButtonLabel="Salvar alterações"
      withSlugTip
    />
  )
}
