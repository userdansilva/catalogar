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
          Vamos cadastrar sua
          {" "}
          <span className="font-bold">Categoria</span>
        </h2>

        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et
          ligula sit amet est blandit molestie et in purus. Donec vitae
          convallis libero, ac fermentum magna. Aenean vitae pharetra dolor.
          Proin nec.
        </p>
      </div>

      <CreateCategoryForm
        callbackUrl={callbackUrl}
      />
    </div>
  );
}
