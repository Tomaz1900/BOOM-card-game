import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-green-600">
          Registracija sėkminga!
        </h1>
        <p className="text-lg mb-6">
          Sveikiname prisijungus prie Boom žaidimo 🎉
        </p>
        <button
          onClick={() => navigate("/lobby")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Pradėti žaidimą
        </button>
      </div>
    </div>
  );
}
