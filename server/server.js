// Load environment variables as early as possible
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const start = async () => {
  // Connect to MongoDB before accepting traffic
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(
      `[SERVER] Running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
    );
  });

  // ─── Graceful shutdown ───────────────────────────────────────────────────
  const shutdown = (signal) => {
    console.log(`\n[SERVER] ${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log("[SERVER] HTTP server closed.");
      process.exit(0);
    });

    // Force-exit if graceful shutdown takes too long
    setTimeout(() => {
      console.error("[SERVER] Forced shutdown after timeout.");
      process.exit(1);
    }, 10_000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  // ─── Unhandled promise rejections ────────────────────────────────────────
  process.on("unhandledRejection", (reason) => {
    console.error("[SERVER] Unhandled Rejection:", reason);
    server.close(() => process.exit(1));
  });

  // ─── Uncaught exceptions ─────────────────────────────────────────────────
  process.on("uncaughtException", (err) => {
    console.error("[SERVER] Uncaught Exception:", err);
    process.exit(1);
  });
};

start();
