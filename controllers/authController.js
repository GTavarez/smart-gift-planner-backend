import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
 console.log("TOKEN:", token);
console.log("DECODED:", decoded);

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    return res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(400).json({ message: "User already exists" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ id: user.id });

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
};

export const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.json(req.user);
};
