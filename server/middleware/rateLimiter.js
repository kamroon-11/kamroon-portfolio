const rateLimit = require("express-rate-limit");

/**
 * Generic API rate limiter — applied globally.
 * 100 requests per IP per 15 minutes.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again after 15 minutes.",
  },
});

/**
 * Strict limiter for the contact form.
 * 5 submissions per IP per hour to deter spam.
 */
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many contact requests. Please wait before submitting again.",
  },
});

/**
 * Strict limiter for the auth route.
 * 10 attempts per IP per 15 minutes to deter brute-force.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});

module.exports = { apiLimiter, contactLimiter, authLimiter };
