package com.svetozar12;

import java.io.IOException;
import java.net.URISyntaxException;

public class Main {
    public static void main(String[] args) throws IOException, URISyntaxException {
        UUIDManager uuidManager = new UUIDManager();
        String deviceId = uuidManager.getOrCreateUUID(); // Use UUIDManager to get or create UUID

        String serverUri = System.getenv("WEBSOCKET_SERVER");
        if (serverUri == null) {
            throw new IllegalArgumentException("WebSocket server address not specified in environment variables");
        }
        serverUri += "/?deviceId=" + deviceId;

        WebSocketClientManager clientManager = new WebSocketClientManager(serverUri);
        clientManager.connectAndRun();
    }
}