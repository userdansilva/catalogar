import type { User } from "generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { CreateUserDTO } from "@/use-cases/dtos/create-user-dto";
import type { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password_hash: data.passwordHash,
        catalog: {
          create: {},
        },
        profile: {
          create: {},
        },
      },
      include: {
        catalog: true,
        profile: true,
      },
    });

    return user;
  }

  async existsByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
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
