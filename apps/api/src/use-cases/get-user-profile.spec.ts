import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";

let inMemoryUsersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("GetUserProfile Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await inMemoryUsersRepository.create({
      email: "daniel@catalogar.com.br",
      password_hash: "123456",
    });

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should throw resource not found with invalid user id", async () => {
    await expect(() =>
      getUserProfileUseCase.execute({ userId: "123" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
