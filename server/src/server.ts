import "dotenv/config";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

import {
  connectDatabase,
  disconnectDatabase,
} from "./config/db.js";

import attractionRoutes from "./routes/attraction.routes.js";

const app = express();

const PORT =
  Number(
    process.env.PORT
  ) || 5000;

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "http://localhost:3000";

app.use(
  helmet()
);

app.use(
  cors({
    origin:
      CLIENT_URL,

    credentials: true,
  })
);

app.use(
  express.json({
    limit: "2mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  morgan("dev")
);

/*
  Root API
*/

app.get(
  "/",
  (_req, res) => {
    res.json({
      success: true,

      message:
        "Lanka Travel Explorer API is running.",

      apiVersion:
        "v1",
    });
  }
);

/*
  Health
*/

app.get(
  "/api/health",
  (_req, res) => {
    res.status(200).json({
      success: true,

      service:
        "Lanka Travel Explorer API",

      status:
        "healthy",

      database:
        mongoose.connection.readyState ===
        1
          ? "connected"
          : "disconnected",

      timestamp:
        new Date().toISOString(),
    });
  }
);

/*
  API routes
*/

app.use(
  "/api/attractions",
  attractionRoutes
);

/*
  404
*/

app.use(
  (_req, res) => {
    res.status(404).json({
      success: false,

      message:
        "API route not found.",
    });
  }
);

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    app.listen(
      PORT,
      () => {
        console.log("");
        console.log(
          "========================================"
        );

        console.log(
          " Lanka Travel Explorer API"
        );

        console.log(
          "========================================"
        );

        console.log(
          ` Server: http://localhost:${PORT}`
        );

        console.log(
          ` Health: http://localhost:${PORT}/api/health`
        );

        console.log(
          ` Attractions: http://localhost:${PORT}/api/attractions`
        );

        console.log(
          "========================================"
        );

        console.log("");
      }
    );
  } catch (error) {
    console.error(
      "Server startup failed:",
      error
    );

    process.exit(1);
  }
}

async function shutdown(
  signal: string
): Promise<void> {
  console.log(
    `\n${signal} received. Shutting down...`
  );

  try {
    await disconnectDatabase();

    console.log(
      "MongoDB disconnected."
    );
  } finally {
    process.exit(0);
  }
}

process.on(
  "SIGINT",
  () =>
    void shutdown(
      "SIGINT"
    )
);

process.on(
  "SIGTERM",
  () =>
    void shutdown(
      "SIGTERM"
    )
);

void startServer();