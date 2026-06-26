import { Badge } from "@catalogar/ui/components/badge";
import type { Category } from "@/generated/prisma/client";

export function CategoriesDisplay({ categories }: { categories: Category[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {categories
        .filter((category) => !category.disabledAt)
        .map((category) => (
          <Badge
            key={category.id}
            style={{
              color: category.textColor,
              background: category.backgroundColor,
            }}
            className="px-1 shadow-none text-[10px] h-4"
          >
            {category.name}
          </Badge>
        ))}
    </div>
  );
}
