import type { Prisma, User } from "generated/prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  existsByEmail(email: string): Promise<boolean>;
}
