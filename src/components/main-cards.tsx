import { routes } from "@/routes";
import { Button } from "@/shadcn/components/ui/button";
import {
  Card, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/shadcn/components/ui/card";
import {
  CatalogItem, Category, ProductType, UserWithCatalog,
} from "@/types/api-types";
import {
  Book, Box, Building2, Filter, List, Paintbrush, Palette, Plus,
  Rocket,
  View,
} from "lucide-react";
import Link from "next/link";
import { CopyButton } from "./copy-button";

export function MainCards({
  productTypes,
  categories,
  catalogItems,
  user,
}: {
  productTypes: ProductType[]
  categories: Category[]
  catalogItems: CatalogItem[]
  user: UserWithCatalog
}) {
  const publicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/@${user.currentCatalog.slug}`;

  return (
    <div className="space-y-4">
      <Card className="flex flex-col bg-foreground lg:flex-row lg:items-center">
        <CardHeader className="flex-1">
          <CardTitle className="text-2xl text-background">
            {user.currentCatalog.isPublished
              ? "Link Público"
              : "Publicar agora"}
          </CardTitle>

          {user.currentCatalog.isPublished && (
            <CardDescription className="flex flex-col gap-2 text-background">
              <Link href={publicLink} target="_blank" className="w-full max-w-[calc(100vw-80px)] truncate underline underline-offset-2">
                {publicLink}
              </Link>

              <div>
                <CopyButton textToCopy={publicLink} size="sm" variant="outline" className="dark" />
              </div>
            </CardDescription>
          )}
        </CardHeader>

        <CardFooter className="flex size-full items-center pr-6 sm:w-auto lg:pb-0">
          {user.currentCatalog.isPublished ? (
            <Button className="dark w-full sm:w-auto" asChild>
              <Link href={publicLink}>
                Acessar
              </Link>
            </Button>
          ) : (
            <Button className="dark w-full sm:w-auto" asChild>
              <Link href={routes.catalog.sub.prePublish.url}>
                <Rocket className="size-4 text-background" />
                Publicar
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
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
                Pré-visualização
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <Book />
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
              Tipos de Produto
            </CardDescription>

            <CardTitle className="text-2xl">
              {productTypes.length}
            </CardTitle>

            <div className="absolute right-6 top-6">
              <List className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>

          <CardFooter className="grid grid-cols-2 gap-2">
            <Button asChild size="sm" className="w-full">
              <Link href={routes.productTypes.url}>
                <List />
                Ver todos
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href={{
                pathname: routes.productTypes.sub.new.url,
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
                <Filter />
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
