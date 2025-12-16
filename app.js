import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ---------------------
// CORS
// ---------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3001",
      "https://iyadshobaki.github.io",
      "https://iyadshobaki.github.io/smart_gift_planner",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ---------------------
// BODY PARSER
// ---------------------
app.use(express.json());

// ---------------------
// ROUTES
// ---------------------
app.use("/", authRoutes); // /signup, /signin, /me
app.use("/", profileRoutes); // /profile, /gifts, etc.
app.use("/smart_gift_planner/uploads", express.static("uploads"));

// ---------------------
// 404 — MUST BE LAST!
// ---------------------
app.use((req, res) => {
  res.status(404).send("Not found");
});

export default app;
