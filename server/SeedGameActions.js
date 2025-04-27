import { GameAction } from "./models/GameAction.js";
import { sequelize } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

console.log("\u2728 Keliu .env fail\u0105...");
console.log("\u2705 .env pakeltas!");

const actionsData = [
  { game_player_id: 1, action_type: "dark_turn", amount: 100 },
  { game_player_id: 2, action_type: "take_a_look" },
  { game_player_id: 2, action_type: "open_turn", amount: 200 },
  { game_player_id: 3, action_type: "take_a_look" },
  { game_player_id: 3, action_type: "open_against", amount: 400 },
  { game_player_id: 4, action_type: "fold" },
  { game_player_id: 5, action_type: "check" },
  { game_player_id: 1, action_type: "boom_500", amount: 500 },
  { game_player_id: 6, action_type: "lost_boom_250", amount: 250 },
  { game_player_id: 7, action_type: "no_check" },
];

async function seedGameActions() {
  try {
    await sequelize.sync({ alter: true });

    console.log("\u2705 Prisijungta prie DB!");

    await GameAction.destroy({ where: {}, truncate: true });
    console.log("\u2705 Seni veiksmai istrinti!");

    await GameAction.bulkCreate(actionsData);
    console.log("\u2705 Nauji veiksmai sekmingai sukurti!");

    process.exit(0);
  } catch (error) {
    console.error("\u274C Klaida kuriant veiksmus:", error);
    process.exit(1);
  }
}

seedGameActions();
