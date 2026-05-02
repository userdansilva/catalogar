import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { getSession } from "@/utils/get-session";

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

  /**
   * Cria o usuário e o catálogo inicial
   */
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
          currentCatalog: true,
          catalogs: true,
        },
      });
    });
  }

  /**
   * Cria o catálogo inicial para usuário existente, caso não tenha nenhum catálogo cadastrado
   */
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
        currentCatalog: true,
        catalogs: true,
      },
    });
  }

  /**
   * Caso usuário tenha catálogo mas não tenha um catálogo atual definido, define o primeiro catálogo como atual
   */
  if (!user.currentCatalog && user.catalogs[0]) {
    return prisma.user.update({
      where: { id: user.id },
      data: { currentCatalogId: user.catalogs[0].id },
      include: {
        currentCatalog: true,
        catalogs: true,
      },
    });
  }

  /**
   * Retorna o usuário com seus catálogos e catálogo atual, caso já existam
   */
  return user;
}

export async function getUser() {
  const session = await getSession();

  const { name, email } = session.user;

  if (!email || !name) {
    throw new Error("[Internal Error]: User email and name are required");
  }

  try {
    const user = await getUserOrCreate({ name, email });

    /**
     * Apenas para tipagem
     */
    if (!user.currentCatalog) {
      throw new Error("[Internal Error][TS]: User has not a current catalog");
    }

    return { ...user, currentCatalog: user.currentCatalog };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      /**
       *  Usuário já existe (unique constraint), retorna o existente
       */
      const user = await prisma.user.findUniqueOrThrow({
        where: { email },
        include: { currentCatalog: true, catalogs: true },
      });

      /**
       * Apenas para tipagem
       */
      if (!user.currentCatalog) {
        throw new Error("[Internal Error][TS]: User has not a current catalog");
      }

      return { ...user, currentCatalog: user.currentCatalog };
    }

    throw err;
  }
}
