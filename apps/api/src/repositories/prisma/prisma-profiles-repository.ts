import type { Profile } from "generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type { UpdateProfileDTO } from "@/use-cases/dtos/update-profile-dto";
import type { ProfilesRepository } from "../profiles-repository";

export class PrismaProfilesRepository implements ProfilesRepository {
  async update(data: UpdateProfileDTO, userId: string): Promise<Profile> {
    const profile = await prisma.profile.update({
      data: {
        user_name: data.userName ?? null,
      },
      where: {
        user_id: userId,
      },
    });

    return profile;
  }
}
