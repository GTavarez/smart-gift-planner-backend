import express from "express";
import { signup, signin, getMe } from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", authMiddleware, getMe);

export default router;
