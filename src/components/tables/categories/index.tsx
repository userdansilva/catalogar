import { getCategories } from "@/services/get-categories";
import { columns } from "./columns";
import { DataTable } from "../data-table";

type CategoriesTableProps = {
  currentPage: number;
};

export async function CategoriesTable({ currentPage }: CategoriesTableProps) {
  const { data: categories, meta } = await getCategories({
    field: "createdAt",
    page: currentPage,
    perPage: 10,
    sort: "desc",
  });

  return (
    <DataTable
      columns={columns}
      data={categories}
      pagination={meta.pagination}
    />
  );
}
