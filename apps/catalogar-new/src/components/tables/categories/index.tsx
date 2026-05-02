import { headers } from "next/headers";
import { getCategories } from "@/gen/categories/categories";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export async function CategoriesTable() {
  const { data, status } = await getCategories({
    headers: await headers(),
  });

  if (status !== 200) {
    return <div>Error loading categories</div>;
  }

  return <DataTable columns={columns} data={data.categories} />;
}
