const express = require("express");
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/auth");
const { upload } = require("../config/cloudinary");
const { projectRules, mongoIdParam, validate } = require("../middleware/validate");

const router = express.Router();

// ─── Public ──────────────────────────────────────────────────────────────────
router.get("/", getProjects);
router.get("/:id", mongoIdParam("id"), validate, getProject);

// ─── Protected (admin only) ───────────────────────────────────────────────────
router.post(
  "/",
  protect,
  upload.single("image"), // multipart/form-data field name: "image"
  projectRules,
  validate,
  createProject
);

router.put(
  "/:id",
  protect,
  mongoIdParam("id"),
  upload.single("image"),
  projectRules,
  validate,
  updateProject
);

router.delete("/:id", protect, mongoIdParam("id"), validate, deleteProject);

module.exports = router;
