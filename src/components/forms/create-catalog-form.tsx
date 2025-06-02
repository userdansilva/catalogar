"use client";

import { catalogSchema } from "@/actions/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { createCatalogAction } from "@/actions/create-catalog-action";
import { toast } from "sonner";
import { routes } from "@/routes";
import { CatalogForm } from "./catalog-form";

export type CatalogFormValues = z.infer<typeof catalogSchema>

export function CreateCatalogForm() {
  const { form, handleSubmitWithAction } = useHookFormAction(
    createCatalogAction,
    zodResolver(catalogSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          slug: "",
          isPublished: true,
          redirectTo: routes.dashboard.url,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Sucesso! Redirecionando para tela inicial...", {
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
      submitButtonLabel="Criar catálogo"
      withSlugAutocomplete
    />
  );
}
