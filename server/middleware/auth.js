const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Protect routes — verifies the Bearer JWT in the Authorization header.
 * Attaches `req.admin` on success.
 */
const protect = asyncHandler(async (req, _res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Authentication required. No token provided.");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Token has expired. Please log in again.");
    }
    throw new ApiError(401, "Invalid token. Authentication failed.");
  }

  const admin = await Admin.findById(decoded.id).select("-password");
  if (!admin) {
    throw new ApiError(401, "Admin account no longer exists.");
  }

  req.admin = admin;
  next();
});

/**
 * Authorize specific roles.
 * Usage: authorize("superadmin")
 */
const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!roles.includes(req.admin.role)) {
      throw new ApiError(
        403,
        `Role '${req.admin.role}' is not authorized to access this route.`
      );
    }
    next();
  };
};

module.exports = { protect, authorize };
