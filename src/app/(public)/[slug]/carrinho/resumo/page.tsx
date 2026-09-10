import { notFound } from "next/navigation";
import { CartItemsSummary } from "@/components/cart-items-summary";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";
import { getPublicCatalog } from "@/services/get-public-catalog";
import { Metadata } from "next";

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
      title: `Finalizar no WhatsApp - ${catalog.company?.name}`,
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

  if (
    !catalog.company ||
    !catalog.isCartEnabled ||
    !catalog.company.phoneNumber
  ) {
    notFound();
  }

  return (
    <div className="max-w-7xl space-y-6 pb-24 md:container">
      <PrevButton
        fallbackUrl={routes.public.sub.cart.url(slug)}
        className="text-black"
      />

      <h1 className="text-2xl font-semibold">Resumo</h1>

      <CartItemsSummary
        slug={slug}
        catalogItems={catalog.catalogItems}
        company={catalog.company}
      />
    </div>
  );
}
