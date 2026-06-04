import { notFound } from "next/navigation";
import { CartItemsSummary } from "@/components/cart-items-summary";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";
import { getPublicCatalog } from "@/services/get-public-catalog";

const ASCIIforAt = "%40"; // @

export default async function CartSummaryPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
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
    <div className="max-w-7xl space-y-6 md:container pb-24">
      <PrevButton fallbackUrl={routes.public.sub.cart.url(slug)} />

      <h1 className="font-semibold text-2xl">Resumo</h1>

      <CartItemsSummary
        slug={slug}
        catalogItems={catalog.catalogItems}
        company={catalog.company}
      />
    </div>
  );
}
