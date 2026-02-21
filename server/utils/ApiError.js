/**
 * Operational (expected) API error.
 *
 * The `isOperational` flag differentiates user-facing errors from unexpected
 * programmer errors. The global error handler uses this to decide what to log
 * and what message to surface to the client.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode  HTTP status code
   * @param {string} message     Human-readable error message
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    // Capture a clean stack trace that excludes this constructor
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
