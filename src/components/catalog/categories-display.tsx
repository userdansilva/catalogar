import { Badge } from "@/components/ui/badge";
import type { Category } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

type CategoriesDisplayProps = {
  categories: Category[];
  shouldDisplayDisabledCategory?: boolean;
};

export function CategoriesDisplay({
  categories,
  shouldDisplayDisabledCategory,
}: CategoriesDisplayProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {categories
        .filter(
          (category) => shouldDisplayDisabledCategory || !category.disabledAt,
        )
        .map((category) => (
          <Badge
            key={category.id}
            style={{
              color: category.textColor,
              background: category.backgroundColor,
            }}
            className={cn("px-1.5 text-[10px]")}
          >
            {shouldDisplayDisabledCategory && category.disabledAt ? (
              <>
                <span className="line-through">{category.name}</span>
                (Desativada)
              </>
            ) : (
              category.name
            )}
          </Badge>
        ))}
    </div>
  );
}
