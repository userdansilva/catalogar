import { RedirectType, redirect } from "next/navigation";
import { routes } from "@/routes";
import { getProductTypes } from "@/services/get-product-types";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export async function ProductTypesTable() {
  const { productTypes } = await getProductTypes();

  if (productTypes.length === 0) {
    redirect(routes.productTypes.sub.createFirst.url, RedirectType.replace);
  }

  return <DataTable columns={columns} data={productTypes} />;
}
