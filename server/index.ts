import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initializeDatabase } from "./db-init";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

async function startServer() {
  try {
    console.log("🚀 Starting The Sandwich Project server...");

    // Basic health check at root - available immediately
    app.get("/", (_req: Request, res: Response) => {
      res.status(200).json({ status: "ok" });
    });

    // Basic health checkpoint endpoint - available immediately
    app.get("/health", (_req: Request, res: Response) => {
      res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });

    // Basic error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error("Error:", err);
      res.status(status).json({ message });
    });

    // Initialize database
    await initializeDatabase();

    // Register API routes
    await registerRoutes(app);

    // Setup Vite in development or serve static files in production
    if (process.env.NODE_ENV === "development") {
      await setupVite(app);
    } else {
      serveStatic(app);
    }

    // Get port from environment variable (for Render) or default to 5000
    const port = parseInt(process.env.PORT || "5000", 10);
    const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "0.0.0.0";

    const server = app.listen(port, host, () => {
      console.log(`✓ Server listening on http://${host}:${port}`);
    });

    return server;
  } catch (error) {
    console.error("✗ Failed to start server:", error);
    // Fallback server for emergencies
    const port = parseInt(process.env.PORT || "5000", 10);
    const minimalServer = app.listen(port, "0.0.0.0", () => {
      console.log(
        `✓ Minimal development server listening on http://0.0.0.0:${port}`,
      );
    });
    return minimalServer;
  }
}

// Start the server and keep the main module active
startServer()
  .then((server) => {
    console.log("✓ Server startup sequence completed successfully");
    // Keep process alive with periodic health check
    setInterval(() => {
      console.log(
        `✓ Server health check - uptime: ${Math.round(process.uptime())}s`,
      );
    }, 300000); // Every 5 minutes

    // Return the server instance to prevent the module from exiting
    return server;
  })
  .catch((error) => {
    console.error("✗ Failed to start server:", error);
    // Instead of exiting, try to start a minimal server
    console.log("Starting emergency fallback server...");
    const emergencyServer = app.listen(parseInt(process.env.PORT || "5000", 10), "0.0.0.0", () => {
      console.log(
        "✓ Emergency fallback server listening on http://0.0.0.0:5000",
      );
    });
    return emergencyServer;
  });
