import prisma from "@/lib/prisma";
import { getSession } from "@/utils/get-session";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export async function ProductTypesTable() {
  const session = await getSession();

  const productTypes = await prisma.productType.findMany({
    where: {
      catalogId: session.user.currentCatalogId,
    },
  });

  return <DataTable columns={columns} data={productTypes} />;
}
