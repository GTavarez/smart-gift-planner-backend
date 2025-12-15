import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";

const app = express();

// ---------------------
// CORS
// ---------------------
app.use(
  cors({
    origin: ["http://localhost:3001", "https://iyadshobaki.github.io"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
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

// ---------------------
// 404 — MUST BE LAST!
// ---------------------
app.use((req, res) => {
  res.status(404).send("Not found");
});

export default app;
