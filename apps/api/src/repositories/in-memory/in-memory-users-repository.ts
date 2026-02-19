import type { Prisma, User } from "generated/prisma/client";
import type { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      emailVerified: false,
      image: null,
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async existsById(id: string): Promise<boolean> {
    const user = await this.findById(id);

    return !!user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }
}
