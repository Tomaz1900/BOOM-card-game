import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    username: z.string().min(3, "Slapyvardis per trumpas"),
    email: z.string().email("Neteisingas el. paštas"),
    password: z.string().min(6, "Slaptažodis per trumpas"),
    confirmPassword: z.string().min(6, "Patvirtinkite slaptažodį"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Slaptažodžiai nesutampa",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        // ✅ Registracija pavyko, nukreipiam
        navigate("/success");
      } else {
        const errorData = await response.json();
        console.error("Registracijos klaida:", errorData.error);
      }
    } catch (error) {
      console.error("Registracijos klaida:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registracija</h2>

        <div className="mb-4">
          <input
            {...register("username")}
            placeholder="Slapyvardis"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("email")}
            placeholder="El. paštas"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("password")}
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

        <div className="mb-6">
          <input
            {...register("confirmPassword")}
            placeholder="Pakartokite slaptažodį"
            type="password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Registruotis
        </button>
        <div className="text-center mt-4">
          <p className="text-sm">
            Jau turi paskyrą?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline font-semibold"
            >
              Prisijungti
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
