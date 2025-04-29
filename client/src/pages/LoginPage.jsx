import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        navigate("/lobby");
      } else {
        const errorData = await response.json();
        console.error("Prisijungimo klaida:", errorData.error);
      }
    } catch (error) {
      console.error("Prisijungimo klaida:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Prisijungti</h2>

        <div className="mb-4">
          <input
            {...register("email", { required: "Įveskite el. paštą" })}
            placeholder="El. paštas"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            {...register("password", { required: "Įveskite slaptažodį" })}
            placeholder="Slaptažodis"
            type="password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Prisijungti
        </button>

        <div className="text-center mt-4">
          <p className="text-sm">
            Neturi paskyros?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:underline font-semibold"
            >
              Registruotis
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
