const Message = require("../models/Message");
const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

/**
 * GET /api/admin/messages
 * Protected — list all contact messages, unread first.
 * Supports ?read=true|false and pagination via ?page=1&limit=20.
 */
const getMessages = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.read === "true") filter.read = true;
  if (req.query.read === "false") filter.read = false;

  const [messages, total] = await Promise.all([
    Message.find(filter).sort({ read: 1, createdAt: -1 }).skip(skip).limit(limit),
    Message.countDocuments(filter),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        messages,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
      "Messages fetched successfully."
    )
  );
});

/**
 * PATCH /api/admin/messages/:id/read
 * Protected — toggle the read status of a message.
 */
const markMessageRead = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) throw new ApiError(404, "Message not found.");

  message.read = !message.read;
  await message.save();

  return res
    .status(200)
    .json(new ApiResponse(200, message, `Message marked as ${message.read ? "read" : "unread"}.`));
});

/**
 * DELETE /api/admin/messages/:id
 * Protected — permanently delete a message.
 */
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) throw new ApiError(404, "Message not found.");

  await message.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Message deleted successfully."));
});

/**
 * GET /api/admin/stats
 * Protected — dashboard KPIs and recent activity.
 */
const getStats = asyncHandler(async (req, res) => {
  const [
    totalMessages,
    unreadMessages,
    totalProjects,
    featuredProjects,
    recentMessages,
    recentProjects,
  ] = await Promise.all([
    Message.countDocuments(),
    Message.countDocuments({ read: false }),
    Project.countDocuments(),
    Project.countDocuments({ featured: true }),
    Message.find().sort({ createdAt: -1 }).limit(5).select("name email createdAt read"),
    Project.find().sort({ createdAt: -1 }).limit(5).select("title featured createdAt"),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        messages: { total: totalMessages, unread: unreadMessages },
        projects: { total: totalProjects, featured: featuredProjects },
        recentActivity: {
          messages: recentMessages,
          projects: recentProjects,
        },
      },
      "Stats fetched successfully."
    )
  );
});

module.exports = { getMessages, markMessageRead, deleteMessage, getStats };
