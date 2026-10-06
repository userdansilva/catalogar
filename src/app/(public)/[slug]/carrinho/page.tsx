import { notFound } from "next/navigation";
import { CartItems } from "@/components/cart-items";
import { getPublicCatalog } from "@/services/get-public-catalog";
import { Metadata } from "next";
import { routes } from "@/routes";

const ASCIIforAt = "%40"; // @

export const instant = false;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: slugWithAt } = await params;
  const slug = slugWithAt.replace("@", "");

  try {
    const { catalog } = await getPublicCatalog(slug);

    return {
      title: `Carrinho - ${catalog.company?.name}`,
    };
  } catch {
    return {
      title: "Não Encontrado",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug: slugWithAt } = await params;

  if (!slugWithAt.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = slugWithAt.replace(ASCIIforAt, "");

  const { catalog } = await getPublicCatalog(slug);

  if (!catalog.isCartEnabled || !catalog.company?.phoneNumber) {
    notFound();
  }

  return (
    <CartItems
      basePath={routes.public.url(slug)}
      catalogItems={catalog.catalogItems}
    />
  );
}
