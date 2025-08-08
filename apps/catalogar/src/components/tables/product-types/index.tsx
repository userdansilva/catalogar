import { redirect, RedirectType } from "next/navigation";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { getProductTypes } from "@/services/get-product-types";
import { routes } from "@/routes";

type ProductTypesTableProps = {
  currentPage: number;
};

export async function ProductTypesTable({
  currentPage,
}: ProductTypesTableProps) {
  const { data: productTypes, meta } = await getProductTypes({
    field: "createdAt",
    page: currentPage,
    perPage: 10,
    sort: "desc",
  });

  if (productTypes.length === 0) {
    redirect(routes.productTypes.sub.createFirst.url, RedirectType.replace);
  }

  return (
    <DataTable
      columns={columns}
      data={productTypes}
      pagination={meta.pagination}
    />
  );
}
