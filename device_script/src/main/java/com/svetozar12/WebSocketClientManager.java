package com.svetozar12;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import org.java_websocket.exceptions.WebsocketNotConnectedException;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

public class WebSocketClientManager {
    private WebSocketClient client;
    private String serverUri;

    public WebSocketClientManager(String serverUri) {
        this.serverUri = serverUri;
    }

    public void connectAndRun() throws URISyntaxException, IOException {
        client = new WebSocketClient(new URI(serverUri)) {
            @Override
            public void onOpen(ServerHandshake handshake) {
                System.out.println("Connected to WebSocket server");
            }

            @Override
            public void onMessage(String message) {
                System.out.println("Received message: " + message);
            }

            @Override
            public void onClose(int code, String reason, boolean remote) {
                System.out.println("Disconnected from WebSocket server");
            }

            @Override
            public void onError(Exception ex) {
                ex.printStackTrace();
            }
        };

        while (true) {
            try {
                client.connectBlocking();
                break; // Exit loop if connection is successful
            } catch (InterruptedException e) {
                e.printStackTrace();
                try {
                    Thread.sleep(5000); // Wait before retrying
                } catch (InterruptedException interruptedException) {
                    interruptedException.printStackTrace();
                }
            }
        }

        while (true) {
            double cpuTemp = CpuTemp.getCpuTemperature();
            String data = String.format("{\"cpu_temperature\": %.2f}", cpuTemp);
            try {
                client.send(data);
                System.out.println("Sent data: " + data);
            } catch (WebsocketNotConnectedException e) {
                System.out.println("WebSocket not connected, retrying...");
                try {
                    client.reconnectBlocking();
                } catch (InterruptedException interruptedException) {
                    interruptedException.printStackTrace();
                }
            }

            try {
                Thread.sleep(10000); // Send data every 10 seconds
            } catch (InterruptedException e) {
                e.printStackTrace();
                Thread.currentThread().interrupt(); // Restore interrupted status
                break; // Exit the loop if interrupted
            }
        }
    }
}
