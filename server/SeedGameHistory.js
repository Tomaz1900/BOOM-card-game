import { GameHistory } from "./models/GameHistory.js";
import { sequelize } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

console.log("📂 Keliu .env failą...");
console.log("✅ .env pakeltas!");

async function seedGameHistory() {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Prisijungta prie DB!");

    await GameHistory.destroy({ where: {}, truncate: true });
    console.log("✅ Išvalyta sena žaidimų istorija!");

    const historyData = [
      {
        game_id: 1,
        game_player_id: 1,
        nickname: "Tomukas",
        action_type: "dark_turn",
        amount: 50,
      },
      {
        game_id: 1,
        game_player_id: 2,
        nickname: "Tomukas",
        action_type: "take_a_look",
        amount: null,
      },
      {
        game_id: 1,
        game_player_id: 2,
        nickname: "Jonas",
        action_type: "open_turn",
        amount: 100,
      },
      {
        game_id: 1,
        game_player_id: 3,
        nickname: "Tomukas",
        action_type: "take_a_look",
        amount: null,
      },
      {
        game_id: 1,
        game_player_id: 3,
        nickname: "Tomukas",
        action_type: "open_against",
        amount: 200,
      },
      {
        game_id: 1,
        game_player_id: 4,
        nickname: "Romas",
        action_type: "fold",
        amount: null,
      },
      {
        game_id: 1,
        game_player_id: 2,
        nickname: "Jonas",
        action_type: "show_hand",
        amount: null,
      },
      {
        game_id: 1,
        game_player_id: 2,
        nickname: "Vytas",
        action_type: "boom_500",
        amount: 500,
      },
    ];

    await GameHistory.bulkCreate(historyData);
    console.log("✅ Žaidimų istorija sukurta!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Klaida sukuriant žaidimų istoriją:", error);
    process.exit(1);
  }
}

seedGameHistory();
