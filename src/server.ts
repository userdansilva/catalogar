import express from "express";
import dotenv from "dotenv";
import mustache from "mustache-express";
import path from "path";
import { mainRouter } from "./routes/mainRouter";

dotenv.config();

const server = express();

server.set("view engine", "mustache");
server.set("views", path.join(__dirname, "views"));
server.engine("mustache", mustache());

server.set("public", path.join(__dirname, "../public"));

server.use("/static", express.static(path.join(__dirname, "../public")));

server.use("/", mainRouter);

server.listen(process.env.PORT);
