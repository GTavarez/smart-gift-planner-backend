import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes); // 👈 IMPORTANT

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error", err));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
