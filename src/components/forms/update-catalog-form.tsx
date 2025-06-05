"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { updateCatalogAction } from "@/actions/update-catalog-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { catalogSchema } from "@/actions/schema";
import { toast } from "sonner";
import { Catalog } from "@/types/api-types";
import { CatalogForm } from "./catalog-form";

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
        mode: "onChange",
        defaultValues: {
          name: catalog.name,
          slug: catalog.slug,
          isPublished: catalog.isPublished,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Sucesso!", {
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
    <CatalogForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
