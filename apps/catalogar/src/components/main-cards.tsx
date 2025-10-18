import {
  Book,
  Box,
  Building2,
  Filter,
  List,
  Paintbrush,
  Palette,
  Plus,
  Rocket,
  View,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@catalogar/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/card";
import { redirect, RedirectType } from "next/navigation";
import { CopyButton } from "./inputs/copy-button";
import { routes } from "@/routes";
import { ProductType } from "@/services/get-product-type-by-id";
import { Category } from "@/services/get-category-by-id";
import { CatalogItem } from "@/services/get-catalog-item-by-id";
import { User } from "@/services/get-user";

export function MainCards({
  productTypes,
  categories,
  catalogItems,
  user,
}: {
  productTypes: ProductType[];
  categories: Category[];
  catalogItems: CatalogItem[];
  user: User;
}) {
  if (!user.currentCatalog) {
    redirect(routes.catalog.sub.createFirst.url, RedirectType.replace);
  }

  const publicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/@${user.currentCatalog.slug}`;

  return (
    <div className="space-y-4">
      <Card className="bg-foreground flex flex-col lg:flex-row lg:items-center">
        <CardHeader className="flex-1">
          <CardTitle className="text-background text-2xl">
            {user.currentCatalog.isPublished
              ? "Link Público"
              : "Publicar agora"}
          </CardTitle>

          {user.currentCatalog.isPublished && (
            <CardDescription className="text-background flex flex-col gap-2">
              <Link
                href={publicLink}
                target="_blank"
                className="w-full max-w-[calc(100vw-80px)] truncate underline underline-offset-2"
              >
                {publicLink}
              </Link>

              <div>
                <CopyButton
                  textToCopy={publicLink}
                  size="sm"
                  variant="outline"
                  className="dark"
                />
              </div>
            </CardDescription>
          )}
        </CardHeader>

        <CardFooter className="flex size-full items-center pr-6 sm:w-auto lg:pb-0">
          {user.currentCatalog.isPublished ? (
            <Button className="dark bg-foreground w-full sm:w-auto" asChild>
              <Link href={publicLink}>Acessar</Link>
            </Button>
          ) : (
            <Button className="dark bg-foreground w-full sm:w-auto" asChild>
              <Link href={routes.catalog.sub.prePublish.url}>
                <Rocket className="text-background size-4" />
                Publicar
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="relative">
            <CardDescription>Meu catálogo</CardDescription>

            <CardTitle className="text-2xl">
              {user.currentCatalog.name}
            </CardTitle>

            <div className="absolute top-4 right-4">
              <Box className="text-muted-foreground size-4" />
            </div>
          </CardHeader>

          <CardFooter className="grid grid-cols-2 gap-2">
            <Button asChild size="sm" className="w-full">
              <Link href={routes.catalogItems.url}>
                <Book />
                Catálogo
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href={routes.preview.url}>
                <View />
                Pré-visualização
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="relative">
            <CardDescription>Personalização</CardDescription>

            <CardTitle className="text-2xl">
              {user.currentCatalog.company?.name || "Não definido"}
            </CardTitle>

            <div className="absolute top-4 right-4">
              <Paintbrush className="text-muted-foreground size-4" />
            </div>
          </CardHeader>

          <CardFooter className="grid grid-cols-2 gap-2">
            <Button asChild size="sm" className="w-full">
              <Link
                href={{
                  pathname: routes.company.url,
                  query: {
                    callbackUrl: routes.dashboard.url,
                  },
                }}
              >
                <Building2 />
                Empresa
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link
                href={{
                  pathname: routes.theme.url,
                  query: {
                    callbackUrl: routes.dashboard.url,
                  },
                }}
              >
                <Palette />
                Tema
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="relative">
            <CardDescription>Itens de catálogo</CardDescription>

            <CardTitle className="text-2xl">{catalogItems.length}</CardTitle>

            <div className="absolute top-4 right-4">
              <Book className="text-muted-foreground size-4" />
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
              <Link
                href={{
                  pathname: routes.catalogItems.sub.new.url,
                  query: {
                    callbackUrl: routes.dashboard.url,
                  },
                }}
              >
                <Plus />
                Adicionar
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="relative">
            <CardDescription>Tipos de Produto</CardDescription>

            <CardTitle className="text-2xl">{productTypes.length}</CardTitle>

            <div className="absolute top-6 right-6">
              <List className="text-muted-foreground size-4" />
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
              <Link
                href={{
                  pathname: routes.productTypes.sub.new.url,
                  query: {
                    callbackUrl: routes.dashboard.url,
                  },
                }}
              >
                <Plus />
                Adicionar
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="relative">
            <CardDescription>Categorias</CardDescription>

            <CardTitle className="text-2xl">{categories.length}</CardTitle>

            <div className="absolute top-6 right-6">
              <Filter className="text-muted-foreground size-4" />
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
              <Link
                href={{
                  pathname: routes.categories.sub.new.url,
                  query: {
                    callbackUrl: routes.dashboard.url,
                  },
                }}
              >
                <Plus />
                Adicionar
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
