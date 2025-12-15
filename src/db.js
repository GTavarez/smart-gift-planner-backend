import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  if (process.env.NODE_ENV === "test") return; // ⭐ Tests manage DB themselves

  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");
}

export async function disconnectDB() {
  await mongoose.connection.close();
}
