import { useState } from "react";
import { z } from "zod";

const schema = z
  .object({
    username: z.string().min(3, "Mažiausiai 3 simboliai"),
    email: z.string().email("Neteisingas el. paštas"),
    password: z.string().min(6, "Mažiausiai 6 simboliai"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Slaptažodžiai nesutampa",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message || "Registracija sėkminga!");
    } catch (err) {
      setMessage("Klaida jungiantis prie serverio");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">Registracija</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["username", "email", "password", "confirmPassword"].map((field) => (
          <div key={field}>
            <input
              type={field.includes("password") ? "password" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={
                field === "confirmPassword" ? "Pakartoti slaptažodį" : field
              }
              className="w-full px-4 py-2 border rounded"
            />
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sukurti paskyrą
        </button>
        {message && (
          <p className="text-center text-green-600 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
}
