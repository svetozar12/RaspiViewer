import * as WebSocket from "ws";
import * as url from "url";
import * as http from "http";
import deepEqual from "deep-equal";
interface Client {
  websocket: WebSocket;
}

export class WebSocketWrapper {
  private clients: Client[] = [];
  constructor(wss: WebSocket.Server) {
    this.setupConnectionListener(wss);
  }

  private setupConnectionListener(wss: WebSocket.Server): void {
    wss.on("connection", (ws: WebSocket, req: http.IncomingMessage) => {
      const client: Client = { websocket: ws };
      this.clients.push(client);

      ws.on("message", (message: WebSocket.Data) =>
        this.handleMessage(ws, req, message),
      );
      ws.on("close", (code: number, reason: Buffer) =>
        this.handleClose(code, reason),
      );
    });
  }

  private handleMessage(
    ws: WebSocket,
    req: http.IncomingMessage,
    message: WebSocket.Data,
  ): void {
    console.log(this.clients.length);
    const parameters = url.parse(String(req.url), true).query;
    const deviceId = parameters.deviceId;

    if (!deviceId) {
      ws.close(1008, "Missing deviceId"); // Close connection with policy violation code
      return;
    }

    console.log(`Received: ${message}`);
    this.clients.forEach((client) => {
      client.websocket.send(message.toString());
    });
  }

  private handleClose(code: number, reason: Buffer): void {
    console.log("Client disconnected", code, reason.toString());
    this.clients = this.clients.filter(
      (client) => client.websocket.readyState !== WebSocket.CLOSED,
    );
  }
}
