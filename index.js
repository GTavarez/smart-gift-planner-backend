import app from "./server.js";

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
