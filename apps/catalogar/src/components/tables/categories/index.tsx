import { redirect, RedirectType } from "next/navigation";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { getCategories } from "@/services/get-categories";
import { routes } from "@/routes";
import { ExpectedError } from "@/components/error-handling/expected-error";

type CategoriesTableProps = {
  currentPage: number;
};

export async function CategoriesTable({ currentPage }: CategoriesTableProps) {
  const [error, data] = await getCategories({
    params: {
      field: "name",
      sort: "desc",
      page: currentPage.toString(),
      perPage: "10",
    },
  });

  if (error) {
    return <ExpectedError error={error} />;
  }

  if (data.data.length === 0) {
    redirect(routes.categories.sub.createFirst.url, RedirectType.replace);
  }

  return (
    <DataTable
      columns={columns}
      data={data.data}
      pagination={data.meta.pagination}
    />
  );
}
