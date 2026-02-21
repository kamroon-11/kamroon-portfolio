const Admin = require("../models/Admin");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { generateToken } = require("../utils/generateToken");

/**
 * POST /api/auth/login
 * Public — authenticate admin and return a JWT.
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Explicitly select password (it's excluded by default via schema)
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin || !(await admin.comparePassword(password))) {
    // Use a generic message to prevent user enumeration
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = generateToken(admin._id);

  return res.status(200).json(
    new ApiResponse(200, { token, admin }, "Login successful.")
  );
});

/**
 * GET /api/auth/me
 * Protected — return the currently authenticated admin profile.
 */
const getMe = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, req.admin, "Admin profile fetched.")
  );
});

module.exports = { login, getMe };
