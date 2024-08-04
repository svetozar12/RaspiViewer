/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";
import swaggerUi from "swagger-ui-express";
import { appRouter } from "./routes";
import WebSocket from "ws";
import url from "url";
import { connectMongo } from "./config/mongo";
const app = express();

connectMongo();

app.use("/api", appRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
// WebSocket server
const wss = new WebSocket.Server({ server });
// Store connected clients
const clients = new Map();
wss.on("connection", (ws, req) => {
  ws.on("message", (message) => {
    const parameters = url.parse(String(req.url), true).query;
    const deviceId = parameters.deviceId;

    if (!deviceId) {
      ws.close(1008, "Missing deviceId"); // Close connection with policy violation code
      return;
    }

    clients.set(deviceId, ws);
    console.log(`Device ${deviceId} connected`);
    console.log(`Received: ${message}`);
    const data = JSON.parse(message.toString());
    console.log(data);
  });

  ws.on("close", (code, reason) => {
    console.log("Client disconnected", code, reason.toString());
  });
});

server.on("error", console.error);
