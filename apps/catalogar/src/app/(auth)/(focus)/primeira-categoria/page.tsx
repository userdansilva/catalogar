import { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { CreateCategoryForm } from "@/components/forms/create-category-form";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";
import { getCategories } from "@/services/get-categories";
import { ExpectedError } from "@/components/error-handling/expected-error";

export const metadata: Metadata = {
  title: routes.categories.sub.createFirst.title,
};

export default async function CreateFirstCategory({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const [error, data] = await getCategories();

  if (error) {
    return <ExpectedError error={error} />;
  }

  const categories = data.data;

  if (categories.length >= 1 && !callbackUrl) {
    return redirect(routes.categories.url, RedirectType.replace);
  }

  return (
    <div className="max-w-lg space-y-8">
      <PrevButton url={routes.dashboard.url} />

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
