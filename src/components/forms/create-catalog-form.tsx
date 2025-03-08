"use client";

import { createCatalogAction } from "@/actions/create-catalog-action";
import { CatalogForm, CatalogFormValues } from "./catalog-form";
import { useAction } from "next-safe-action/hooks";

export function CreateCatalogForm() {
  const createCatalog = useAction(createCatalogAction)

  function onSubmit(values: CatalogFormValues) {
    createCatalog.execute(values);
  }

  return (
    <CatalogForm
      submitButtonLabel="Criar catálogo"
      onSubmit={onSubmit}
    />
  )
}
