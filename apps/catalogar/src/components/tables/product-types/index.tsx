import { redirect, RedirectType } from "next/navigation";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { getProductTypes } from "@/services/get-product-types";
import { routes } from "@/routes";
import { ExpectedError } from "@/components/error-handling/expected-error";

type ProductTypesTableProps = {
  currentPage: number;
};

export async function ProductTypesTable({
  currentPage,
}: ProductTypesTableProps) {
  const [error, data] = await getProductTypes({
    params: {
      field: "createdAt",
      page: currentPage,
      perPage: 10,
      sort: "desc",
    },
  });

  if (error) {
    return <ExpectedError error={error} />;
  }

  const productTypes = data.data;

  if (productTypes.length === 0) {
    redirect(routes.productTypes.sub.createFirst.url, RedirectType.replace);
  }

  return (
    <DataTable
      columns={columns}
      data={productTypes}
      pagination={data.meta.pagination}
    />
  );
}
