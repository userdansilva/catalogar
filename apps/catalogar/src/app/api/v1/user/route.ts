import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

async function getUserOrCreate({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      catalogs: true,
      currentCatalog: true,
    },
  });

  if (!user) {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email },
      });

      const catalog = await tx.catalog.create({
        data: {
          name: `${user.name}'s Catalog`,
          userId: user.id,
        },
      });

      return tx.user.update({
        where: { id: user.id },
        data: { currentCatalogId: catalog.id },
        include: {
          catalogs: true,
          currentCatalog: {
            include: {
              company: true,
              theme: {
                include: {
                  logo: true,
                },
              },
            },
          },
        },
      });
    });
  }

  if (user.catalogs.length === 0) {
    const catalog = await prisma.catalog.create({
      data: {
        name: `${user.name}'s Catalog`,
        userId: user.id,
      },
    });

    return prisma.user.update({
      where: { id: user.id },
      data: { currentCatalogId: catalog.id },
      include: {
        catalogs: true,
        currentCatalog: {
          include: {
            company: true,
            theme: {
              include: {
                logo: true,
              },
            },
          },
        },
      },
    });
  }

  if (!user.currentCatalog && user.catalogs[0]) {
    return prisma.user.update({
      where: { id: user.id },
      data: { currentCatalogId: user.catalogs[0].id },
      include: {
        catalogs: true,
        currentCatalog: {
          include: {
            company: true,
            theme: {
              include: {
                logo: true,
              },
            },
          },
        },
      },
    });
  }

  return user;
}

const syncBodySchema = z.object({
  name: z.string().min(1),
  email: z.email(),
});

export async function POST(request: Request) {
  const secret = request.headers.get("x-sync-secret");
  if (!secret || secret !== process.env.AUTH0_SYNC_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = syncBodySchema.safeParse(
    await request.json().catch(() => ({})),
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  const { name, email } = parsed.data;

  try {
    const user = await getUserOrCreate({ name, email });

    if (!user.currentCatalog) {
      throw new Error("[Internal Error][TS]: User has not a current catalog");
    }

    return NextResponse.json({ ...user, currentCatalog: user.currentCatalog });
  } catch (error) {
    console.error(error);

    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
