import { CreateCategoryForm } from "@/components/forms/create-category-form";
import { routes } from "@/routes";
import { getCategories } from "@/services/get-categories";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: routes.categories.sub.createFirst.title,
};

export default async function CreateFirstCategory({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams;
  const { data: categories } = await getCategories();

  if (categories.length >= 1) {
    return redirect(routes.productTypes.url);
  }

  return (
    <div className="max-w-lg space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl tracking-tight">
          Opa! Vamos cadastrar sua
          {" "}
          <span className="font-bold">Categoria</span>
        </h2>

        <p className="text-muted-foreground">
          As informações abaixo ajudam seus clientes — e futuros clientes — a
          conhecer melhor sua empresa.
          Tudo isso será exibido no seu catálogo e vai facilitar o contato,
          além de fortalecer a conexão com seu público. Bora começar?
        </p>
      </div>

      <CreateCategoryForm
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
