/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";
import { appRouter } from "./routes";
import WebSocket from "ws";
import url from "url";
import { connectMongo } from "./config/mongo";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

connectMongo();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(cors());

app.use("/", appRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
// WebSocket server
const wss = new WebSocket.Server({ server });
const clients: Array<{ websocket: WebSocket }> = [];

wss.on("connection", (ws, req) => {
  console.log("hello");
  clients.push({ websocket: ws });
  const wsExist = clients.some(
    (client) => JSON.stringify(client) === JSON.stringify(ws),
  );
  if (!wsExist) clients.push({ websocket: ws });

  ws.on("message", (message) => {
    const parameters = url.parse(String(req.url), true).query;
    const deviceId = parameters.deviceId;

    if (!deviceId) {
      ws.close(1008, "Missing deviceId"); // Close connection with policy violation code
      return;
    }

    clients.push({ websocket: ws });
    // console.log(`Device ${deviceId} connected`);
    console.log(`Received: ${message}`);
    clients.forEach((client) => {
      client.websocket.send(message.toString());
    });
  });

  ws.on("close", (code, reason) => {
    console.log("Client disconnected", code, reason.toString());
  });
});

server.on("error", console.error);
