import { getProductTypes } from "@/services/get-product-types";
import { columns } from "./columns";
import { DataTable } from "../data-table";

type ProductTypesTableProps = {
  currentPage: number;
}

export async function ProductTypesTable({
  currentPage,
}: ProductTypesTableProps) {
  const { data: productTypes, meta } = await getProductTypes({
    field: "createdAt",
    page: currentPage,
    perPage: 10,
    sort: "desc",
  });

  return (
    <DataTable
      columns={columns}
      data={productTypes}
      pagination={meta.pagination}
    />
  );
}
