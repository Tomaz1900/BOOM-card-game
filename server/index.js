import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js";
import { sequelize } from "./config/db.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("BOOM backend veikia!");
});

io.on("connection", (socket) => {
  console.log("🔵 Naujas prisijungęs vartotojas!");

  socket.on("seatSelected", (seatNumber) => {
    console.log(`💺 Vieta ${seatNumber} užimta!`);
    io.emit("updateSeats", seatNumber);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Vartotojas atsijungė.");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB prisijungta sėkmingai!");
  } catch (err) {
    console.error("❌ Nepavyko prisijungti prie DB:", err);
  }
  console.log(`🚀 Serveris paleistas ant http://localhost:${PORT}`);
});
