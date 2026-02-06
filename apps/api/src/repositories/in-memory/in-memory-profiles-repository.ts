import type { Profile } from "generated/prisma/client";
import type { UpdateProfileDTO } from "@/use-cases/dtos/update-profile-dto";
import type { ProfilesRepository } from "../profiles-repository";

export class InMemoryProfilesRepository implements ProfilesRepository {
  public profiles: Profile[] = [];

  async update(data: UpdateProfileDTO, userId: string): Promise<Profile> {
    const profileIndex = this.profiles.findIndex(
      (profile) => profile.user_id === userId,
    );
    const profile = this.profiles[profileIndex];

    if (profileIndex === -1 || !profile) throw new Error("Profile not found!");

    const updatedProfile: Profile = {
      ...profile,
      user_name: data.userName ?? profile.user_name,
      updated_at: new Date(),
    };

    this.profiles[profileIndex] = updatedProfile;

    return profile;
  }
}
