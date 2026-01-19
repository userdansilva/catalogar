import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { UniqueFieldConflitError } from "@/common/error/unique-field-conflict-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { SignupUseCase } from "./signup";

describe("Signup Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const signupUseCase = new SignupUseCase(usersRepository);

    const { user } = await signupUseCase.execute({
      email: "daniel@catalogar.com.br",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user's password on signup", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const signupUseCase = new SignupUseCase(usersRepository);

    const { user } = await signupUseCase.execute({
      email: "daniel@catalogar.com.br",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not allow duplicated e-mail", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const signupUseCase = new SignupUseCase(usersRepository);

    await signupUseCase.execute({
      email: "duplicate@catalogar.com.br",
      password: "123456",
    });

    await expect(() =>
      signupUseCase.execute({
        email: "duplicate@catalogar.com.br",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UniqueFieldConflitError);
  });
});
