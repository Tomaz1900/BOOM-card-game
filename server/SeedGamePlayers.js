import { GamePlayer } from "./models/GamePlayer.js";
import { sequelize } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

console.log("🚀 Keliu .env failą...");
console.log("✅ .env pakeltas!");

async function seedGamePlayers() {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Prisijungta prie DB!");

    await GamePlayer.destroy({ where: {}, truncate: true });
    console.log("✅ Išvalyti seni GamePlayer įrašai!");

    const gamePlayersData = [
      { game_id: 1, user_id: 1, seat: 1, chips: 1000, status: "playing" },
      { game_id: 1, user_id: 2, seat: 2, chips: 1000, status: "playing" },
      { game_id: 2, user_id: 3, seat: 1, chips: 1000, status: "waiting" },
      { game_id: 2, user_id: 4, seat: 2, chips: 1000, status: "waiting" },
      { game_id: 3, user_id: 1, seat: 1, chips: 0, status: "out" },
      { game_id: 3, user_id: 2, seat: 2, chips: 0, status: "out" },
    ];

    await GamePlayer.bulkCreate(gamePlayersData);
    console.log("✅ GamePlayer įrašai sukurti!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Klaida sukuriant GamePlayer įrašus:", error);
    process.exit(1);
  }
}

seedGamePlayers();
