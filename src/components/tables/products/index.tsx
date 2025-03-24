import { getProducts } from "@/services/get-products";
import { columns } from "./columns";
import { DataTable } from "../data-table";

type ProductsTableProps = {
  currentPage: number;
}

export async function ProductsTable({
  currentPage,
}: ProductsTableProps) {
  const { data: products, meta } = await getProducts({
    field: "createdAt",
    page: currentPage,
    perPage: 10,
    sort: "desc",
  });

  return (
    <DataTable
      columns={columns}
      data={products}
      pagination={meta.pagination}
    />
  );
}
