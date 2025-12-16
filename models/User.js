import mongoose from "mongoose";

const GiftSchema = new mongoose.Schema({
  name: String,
  price: Number,
  link: String,
  description: String,
  status: {
    type: String,
    enum: ["Gift Status", "Considering", "Purchased"],
    default: "No Status",
  },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },

    // ⭐ NEW PROFILE FIELDS
    budget: { type: Number, default: 50 },
    relationship: { type: String, default: "" },
    avatar: { type: String, default: "" },

    // ⭐ SAVED GIFTS stored directly inside the user document
    gifts: [GiftSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
