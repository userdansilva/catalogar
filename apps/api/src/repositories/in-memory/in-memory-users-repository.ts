import { randomUUID } from "node:crypto";
import type { User } from "generated/prisma/client";
import type { CreateUserDTO } from "@/use-cases/dtos/create-user-dto";
import type { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(data: CreateUserDTO): Promise<User> {
    const user: User = {
      id: randomUUID(),
      email: data.email,
      password_hash: data.passwordHash,
      role: "USER",
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);

    return !!user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }
}
