package com.svetozar12;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HTTPRequest {
    private static final String GET_URL = System.getenv("API_URL") + "/devices";
    static HttpClient client = HttpClient.newHttpClient();

    public static void createDevice() throws UnsupportedEncodingException {
        final String json = String.format("{userId:%s}", "1");
        try {
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(GET_URL))
                    .POST(HttpRequest.BodyPublishers.ofString(json)).setHeader("Accept", "application/json")
                    .setHeader("Content-type", "application/json").build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
