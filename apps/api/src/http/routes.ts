import type { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate";
import { signup } from "./controllers/signup";

export async function routes(app: FastifyInstance) {
  app.post("/users", signup);
  app.post("/sessions", authenticate);
}
