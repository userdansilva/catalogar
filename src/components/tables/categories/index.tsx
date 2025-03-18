import { getCategories } from "@/services/get-categories"
import { DataTable } from "./data-table";
import { columns } from "./columns";

type CategoriesTableProps = {
  query: string;
  currentPage: number;
}

export async function CategoriesTable({
  currentPage
}: CategoriesTableProps) {
  const { data: categories, meta } = await getCategories({
    field: "createdAt",
    page: currentPage,
    perPage: 10,
    sort: "desc"
  });

  return (
    <DataTable
      columns={columns}
      data={categories}
      pagination={meta.pagination}
    />
  )
}
