import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { sequelize } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("BOOM backend veikia!");
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB prisijungta sėkmingai!");
  } catch (err) {
    console.error("❌ Nepavyko prisijungti prie DB:", err);
  }
  console.log(`🚀 Serveris paleistas ant http://localhost:${PORT}`);
});
