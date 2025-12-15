import mongoose from "mongoose";

const giftSchema = new mongoose.Schema({
  name: String,
  price: Number,
  link: String,
  description: String,
  status: {
    type: String,
    enum: ["none", "considering", "purchased"],
    default: "none",
  }
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
    gifts: [giftSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
