import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "@/env";
import { createCatalog } from "@/queries/catalogs";
import { prisma } from "./prisma";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [env.CLIENT_ORIGIN],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Automatically create a catalog for the new user
          await createCatalog({
            userId: user.id,
          });
        },
      },
    },
  },
});
