import { useNavigate } from "react-router-dom";

export default function WaitingRoom() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">🕒 Laukiama kitų žaidėjų...</h1>
        <p className="text-lg mb-6">
          Prašome palaukti, kol prisijungs daugiau žaidėjų.
        </p>
      </div>
    </div>
  );
}
