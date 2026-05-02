import { prisma } from "@/lib/prisma";

export async function getUser({ id }: { id: string }) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      catalog: true,
    },
  });

  return user;
}
