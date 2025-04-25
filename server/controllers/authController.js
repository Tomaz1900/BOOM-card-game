import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Toks el. paštas jau naudojamas" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    res.status(201).json({ message: "Paskyra sukurta!", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverio klaida" });
  }
};
