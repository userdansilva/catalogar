import { notFound } from "next/navigation";
import { CartItems } from "@/components/cart-items";
import { PrevButton } from "@/components/inputs/prev-button";
import { routes } from "@/routes";
import { getPublicCatalog } from "@/services/get-public-catalog";

const ASCIIforAt = "%40"; // @

export default async function CartPage({
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

  console.log(catalog.company);

  if (
    !catalog.company ||
    !catalog.isCartEnabled ||
    !catalog.company.phoneNumber
  ) {
    notFound();
  }

  return (
    <div className="max-w-7xl space-y-6 md:container">
      <PrevButton fallbackUrl={routes.public.url(slug)} />

      <CartItems slug={slug} catalogItems={catalog.catalogItems} />
    </div>
  );
}
