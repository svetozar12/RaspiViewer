package com.svetozar12;

import java.io.IOException;
import java.net.URISyntaxException;

public class Main {
    public static void main(String[] args) throws IOException, URISyntaxException {
        UUIDManager uuidManager = new UUIDManager();
        String deviceId = uuidManager.getOrCreateUUID(); // Use UUIDManager to get or create UUID

        String serverUri = "ws://" + System.getenv("API_URL");
        if (System.getenv("API_URL") == null) {
            throw new IllegalArgumentException("WebSocket server address not specified in environment variables");
        }
        serverUri += "/?deviceId=" + deviceId;
        // create a device on first run
        HTTPRequest.createDevice();
        WebSocketClientManager clientManager = new WebSocketClientManager(serverUri);
        clientManager.connectAndRun();
    }
}