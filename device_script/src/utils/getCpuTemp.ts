import fs from "node:fs/promises";

export async function getCpuTemperature(): Promise<number> {
  const tempFile = "/sys/class/thermal/thermal_zone0/temp";
  try {
    const data = await fs.readFile(tempFile, "utf-8");
    const tempString = data.trim();
    return tempString ? parseFloat(tempString) / 1000.0 : NaN;
  } catch (error) {
    console.error("Error reading CPU temperature:", error);
    return NaN;
  }
}
