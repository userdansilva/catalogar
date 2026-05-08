import { getProductTypes } from "@/services/get-product-types";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export async function ProductTypesTable() {
  const { productTypes } = await getProductTypes();

  return <DataTable columns={columns} data={productTypes} />;
}
