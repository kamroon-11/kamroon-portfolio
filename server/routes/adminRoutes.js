const express = require("express");
const {
  getMessages,
  markMessageRead,
  deleteMessage,
  getStats,
} = require("../controllers/adminController");
const { protect } = require("../middleware/auth");
const { mongoIdParam, validate } = require("../middleware/validate");

const router = express.Router();

// All admin routes require a valid JWT
router.use(protect);

// GET  /api/admin/stats                — dashboard KPIs
router.get("/stats", getStats);

// GET  /api/admin/messages             — paginated inbox
router.get("/messages", getMessages);

// PATCH /api/admin/messages/:id/read   — toggle read status
router.patch("/messages/:id/read", mongoIdParam("id"), validate, markMessageRead);

// DELETE /api/admin/messages/:id       — delete a message
router.delete("/messages/:id", mongoIdParam("id"), validate, deleteMessage);

module.exports = router;
