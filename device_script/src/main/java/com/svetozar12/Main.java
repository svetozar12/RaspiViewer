package com.svetozar12;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

public class Main {

    public static double getCpuTemperature() throws IOException {
        String tempFile = "/sys/class/thermal/thermal_zone0/temp";
        try (BufferedReader br = new BufferedReader(new FileReader(tempFile))) {
            String line = br.readLine();
            if (line != null) {
                return Double.parseDouble(line) / 1000.0;
            }
        }
        return Double.NaN;
    }

    public static void main(String[] args) throws IOException, URISyntaxException {
        String serverUri = "ws://your_server_ip:3000";
        WebSocketClient client = new WebSocketClient(new URI(serverUri)) {
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

        try {
            client.connectBlocking();
        } catch (InterruptedException e) {
            e.printStackTrace();
            return; // Exit if the connection is interrupted
        }

        while (true) {
            double cpuTemp = getCpuTemperature();
            String data = String.format("{\"cpu_temperature\": %.2f}", cpuTemp);
            client.send(data);
            System.out.println("Sent data: " + data);

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
