import { Game } from "./models/Game.js";
import { sequelize } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

console.log("Keliu .env failą...");
console.log("✅ .env pakeltas!");

async function seedGames() {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Prisijungta prie DB!");

    await Game.destroy({ where: {}, truncate: true });
    console.log("✅ Išvalyti seni žaidimai!");

    const gamesData = [
      {
        status: "waiting",
        started_at: null,
        finished_at: null,
      },
      {
        status: "started",
        started_at: new Date(),
        finished_at: null,
      },
      {
        status: "finished",
        started_at: new Date(new Date() - 1000 * 60 * 60),
        finished_at: new Date(),
      },
    ];

    await Game.bulkCreate(gamesData);
    console.log("✅ Žaidimai sukurti!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Klaida sukuriant žaidimus:", error);
    process.exit(1);
  }
}

seedGames();
