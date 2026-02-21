const express = require("express");
const { submitContact } = require("../controllers/contactController");
const { contactLimiter } = require("../middleware/rateLimiter");
const { contactRules, validate } = require("../middleware/validate");

const router = express.Router();

// POST /api/contact — rate-limited, validated
router.post("/", contactLimiter, contactRules, validate, submitContact);

module.exports = router;
