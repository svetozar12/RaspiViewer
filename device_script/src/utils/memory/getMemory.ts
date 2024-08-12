import fs from "node:fs/promises";

export async function getMemory(): Promise<Record<string, any>> {
  const tempFile = "/proc/meminfo";
  try {
    const data = await fs.readFile(tempFile, "utf-8");
    const tempString = data.split(/\r?\n/);
    const obj: Record<string, any> = {};
    tempString.forEach((value) => {
      const result = value.replace(/  +/g, " ").split(" ");
      //  all result are in kB but are saved in Gigabyte
      obj[result[0]] = result[1]
        ? Math.min(parseInt(result[1]) / 1000000)
        : NaN;
    });
    return obj;
  } catch (error) {
    console.error("Error reading CPU temperature:", error);
    return {};
  }
}
