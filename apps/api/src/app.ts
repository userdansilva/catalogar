import fastify from "fastify";
import { defaultErrorHandler } from "./common/error/default-error-handler";
import { routes } from "./http/routes";

export const app = fastify();

app.register(routes);

app.setErrorHandler(defaultErrorHandler);
