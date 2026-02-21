const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    read: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
      default: "", // Stored for spam detection — not exposed publicly
    },
  },
  { timestamps: true }
);

// Efficient admin inbox query: unread first, then by date
messageSchema.index({ read: 1, createdAt: -1 });

module.exports = mongoose.model("Message", messageSchema);
