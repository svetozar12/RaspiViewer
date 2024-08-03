package com.svetozar12;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class CpuTemp {
    CpuTemp() {
    };
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
}
