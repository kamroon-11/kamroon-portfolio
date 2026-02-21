const ApiError = require("../utils/ApiError");

/**
 * Centralized error handler middleware.
 * Must be registered as the LAST middleware in app.js.
 *
 * Handles:
 * - ApiError (our custom operational errors)
 * - Mongoose validation errors
 * - Mongoose duplicate key errors
 * - Mongoose cast errors (bad ObjectId)
 * - JWT errors
 * - Multer / file upload errors
 */
const errorHandler = (err, req, res, _next) => {
  let error = err;

  // --- Mongoose: invalid ObjectId ---
  if (err.name === "CastError") {
    error = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  // --- Mongoose: duplicate key ---
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ApiError(409, `${field} already exists.`);
  }

  // --- Mongoose: validation error ---
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(422, messages.join(". "));
  }

  // --- JWT errors (belt-and-suspenders — auth middleware also handles these) ---
  if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid token.");
  }
  if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Token has expired.");
  }

  // --- Multer errors ---
  if (err.name === "MulterError") {
    const msg =
      err.code === "LIMIT_FILE_SIZE"
        ? "File too large. Maximum size is 5 MB."
        : err.message;
    error = new ApiError(400, msg);
  }

  const statusCode = error.statusCode || 500;
  const message = error.isOperational
    ? error.message
    : "An unexpected error occurred. Please try again later.";

  // Log non-operational (unexpected) errors
  if (!error.isOperational) {
    console.error("[ERROR]", err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
