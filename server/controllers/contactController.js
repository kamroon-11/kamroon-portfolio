const Message = require("../models/Message");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { sendContactConfirmation, sendAdminNotification } = require("../utils/email");

/**
 * POST /api/contact
 * Public — store a contact message, send confirmation & admin notification.
 *
 * Email failures are non-fatal: the message is still saved and a 201 is
 * returned. The email error is logged for ops visibility.
 */
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  // Capture the IP (works behind a reverse proxy if trust proxy is set)
  const ipAddress =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "";

  const newMessage = await Message.create({ name, email, message, ipAddress });

  // Fire emails concurrently — don't block the response on delivery
  Promise.all([
    sendContactConfirmation({ name, email, message }),
    sendAdminNotification({ name, email, message }),
  ]).catch((err) => {
    console.error("[EMAIL] Failed to send contact emails:", err.message);
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { id: newMessage._id },
        "Message received. I'll get back to you shortly!"
      )
    );
});

module.exports = { submitContact };
