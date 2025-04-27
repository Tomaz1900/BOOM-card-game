import dotenv from "dotenv";
dotenv.config();

import { sequelize } from "./config/db.js";
import { User } from "./models/User.js";

console.log("📦 Keliam .env failą...");
console.log("✅ .env pakeltas!");
console.log("👤 DB vartotojas:", process.env.DB_USER);

const usersData = [
  {
    username: "Tomukas",
    email: "tomukas@example.com",
    password: "slaptas123",
  },
  {
    username: "Giedrė",
    email: "giedre@example.com",
    password: "slaptas456",
  },
  {
    username: "Saulė",
    email: "saule@example.com",
    password: "slaptas789",
  },
];

const seedUsers = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("📂 Duomenų bazės struktūra atnaujinta!");

    await User.destroy({ where: {}, truncate: true });
    console.log("🧹 Seni vartotojai ištrinti!");

    await User.bulkCreate(usersData);
    console.log("✅ Vartotojai sėkmingai sukurti!");
  } catch (error) {
    console.error("❌ Klaida sukuriant vartotojus:", error);
    process.exit(1);
  }
};

seedUsers();
