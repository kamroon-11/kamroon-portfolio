const express = require("express");
const { login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");
const { loginRules, validate } = require("../middleware/validate");

const router = express.Router();

// POST /api/auth/login  — strict rate limit to deter brute-force
router.post("/login", authLimiter, loginRules, validate, login);

// GET  /api/auth/me     — returns current admin (requires valid JWT)
router.get("/me", protect, getMe);

module.exports = router;
