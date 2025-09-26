import { Metadata } from "next";
import { CreateCatalogForm } from "@/components/forms/create-catalog-form";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: routes.catalog.sub.new.title,
};

export default function AddCatalog() {
  return <CreateCatalogForm />;
}
