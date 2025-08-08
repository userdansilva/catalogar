import { redirect, RedirectType } from "next/navigation";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { getCategories } from "@/services/get-categories";
import { routes } from "@/routes";

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

  if (categories.length === 0) {
    redirect(routes.categories.sub.createFirst.url, RedirectType.replace);
  }

  return (
    <DataTable
      columns={columns}
      data={categories}
      pagination={meta.pagination}
    />
  );
}
