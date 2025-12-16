import express from "express";
import authMiddleware from "../middleware/auth.js";
import User from "../models/User.js";
import { Router } from "express";
const router = Router();

import upload from "../middleware/upload.js";

// GET USER PROFILE
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = req.user.toObject();

    if (user.avatar && !user.avatar.startsWith("http")) {
      user.avatar = `http://localhost:3002${user.avatar}`;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error loading profile" });
  }
});

// ⭐ UPDATE BUDGET
router.patch("/profile/budget", authMiddleware, async (req, res) => {
  req.user.budget = req.body.budget;
  await req.user.save();
  res.send(req.user);
});

// ⭐ UPDATE PROFILE FIELDS
router.patch("/profile", authMiddleware, async (req, res) => {
  const fields = ["name", "relationship", "avatar"];
  fields.forEach((key) => {
    if (req.body[key] !== undefined) req.user[key] = req.body[key];
  });

  await req.user.save();
  res.send(req.user);
});

// ⭐ ADD A NEW GIFT
router.post("/gifts", authMiddleware, async (req, res) => {
  req.user.gifts.push(req.body);
  await req.user.save();
  res.send(req.user.gifts);
});

// ⭐ UPDATE GIFT STATUS
router.patch("/gifts/:index/status", authMiddleware, async (req, res) => {
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
router.delete("/gifts/:index", authMiddleware, async (req, res) => {
  const { index } = req.params;

  if (!req.user.gifts[index]) {
    return res.status(404).json({ error: "Gift not found" });
  }

  req.user.gifts.splice(index, 1);
  await req.user.save();

  res.send(req.user.gifts);
});
// ⭐ UPLOAD AVATAR
router.patch(
  "/profile/avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const avatarUrl = `/smart_gift_planner/uploads/avatars/${req.file.filename}`;


      // Save avatar in MongoDB
      req.user.avatar = avatarUrl;
      await req.user.save();

      res.json({ avatar: avatarUrl });
    } catch (err) {
      console.error("Avatar upload error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
