import type { Prisma } from "generated/prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async existsByEmail(email: string) {
    const hasUserWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!hasUserWithSameEmail;
  }
}
