import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GameLobby() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState(null); // Naujas pasirinkimas: "multiplayer" arba "singleplayer"
  const [seats, setSeats] = useState(Array(8).fill(false));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  function handleModeSelect(selectedMode) {
    setMode(selectedMode);
  }

  function handleSeatSelection(seatNumber) {
    console.log("Pasirinkta vieta:", seatNumber);

    const updatedSeats = [...seats];
    updatedSeats[seatNumber - 1] = true;
    setSeats(updatedSeats);

    alert(`Pasirinkai vietą: ${seatNumber}`);
    navigate("/waiting");
  }

  function handleStartSinglePlayer() {
    navigate("/singleplayer"); // Sukursim vėliau puslapį žaidimui prieš PC
  }

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const takenSeats = seats.filter((seat) => seat).length;
  const freeSeats = seats.length - takenSeats;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {user && (
          <h2 className="text-2xl font-bold mb-4">
            Sveikas, {user.username} 👋
          </h2>
        )}

        {!mode && (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Pasirinkite žaidimo režimą 🎮
            </h1>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleModeSelect("multiplayer")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Žaisti su kitais
              </button>
              <button
                onClick={() => handleModeSelect("singleplayer")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Žaisti prieš PC
              </button>
            </div>
          </>
        )}

        {mode === "multiplayer" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Pasirinkite vietą 🎯</h1>
            <p className="text-lg mb-6">
              Laisvos vietos: {freeSeats} / {seats.length}
            </p>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {seats.map((seatTaken, i) => (
                <button
                  key={i}
                  onClick={() => handleSeatSelection(i + 1)}
                  disabled={seatTaken}
                  className={`${
                    seatTaken
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white font-semibold py-3 rounded-lg transition duration-300`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {mode === "singleplayer" && (
          <div className="flex flex-col gap-4">
            <p className="text-lg mb-6">Žaisi vienas prieš kompiuterį 🎲</p>
            <button
              onClick={() => navigate("/play-vs-pc")}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Žaisti prieš Kompiuterį
            </button>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Atsijungti
        </button>
      </div>
    </div>
  );
}
