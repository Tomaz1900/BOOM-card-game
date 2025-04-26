import dotenv from "dotenv";
console.log("🚀 Keliu .env failą...");
dotenv.config();
console.log("✅ .env pakeltas!");

console.log("🔍 DB_USER yra:", process.env.DB_USER);
console.log("🔍 DB_PASSWORD yra:", process.env.DB_PASSWORD);
console.log("🔍 DB_NAME yra:", process.env.DB_NAME);
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: Number(process.env.DB_PORT),
  }
);
