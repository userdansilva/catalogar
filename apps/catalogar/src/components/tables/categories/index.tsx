import { getCategories } from "@/services/get-categories";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export async function CategoriesTable() {
  const { categories } = await getCategories();

  return <DataTable columns={columns} data={categories} />;
}
