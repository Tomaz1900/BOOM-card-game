import { useNavigate } from "react-router-dom";

export default function WaitingRoom() {
  const navigate = useNavigate();

  function handleLeave() {
    navigate("/lobby");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">⏳ Laukiama žaidėjų...</h1>
        <p className="text-lg mb-6">Kai visi prisijungs – žaidimas prasidės!</p>

        <button
          onClick={handleLeave}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Palikti laukiamąjį kambarį
        </button>
      </div>
    </div>
  );
}
