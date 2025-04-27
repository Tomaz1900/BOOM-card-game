import { Token } from "./models/Token.js";
import { sequelize } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

console.log("Keliu .env failą...");
console.log("✅ .env pakeltas!");

async function seedTokens() {
  try {
    await sequelize.sync({ alter: true });

    console.log("✅ Prisijungta prie DB!");

    await Token.destroy({ where: {}, truncate: true });
    console.log("✅ Išvalyti seni tokenai!");

    const tokensData = [
      { token: "token1" },
      { token: "token2" },
      { token: "token3" },
      { token: "token4" },
      { token: "token5" },
      { token: "token6" },
      { token: "token7" },
      { token: "token8" },
    ];

    await Token.bulkCreate(tokensData);
    console.log("✅ Tokenai sukurti!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Klaida sukuriant tokenus:", error);
    process.exit(1);
  }
}

seedTokens();
