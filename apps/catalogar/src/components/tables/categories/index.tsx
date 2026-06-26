import prisma from "@/lib/prisma";
import { getSession } from "@/utils/get-session";
import { DataTable } from "../data-table";
import { columns } from "./columns";

export async function CategoriesTable() {
  const session = await getSession();

  const categories = await prisma.category.findMany({
    where: {
      catalogId: session.user.currentCatalogId,
    },
  });

  return <DataTable columns={columns} data={categories} />;
}
