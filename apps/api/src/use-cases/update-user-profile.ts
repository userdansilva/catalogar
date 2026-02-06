import type { Profile } from "generated/prisma/client";
import type { ProfilesRepository } from "@/repositories/profiles-repository";

type UpdateUserProfileUseCaseRequest = {
  userName: string;
  userId: string;
};

type UpdateUserProfileUseCaseResponse = {
  profile: Profile;
};

export class UpdateUserProfileUseCase {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({
    userName,
    userId,
  }: UpdateUserProfileUseCaseRequest): Promise<UpdateUserProfileUseCaseResponse> {
    const profile = await this.profilesRepository.update(
      {
        userName,
      },
      userId,
    );

    return { profile };
  }
}
