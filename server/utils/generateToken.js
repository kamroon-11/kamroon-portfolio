const jwt = require("jsonwebtoken");

/**
 * Generate a signed JWT for an admin.
 *
 * @param {string} id  Admin document _id
 * @returns {string}   Signed JWT string
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

module.exports = { generateToken };
