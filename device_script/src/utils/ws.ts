import WebSocket from "ws";

export class WebSocketClientManager {
  private ws: WebSocket | null = null;
  private connected = false;

  constructor(private serverUri: string) {}

  connectAndRun() {
    const runForever = async () => {
      this.ws = new WebSocket(this.serverUri);
      while (true) {
        this.ws.on("open", () => this.onOpen());
        this.ws.on("message", (message) => this.onMessage(message));
        this.ws.on("close", (code, reason) =>
          this.onClose(code, reason.toString()),
        );
        this.ws.on("error", (error) => this.onError(error));

        await new Promise<void>((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before attempting to reconnect
      }
    };

    runForever();
  }

  private onOpen() {
    console.log("Connected to WebSocket server");
    this.connected = true;
  }

  private onMessage(message: WebSocket.Data) {
    console.log(`Received message: ${message}`);
  }

  private onClose(code: number, reason: string) {
    console.log(
      `Disconnected from WebSocket server (Code: ${code}, Reason: ${reason})`,
    );
    this.connected = false;
  }

  private onError(error: Error) {
    console.error("WebSocket error:", error);
    this.connected = false;
  }

  sendData(data: string) {
    if (this.connected && this.ws) {
      try {
        this.ws.send(data);
        console.log(`Sent data: ${data}`);
      } catch (error) {
        console.error("WebSocket error:", error);
      }
    } else {
      console.log("WebSocket is not connected, cannot send data");
    }
  }
}
