package com.svetozar12;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

public class UUIDManager {
    private static final String UUID_FILE_PATH = "device-uuid.txt";
    
    public String getOrCreateUUID() throws IOException {
            File file = new File(UUID_FILE_PATH);
        if (file.exists()) {
            return new String(Files.readAllBytes(Paths.get(UUID_FILE_PATH)));
        } else {
            String uuid = UUID.randomUUID().toString();
            Files.write(Paths.get(UUID_FILE_PATH), uuid.getBytes());
            return uuid;
        }
        
    }
}
