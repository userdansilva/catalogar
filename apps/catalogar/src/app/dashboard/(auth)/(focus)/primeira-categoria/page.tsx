import type { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { CreateCategoryForm } from "@/components/forms/create-category-form";
import { PrevButton } from "@/components/inputs/prev-button";
import prisma from "@/lib/prisma";
import { routes } from "@/routes";
import { getSession } from "@/utils/get-session";

export const metadata: Metadata = {
  title: routes.categories.sub.createFirst.title,
};

export default async function CreateFirstCategory({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getSession();

  const categoriesCount = await prisma.category.count({
    where: {
      catalogId: session.user.currentCatalogId,
    },
  });

  const { callbackUrl } = await searchParams;

  if (categoriesCount >= 1 && !callbackUrl) {
    return redirect(routes.categories.url, RedirectType.replace);
  }

  return (
    <div className="max-w-lg space-y-8">
      <PrevButton fallbackUrl={routes.dashboard.url} />

      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Vamos cadastrar sua <span className="font-bold">Categoria</span>
        </h2>

        <p className="text-muted-foreground">
          Como você categoriza seus produtos? Em temas, datas comemorativas,
          tipo de público, tamanho?
        </p>
      </div>

      <CreateCategoryForm callbackUrl={callbackUrl} />
    </div>
  );
}
