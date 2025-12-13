import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

import cors from "cors";

app.use(
  cors({
    origin: ["http://localhost:3001", "https://iyadshobaki.github.io"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
