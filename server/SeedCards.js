import dotenv from "dotenv";
dotenv.config();
console.log("📦 Keliu .env failą...");

import { sequelize } from "./config/db.js";
import { Card } from "./models/Cards.js";

console.log("✅ .env pakeltas!");
console.log("🔎 DB vartotojas:", process.env.DB_USER);
console.log("🔎 DB slaptažodis:", process.env.DB_PASSWORD);
console.log("🔎 DB duombazė:", process.env.DB_NAME);

const seedCards = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Prisijungta prie DB!");

    await Card.destroy({ where: {}, truncate: true });
    console.log("🗑️ Senos kortos ištrintos!");

    const cardsData = [
      { rank: "9", suit: "hearts", points: 9 },
      { rank: "9", suit: "diamonds", points: 9 },
      { rank: "9", suit: "clubs", points: 9 },
      { rank: "9", suit: "spades", points: 9 },
      { rank: "10", suit: "hearts", points: 10 },
      { rank: "10", suit: "diamonds", points: 10 },
      { rank: "10", suit: "clubs", points: 10 },
      { rank: "10", suit: "spades", points: 10 },
      { rank: "J", suit: "hearts", points: 6 },
      { rank: "J", suit: "diamonds", points: 6 },
      { rank: "J", suit: "clubs", points: 6 },
      { rank: "J", suit: "spades", points: 6 },
      { rank: "Q", suit: "hearts", points: 7 },
      { rank: "Q", suit: "diamonds", points: 7 },
      { rank: "Q", suit: "clubs", points: 7 },
      { rank: "Q", suit: "spades", points: 7 },
      { rank: "K", suit: "hearts", points: 8 },
      { rank: "K", suit: "diamonds", points: 8 },
      { rank: "K", suit: "clubs", points: 8 },
      { rank: "K", suit: "spades", points: 8 },
      { rank: "A", suit: "hearts", points: 11 },
      { rank: "A", suit: "diamonds", points: 11 },
      { rank: "A", suit: "clubs", points: 11 },
      { rank: "A", suit: "spades", points: 11 },
    ];

    await Card.bulkCreate(cardsData);
    console.log("✅ Naujos kortos sėkmingai sukurtos!");

    process.exit();
  } catch (err) {
    console.error("❌ Klaida sukuriant kortas:", err);
    process.exit(1);
  }
};

seedCards();
