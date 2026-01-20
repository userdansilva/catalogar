import fastify from "fastify";
import { routes } from "./http/routes";
import { defaultErrorHandler } from "./use-cases/errors/default-error-handler";

export const app = fastify();

app.register(routes);

app.setErrorHandler(defaultErrorHandler);
