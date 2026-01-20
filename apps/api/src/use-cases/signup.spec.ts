import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UniqueFieldConflictError } from "@/use-cases/errors/unique-field-conflict-error";
import { SignupUseCase } from "./signup";

let usersRepository: InMemoryUsersRepository;
let signupUseCase: SignupUseCase;

describe("Signup Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    signupUseCase = new SignupUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await signupUseCase.execute({
      email: "daniel@catalogar.com.br",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user's password on signup", async () => {
    const { user } = await signupUseCase.execute({
      email: "daniel@catalogar.com.br",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not allow duplicated e-mail", async () => {
    await signupUseCase.execute({
      email: "duplicate@catalogar.com.br",
      password: "123456",
    });

    await expect(() =>
      signupUseCase.execute({
        email: "duplicate@catalogar.com.br",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UniqueFieldConflictError);
  });
});
