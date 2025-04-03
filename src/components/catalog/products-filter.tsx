import { Button } from "@/shadcn/components/ui/button";
import { Product } from "@/types/api-types";
import Link from "next/link";

type ProductsFilterProps = {
  products: Product[];
}

export async function ProductsFilter({
  products,
}: ProductsFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-muted-foreground">Produtos</div>
      <div className="flex flex-wrap gap-2">
        <Button asChild size="sm">
          <Link href="/">
            Todos
          </Link>
        </Button>

        {products.map((product) => (
          <Button asChild key={product.id} variant="outline" size="sm">
            <Link href="/">
              {product.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
