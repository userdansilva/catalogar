import type { User } from "generated/prisma/client";
import type { CreateUserDTO } from "@/use-cases/dtos/create-user-dto";

export interface UsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  existsByEmail(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
