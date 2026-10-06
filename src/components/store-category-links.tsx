import { Category } from "@/generated/prisma/client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type StoreCategoryLinksProps = {
  categories: Category[];
};

export async function StoreCategoryLinks({
  categories,
}: StoreCategoryLinksProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h2 className="block text-lg font-semibold">Categorias</h2>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          return (
            <Link
              key={category.id}
              href={`busca/categoria/${category.slug}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
              })}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
