const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    techStack: {
      type: [String],
      required: [true, "Tech stack is required"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one technology is required",
      },
    },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" }, // Cloudinary public_id for deletion
    },
    liveUrl: {
      type: String,
      trim: true,
      default: "",
      match: [/^(https?:\/\/.*)?$/, "Invalid URL format"],
    },
    githubUrl: {
      type: String,
      trim: true,
      default: "",
      match: [/^(https?:\/\/.*)?$/, "Invalid URL format"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0, // For manual sorting on the frontend
    },
  },
  { timestamps: true }
);

// Index for efficient querying of featured / ordered projects
projectSchema.index({ featured: -1, order: 1, createdAt: -1 });

module.exports = mongoose.model("Project", projectSchema);
