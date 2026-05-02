import { defineConfig } from "orval";

export default defineConfig({
  catalogar: {
    output: {
      mode: "tags-split",
      target: "./src/gen/catalogar.ts",
      schemas: "./src/gen/models",
      client: "fetch",
      baseUrl: "http://localhost:3333",
      mock: true,
      biome: true,
    },
    input: "./swagger.json",
  },
});
