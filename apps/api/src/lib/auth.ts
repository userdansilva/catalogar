import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "@/env";
import { makeCreateCatalogUseCase } from "@/use-cases/factories/make-create-catalog-use-case";
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
          const createCatalogUseCase = makeCreateCatalogUseCase();

          await createCatalogUseCase.execute({
            userId: user.id,
          });
        },
      },
    },
  },
});
