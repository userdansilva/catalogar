import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { env } from "./env";
import { routes } from "./http/routes";
import { auth } from "./lib/auth";
import { defaultErrorHandler } from "./use-cases/errors/default-error-handler";

export const app = fastify();

app.register(fastifyCors, {
  origin: env.CLIENT_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

app.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    try {
      // Construct request URL
      const url = new URL(request.url, `http://${request.headers.host}`);

      // Convert Fastify headers to standard Headers object
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });

      // Create Fetch API-compatible request
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        ...(request.body ? { body: JSON.stringify(request.body) } : {}),
      });

      // Process authentication request
      const response = await auth.handler(req);

      // Forward response to client
      reply.status(response.status);

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.send(response.body ? await response.text() : null);
    } catch (error) {
      app.log.error({ error }, "Authentication Error:");

      reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE",
      });
    }
  },
});

app.register(routes);

app.setErrorHandler(defaultErrorHandler);
