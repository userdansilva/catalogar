import type { Prisma, User } from "generated/prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  existsById(id: string): Promise<boolean>;
  findById(id: string): Promise<User | null>;
}
