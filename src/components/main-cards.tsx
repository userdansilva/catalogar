import { routes } from "@/routes";
import { Button } from "@/shadcn/components/ui/button";
import {
  Card, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/shadcn/components/ui/card";
import {
  CatalogItem, Category, Product, UserWithCatalog,
} from "@/types/api-types";
import {
  Book, Box, Building2, ExternalLink, Filter, List, Paintbrush, Palette, Plus,
  View,
} from "lucide-react";
import Link from "next/link";

export function MainCards({
  products,
  categories,
  catalogItems,
  user,
}: {
  products: Product[]
  categories: Category[]
  catalogItems: CatalogItem[]
  user: UserWithCatalog
}) {
  return (
    <div className="space-y-4">
      <Card className="flex items-center bg-foreground">
        <CardHeader className="flex-1">
          <CardTitle className="text-2xl text-background">
            {user.currentCatalog.name}
          </CardTitle>

          <CardDescription className="text-background">
            <Button asChild className="dark pl-0" variant="link">
              <a
                href={`${routes.external.url}/${user.currentCatalog.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                {`${routes.external.url}/${user.currentCatalog.slug}`}
                <ExternalLink className="size-4 text-foreground" />
              </a>
            </Button>
          </CardDescription>
        </CardHeader>

        <div className="flex h-full items-center pr-6">
          <Button className="dark" asChild>
            <a
              href={`${routes.external.url}/${user.currentCatalog.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="size-4 text-background" />
              Acessar
            </a>
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="relative">
            <CardDescription>
              Meu catálogo
            </CardDescription>

            <CardTitle className="text-2xl">
              {user.currentCatalog.name}
            </CardTitle>

            <div className="absolute right-4 top-4">
              <Box className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardFooter className="grid grid-cols-2 gap-2">
            <Button asChild size="sm" className="w-full">
              <Link href={routes.catalogItems.url}>
                <Book className="size-3" />
                Catálogo
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href={routes.preview.url}>
                <View className="size-3" />
                Preview
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="relative">
            <CardDescription>
              Personalização
            </CardDescription>

            <CardTitle className="text-2xl">
              {user.currentCatalog.company?.name || "Não definido"}
            </CardTitle>

            <div className="absolute right-4 top-4">
              <Paintbrush className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardFooter className="grid grid-cols-2 gap-2">
            <Button asChild size="sm" className="w-full">
              <Link href={{
                pathname: routes.company.url,
                query: {
                  callbackUrl: routes.dashboard.url,
                },
              }}
              >
                <Building2 className="size-3" />
                Empresa
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href={{
                pathname: routes.theme.url,
                query: {
                  callbackUrl: routes.dashboard.url,
                },
              }}
              >
                <Palette className="size-3" />
                Tema
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="relative">
            <CardDescription>
              Itens de catálogo
            </CardDescription>

            <CardTitle className="text-2xl">
              {catalogItems.length}
            </CardTitle>

            <div className="absolute right-4 top-4">
              <Book className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardFooter className="grid grid-cols-2 gap-2">
            <Button asChild size="sm" className="w-full">
              <Link href={routes.catalogItems.url}>
                Ver todos
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href={{
                pathname: routes.catalogItems.sub.new.url,
                query: {
                  callbackUrl: routes.dashboard.url,
                },
              }}
              >
                <Plus className="size-3" />
                Adicionar
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="relative">
            <CardDescription>
              Produtos
            </CardDescription>

            <CardTitle className="text-2xl">
              {products.length}
            </CardTitle>

            <div className="absolute right-6 top-6">
              <List className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardFooter className="grid grid-cols-2 gap-2">
            <Button asChild size="sm" className="w-full">
              <Link href={routes.products.url}>
                Ver todos
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href={{
                pathname: routes.products.sub.new.url,
                query: {
                  callbackUrl: routes.dashboard.url,
                },
              }}
              >
                <Plus className="size-3" />
                Adicionar
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="relative">
            <CardDescription>
              Categorias
            </CardDescription>

            <CardTitle className="text-2xl">
              {categories.length}
            </CardTitle>

            <div className="absolute right-6 top-6">
              <Filter className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardFooter className="grid grid-cols-2 gap-2">
            <Button asChild size="sm" className="w-full">
              <Link href={routes.categories.url}>
                Ver todas
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href={{
                pathname: routes.categories.sub.new.url,
                query: {
                  callbackUrl: routes.dashboard.url,
                },
              }}
              >
                <Plus className="size-3" />
                Adicionar
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
