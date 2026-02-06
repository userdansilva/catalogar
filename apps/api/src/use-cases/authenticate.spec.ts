import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { AuthenticateUseCase } from "./authenticate";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate", async () => {
    await inMemoryUsersRepository.create({
      email: "daniel@catalogar.com.br",
      passwordHash: await hash("123456", 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: "daniel@catalogar.com.br",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should throw invalid credentials with invalid email", async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: "daniel@catalogar.com.br",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should throw invalid credentials with invalid password", async () => {
    await inMemoryUsersRepository.create({
      email: "daniel@catalogar.com.br",
      passwordHash: await hash("123456", 6),
    });

    await expect(() =>
      authenticateUseCase.execute({
        email: "daniel@catalogar.com.br",
        password: "654321",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
