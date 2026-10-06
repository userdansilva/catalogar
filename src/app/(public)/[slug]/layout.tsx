import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";
import { CartStoreProvider } from "@/components/providers/cart-store-provider";

const ASCIIforAt = "%40"; // @

export const instant = false;

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug: fullSlug } = await params;

  if (!fullSlug.startsWith(ASCIIforAt)) {
    return notFound();
  }

  const slug = fullSlug.replace(ASCIIforAt, "");

  return <CartStoreProvider slug={slug}>{children}</CartStoreProvider>;
}
