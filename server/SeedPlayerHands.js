import { PlayerHand } from "./models/PlayerHand.js";
import { sequelize } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

console.log("Keliu .env failą...");
console.log("✅ .env pakeltas!");

const cardPoints = {
  9: 9,
  10: 10,
  J: 6,
  Q: 7,
  K: 8,
  A: 11,
};

function calculatePoints(card1, card2, card3) {
  const rank1 = card1.slice(0, -1);
  const rank2 = card2.slice(0, -1);
  const rank3 = card3.slice(0, -1);

  const suit1 = card1.slice(-1);
  const suit2 = card2.slice(-1);
  const suit3 = card3.slice(-1);

  if (rank1 === rank2 && rank2 === rank3) {
    switch (rank1) {
      case "9":
        return 31;
      case "10":
        return 32;
      case "J":
        return 33;
      case "Q":
        return 34;
      case "K":
        return 35;
      case "A":
        return 36;
    }
  }

  if (suit1 === suit2 && suit2 === suit3) {
    return cardPoints[rank1] + cardPoints[rank2] + cardPoints[rank3];
  }

  if (suit1 === suit2) return cardPoints[rank1] + cardPoints[rank2];
  if (suit1 === suit3) return cardPoints[rank1] + cardPoints[rank3];
  if (suit2 === suit3) return cardPoints[rank2] + cardPoints[rank3];

  return Math.max(cardPoints[rank1], cardPoints[rank2], cardPoints[rank3]);
}

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
      { game_player_id: 4, card1: "Kh", card2: "Kd", card3: "Ks" },
    ];

    const playerHandsWithPoints = playerHandsData.map((hand) => ({
      ...hand,
      points: calculatePoints(hand.card1, hand.card2, hand.card3),
    }));

    await PlayerHand.bulkCreate(playerHandsWithPoints);
    console.log("✅ Žaidėjų rankos sėkmingai sukurtos!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Klaida sukuriant žaidėjų rankas:", error);
    process.exit(1);
  }
}

seedPlayerHands();
