import { app } from "./app";

app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then(() => {
    console.log("🛩️  Fastify is running on 3333 port!");
  });
