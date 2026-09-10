/* eslint-disable @next/next/no-img-element */
import { getPublicCatalog } from "@/services/get-public-catalog";
import { ImageResponse } from "next/og";

export const size = {
  width: 600,
  height: 600,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{
    reference: string;
    slug: string;
  }>;
}) {
  const { slug: slugWithAt, reference } = await params;
  const slug = slugWithAt.replace("@", "");

  const { catalog } = await getPublicCatalog(slug);

  const catalogItem = catalog.catalogItems.find(
    (item) => Number(item.reference) === Number(reference),
  );

  if (catalog.theme?.logo?.url) {
    return new ImageResponse(
      <img
        src={catalogItem?.images[0].url}
        height={600}
        alt={`Imagem de: ${catalogItem?.title}`}
      />,
      {
        ...size,
      },
    );
  }
}
