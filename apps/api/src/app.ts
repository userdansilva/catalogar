import { PrismaPg } from "@prisma/adapter-pg";
import fastify from "fastify";
import { PrismaClient } from "generated/prisma/client";
import { env } from "./env";

export const app = fastify();

const conectionString = env.DATABASE_URL;

const adapter = new PrismaPg({ conectionString });
const prisma = new PrismaClient({ adapter });

prisma.user.create({
  data: {
    email: "daniel.sousasilva97@outlook.com",
  },
});
