import express from "express";
import { User } from "../models/User.js";
import { z } from "zod";
import bcrypt from "bcryptjs";

const router = express.Router();

const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

router.post("/register", async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }

    const { username, email, password } = parsed.data;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "El. paštas jau naudojamas." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registracija sėkminga!",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Serverio klaida." });
  }
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/login", async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }

    const { email, password } = parsed.data;

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ error: "Vartotojas nerastas." });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Neteisingas slaptažodis." });
    }

    res.status(200).json({
      message: "Prisijungimas sėkmingas!",
      user: {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Serverio klaida." });
  }
});

export default router;
