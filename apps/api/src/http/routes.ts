import type { FastifyInstance } from "fastify";
import { signup } from "./controllers/signup";

export async function routes(app: FastifyInstance) {
  app.post("/users", signup);
}
