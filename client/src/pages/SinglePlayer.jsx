import { useNavigate } from "react-router-dom";

export default function SinglePlayer() {
  const navigate = useNavigate();

  function handleBackToLobby() {
    navigate("/lobby");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-green-600">
          Vieno žaidėjo režimas 🎯
        </h1>
        <p className="text-lg mb-6">Tu žaidi prieš kompiuterį! 🚀</p>

        {/* Čia vėliau galėsim pridėti žaidimo logiką */}

        <button
          onClick={handleBackToLobby}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Grįžti į Lobby
        </button>
      </div>
    </div>
  );
}
