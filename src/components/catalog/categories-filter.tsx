import { Button } from "@/shadcn/components/ui/button";
import { Category } from "@/types/api-types";
import Link from "next/link";

type CategoriesFilterProps = {
  categories: Category[];
}

export function CategoriesFilter({
  categories,
}: CategoriesFilterProps) {
  return (
    <div className="flex gap-2">
      <Button asChild variant="ghost" className="underline underline-offset-2">
        <Link href="/">
          Todos
        </Link>
      </Button>

      {categories.map((category) => (
        <Button asChild variant="ghost" key={category.id}>
          <Link href="/">
            {category.name}
          </Link>
        </Button>
      ))}
    </div>
  );
}
