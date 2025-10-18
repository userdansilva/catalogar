import { redirect, RedirectType } from "next/navigation";
import { getCategories } from "@catalogar/shared/get-categories";
import { getAuthHeaders } from "@catalogar/shared/get-auth-headers";
import { DefaultApiError } from "@catalogar/shared/default-api-error";
import { DataTable } from "@catalogar/shared/data-table";
import { columns } from "./columns";
import { route } from "@/route";

type CategoriesTableProps = {
  currentPage: number;
};

export async function CategoriesTable({ currentPage }: CategoriesTableProps) {
  const headers = await getAuthHeaders();

  const [error, data] = await getCategories({
    headers,
    params: {
      field: "name",
      sort: "desc",
      page: currentPage.toString(),
      perPage: "10",
    },
  });

  if (error) {
    return <DefaultApiError error={error} />;
  }

  if (data.data.length === 0) {
    redirect(route.categories.sub.createFirst.url, RedirectType.replace);
  }

  return (
    <DataTable
      columns={columns}
      data={data.data}
      pagination={data.meta.pagination}
    />
  );
}
