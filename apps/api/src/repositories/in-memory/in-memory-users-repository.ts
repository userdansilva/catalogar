import type { User } from "generated/prisma/client";
import type { UserCreateInput } from "generated/prisma/models";
import type { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(data: UserCreateInput): Promise<User> {
    const user: User = {
      id: crypto.randomUUID().toString(),
      name: null,
      email: data.email,
      password_hash: data.password_hash,
      current_catalog_id: null,
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
