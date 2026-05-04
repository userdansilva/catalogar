import { RedirectType, redirect } from "next/navigation";
import { routes } from "@/routes";
import { getCategories } from "@/services/get-categories";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export async function CategoriesTable() {
  const { categories } = await getCategories();

  if (categories.length === 0) {
    redirect(routes.categories.sub.createFirst.url, RedirectType.replace);
  }

  return <DataTable columns={columns} data={categories} />;
}
