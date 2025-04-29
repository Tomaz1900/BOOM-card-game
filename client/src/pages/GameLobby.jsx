import { useNavigate } from "react-router-dom";

export default function GameLobby() {
  const navigate = useNavigate();

  function handleSeatSelection(seatNumber) {
    console.log("Pasirinkta vieta:", seatNumber);
    navigate("/waiting");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Pasirinkite vietą 🎯</h1>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <button
              key={i}
              onClick={() => handleSeatSelection(i + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
