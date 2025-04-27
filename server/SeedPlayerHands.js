import { PlayerHand } from "./models/PlayerHand.js";
import { sequelize } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

console.log("🚀 Keliu .env failą...");
console.log("✅ .env pakeltas!");

async function seedPlayerHands() {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Prisijungta prie DB!");

    await PlayerHand.destroy({ where: {}, truncate: true });
    console.log("✅ Išvalytos senos kortos!");

    const playerHandsData = [
      { game_player_id: 1, card1: "9h", card2: "10d", card3: "Js" },
      { game_player_id: 2, card1: "Qh", card2: "Ks", card3: "As" },
      { game_player_id: 3, card1: "10h", card2: "Jd", card3: "Qs" },
      { game_player_id: 4, card1: "Kh", card2: "Ad", card3: "9s" },
    ];

    await PlayerHand.bulkCreate(playerHandsData);
    console.log("✅ PlayerHands įrašai sukurti!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Klaida sukuriant PlayerHands:", error);
    process.exit(1);
  }
}

seedPlayerHands();
