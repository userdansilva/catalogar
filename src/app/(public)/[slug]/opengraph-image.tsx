/* eslint-disable @next/next/no-img-element */
import { getPublicCatalog } from "@/services/get-public-catalog";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const interBold = await readFile(
  join(process.cwd(), "src/assets/fonts/Inter-Bold.ttf"),
);

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: slugWithAt } = await params;
  const slug = slugWithAt.replace("@", "");

  try {
    const { catalog } = await getPublicCatalog(slug);

    if (catalog.theme?.logo?.url) {
      return new ImageResponse(
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            backgroundColor: catalog.theme?.primaryColor,
          }}
        >
          <div
            style={{
              width: "80%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={catalog.theme.logo.url}
              height="100%"
              alt="logo"
              style={{
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>,
        {
          ...size,
        },
      );
    }

    return new ImageResponse(
      <div
        style={{
          fontSize: 128,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: catalog.theme?.primaryColor,
          color: catalog.theme?.secondaryColor,
        }}
      >
        <b
          style={{
            fontSize: 128,
          }}
        >
          {catalog.company?.name}
        </b>
      </div>,
      {
        ...size,
        fonts: [
          {
            name: "Inter",
            data: interBold,
            style: "normal",
            weight: 600,
          },
        ],
      },
    );
  } catch {
    return;
  }
}
