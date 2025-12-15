import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

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
      user: { id: user._id, name: user.name, email: user.email },
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

  const token = signToken({ _id: user._id });

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    budget: user.budget,
    relationship: user.relationship,
    avatar: user.avatar,
    gifts: user.gifts
  });
};
