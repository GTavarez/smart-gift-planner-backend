import express from "express";
import { signup, signin, getMe } from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", auth, getMe);

export default router;
