import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// ⭐ GET FULL PROFILE
router.get("/profile", auth, async (req, res) => {
  res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    budget: req.user.budget,
    gifts: req.user.gifts,
  });
});

// ⭐ UPDATE BUDGET
router.patch("/profile/budget", auth, async (req, res) => {
  req.user.budget = req.body.budget;
  await req.user.save();
  res.send(req.user);
});

// ⭐ UPDATE PROFILE FIELDS
router.patch("/profile", auth, async (req, res) => {
  const fields = ["name", "relationship", "avatar"];
  fields.forEach((key) => {
    if (req.body[key] !== undefined) req.user[key] = req.body[key];
  });

  await req.user.save();
  res.send(req.user);
});

// ⭐ ADD A NEW GIFT
router.post("/gifts", auth, async (req, res) => {
  req.user.gifts.push(req.body);
  await req.user.save();
  res.send(req.user.gifts);
});

// ⭐ UPDATE GIFT STATUS
router.patch("/gifts/:index/status", auth, async (req, res) => {
  const { index } = req.params;
  const { status } = req.body;

  if (!req.user.gifts[index]) {
    return res.status(404).send({ error: "Gift not found" });
  }

  req.user.gifts[index].status = status;
  await req.user.save();
  res.send(req.user.gifts[index]);
});

// ⭐ DELETE A GIFT
router.delete("/gifts/:index", auth, async (req, res) => {
  const { index } = req.params;

  if (!req.user.gifts[index]) {
    return res.status(404).json({ error: "Gift not found" });
  }

  req.user.gifts.splice(index, 1);
  await req.user.save();

  res.send(req.user.gifts);
});

export default router;
