import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Helper funkcija skaičiuoti taškus
const cardPoints = {
  9: 9,
  10: 10,
  J: 6,
  Q: 7,
  K: 8,
  A: 11,
};

function calculatePoints(card1, card2, card3) {
  const rank = (card) => card.slice(0, -1);
  const suit = (card) => card.slice(-1);

  const ranks = [rank(card1), rank(card2), rank(card3)];
  const suits = [suit(card1), suit(card2), suit(card3)];

  if (ranks[0] === ranks[1] && ranks[1] === ranks[2]) {
    return {
      9: 31,
      10: 32,
      J: 33,
      Q: 34,
      K: 35,
      A: 36,
    }[ranks[0]];
  }

  if (suits[0] === suits[1] && suits[1] === suits[2]) {
    return ranks.reduce((sum, r) => sum + cardPoints[r], 0);
  }

  if (suits[0] === suits[1]) return cardPoints[ranks[0]] + cardPoints[ranks[1]];
  if (suits[0] === suits[2]) return cardPoints[ranks[0]] + cardPoints[ranks[2]];
  if (suits[1] === suits[2]) return cardPoints[ranks[1]] + cardPoints[ranks[2]];

  return Math.max(...ranks.map((r) => cardPoints[r]));
}

// Generuoja atsitiktines kortas
function drawCards(deck, n) {
  const cards = [];
  while (cards.length < n) {
    const rand = deck[Math.floor(Math.random() * deck.length)];
    if (!cards.includes(rand)) cards.push(rand);
  }
  return cards;
}

// Konvertuoja kortos kodą į paveikslėlio kelią
function cardToImage(cardCode) {
  let rank = "";
  let suitLetter = "";

  if (cardCode.startsWith("10")) {
    rank = "10";
    suitLetter = cardCode[2];
  } else {
    rank = cardCode[0];
    suitLetter = cardCode[1];
  }

  const suit = {
    s: "spades",
    d: "diamonds",
    c: "clubs",
    h: "hearts",
  }[suitLetter];

  const rankName = {
    9: "9",
    10: "10",
    J: "jack",
    Q: "queen",
    K: "king",
    A: "ace",
  }[rank];

  return `/src/assets/Playing Cards/PNG-cards-1.3/${rankName}_of_${suit}.png`;
}

export default function MiniGameVsPC() {
  const navigate = useNavigate();
  const deck = [
    "9s",
    "9d",
    "9h",
    "9c",
    "10s",
    "10d",
    "10h",
    "10c",
    "Js",
    "Jd",
    "Jh",
    "Jc",
    "Qs",
    "Qd",
    "Qh",
    "Qc",
    "Ks",
    "Kd",
    "Kh",
    "Kc",
    "As",
    "Ad",
    "Ah",
    "Ac",
  ];

  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [winner, setWinner] = useState("");

  function playGame() {
    const all = drawCards(deck, 6);
    const player = all.slice(0, 3);
    const comp = all.slice(3, 6);

    const pPoints = calculatePoints(...player);
    const cPoints = calculatePoints(...comp);

    setPlayerCards(player);
    setComputerCards(comp);
    setPlayerPoints(pPoints);
    setComputerPoints(cPoints);

    if (pPoints > cPoints) setWinner("🎉 Laimėjai!");
    else if (pPoints < cPoints) setWinner("😔 Kompiuteris laimėjo...");
    else setWinner("🤝 Lygiosios!");
  }

  useEffect(() => {
    playGame();
  }, []);

  return (
    <div className="text-center mt-10 font-bold">
      <h2 className="text-xl font-bold mb-4">Žaidimas prieš Kompiuterį 🖥️</h2>

      <div className="flex justify-center gap-12 mb-6">
        <div>
          <p className="mb-2">Tavo kortos:</p>
          <div className="flex gap-2 justify-center">
            {playerCards.map((card) => (
              <img key={card} src={cardToImage(card)} className="w-16" />
            ))}
          </div>
          <p className="mt-2">Tavo taškai: {playerPoints}</p>
        </div>

        <div>
          <p className="mb-2">Kompiuterio kortos:</p>
          <div className="flex gap-2 justify-center">
            {computerCards.map((card) => (
              <img key={card} src={cardToImage(card)} className="w-16" />
            ))}
          </div>
          <p className="mt-2">Kompiuterio taškai: {computerPoints}</p>
        </div>
      </div>

      <h3 className="text-lg mb-6">{winner}</h3>

      <div className="flex justify-center gap-4">
        <button
          onClick={playGame}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Žaisti dar kartą
        </button>
        <button
          onClick={() => navigate("/lobby")}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Grįžti į Lobby
        </button>
      </div>
    </div>
  );
}
