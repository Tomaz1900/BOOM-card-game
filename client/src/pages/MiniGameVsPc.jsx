import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const cards = [
  "9h",
  "9d",
  "9s",
  "9c",
  "10h",
  "10d",
  "10s",
  "10c",
  "Jh",
  "Jd",
  "Js",
  "Jc",
  "Qh",
  "Qd",
  "Qs",
  "Qc",
  "Kh",
  "Kd",
  "Ks",
  "Kc",
  "Ah",
  "Ad",
  "As",
  "Ac",
];

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
      default:
        return 0;
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

export default function MiniGameVsPC() {
  const navigate = useNavigate();
  const [playerCards, setPlayerCards] = useState([]);
  const [pcCards, setPcCards] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    const playerHand = shuffled.slice(0, 3);
    const pcHand = shuffled.slice(3, 6);

    setPlayerCards(playerHand);
    setPcCards(pcHand);

    const playerPoints = calculatePoints(...playerHand);
    const pcPoints = calculatePoints(...pcHand);

    if (playerPoints > pcPoints) {
      setResult("🏆 Tu laimėjai!");
    } else if (playerPoints < pcPoints) {
      setResult("😔 Kompiuteris laimėjo...");
    } else {
      setResult("🤝 Lygiosios!");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-6">
          Žaidimas prieš Kompiuterį 🤖
        </h1>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Tavo kortos:</h2>
            <div className="flex justify-center gap-4">
              {playerCards.map((card, idx) => (
                <div key={idx} className="border p-4 rounded-lg">
                  {card}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Kompiuterio kortos:</h2>
            <div className="flex justify-center gap-4">
              {pcCards.map((card, idx) => (
                <div key={idx} className="border p-4 rounded-lg">
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">{result}</h2>

        <button
          onClick={() => navigate("/lobby")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Grįžti į Lobby
        </button>
      </div>
    </div>
  );
}
