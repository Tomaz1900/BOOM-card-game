import dotenv from "dotenv";
dotenv.config();

import { Card } from "./Cards.js";
import { sequelize } from "../config/db.js";

const seedCards = async () => {
  try {
    await sequelize.sync();

    const cardsData = [
      { rank: "9", suit: "hearts", points: 9 },
      { rank: "9", suit: "diamonds", points: 9 },
      { rank: "9", suit: "clubs", points: 9 },
      { rank: "9", suit: "spades", points: 9 },
      { rank: "10", suit: "hearts", points: 10 },
      { rank: "10", suit: "diamonds", points: 10 },
      { rank: "10", suit: "clubs", points: 10 },
      { rank: "10", suit: "spades", points: 10 },
      { rank: "J", suit: "hearts", points: 2 },
      { rank: "J", suit: "diamonds", points: 2 },
      { rank: "J", suit: "clubs", points: 2 },
      { rank: "J", suit: "spades", points: 2 },
      { rank: "Q", suit: "hearts", points: 3 },
      { rank: "Q", suit: "diamonds", points: 3 },
      { rank: "Q", suit: "clubs", points: 3 },
      { rank: "Q", suit: "spades", points: 3 },
      { rank: "K", suit: "hearts", points: 4 },
      { rank: "K", suit: "diamonds", points: 4 },
      { rank: "K", suit: "clubs", points: 4 },
      { rank: "K", suit: "spades", points: 4 },
      { rank: "A", suit: "hearts", points: 11 },
      { rank: "A", suit: "diamonds", points: 11 },
      { rank: "A", suit: "clubs", points: 11 },
      { rank: "A", suit: "spades", points: 11 },
    ];

    await Card.bulkCreate(cardsData); // įdedam į DB

    console.log("✅ Kortos sėkmingai sukurtos!");
    process.exit(); // uždarom procesą
  } catch (error) {
    console.error("❌ Klaida sukuriant kortas:", error);
    process.exit(1);
  }
};

seedCards();
