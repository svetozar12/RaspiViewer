import fs from "node:fs/promises";

export async function getCpuFreq(): Promise<number> {
  const tempFile = "/sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_cur_freq";
  try {
    const data = await fs.readFile(tempFile, "utf-8");
    const tempString = data.trim();
    return tempString ? parseInt(tempString) / 1000000.0 : NaN;
  } catch (error) {
    console.error("Error reading CPU frequency:", error);
    return NaN;
  }
}
