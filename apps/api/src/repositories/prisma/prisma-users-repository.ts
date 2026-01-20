import type { Prisma, User } from "generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
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

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
