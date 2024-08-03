/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import { appRouter } from "./routes";
import WebSocket from "ws";
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

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    // const data = JSON.parse(message);

    // Broadcast the received data to all connected clients
    // wss.clients.forEach((client) => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(JSON.stringify(data));
    //   }
    // });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.on("error", console.error);
