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
import { WebSocketWrapper } from "./utils/websocket";

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
new WebSocketWrapper(wss);

server.on("error", console.error);
