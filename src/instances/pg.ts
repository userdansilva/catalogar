import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.PG_DB || "postgres",
  username: process.env.PG_USER || "postgres",
  password: process.env.PG_PSW || "",
  port: parseInt(process.env.PG_PORT || "5432"),
});