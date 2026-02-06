import type { Profile } from "generated/prisma/client";
import type { UpdateProfileDTO } from "@/use-cases/dtos/update-profile-dto";

export interface ProfilesRepository {
  update(data: UpdateProfileDTO, userId: string): Promise<Profile>;
}
