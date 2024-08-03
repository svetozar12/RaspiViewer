/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import { appRouter } from "./routes";
import WebSocket from "ws";
import url from "url";
import "./config/mongo";
const app = express();

app.use("/api", appRouter);
app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/v1/swagger/doc.json", (req, res) => res.send(specs));

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
// WebSocket server
const wss = new WebSocket.Server({ server });
// Store connected clients
const clients = new Map();
wss.on("connection", (ws, req) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    const parameters = url.parse(req.url, true).query;
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
