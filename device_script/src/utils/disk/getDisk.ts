import { execute } from "../execute";

export async function getDisk(): Promise<Record<string, any>> {
  const data = await execute("df -h");

  try {
    const tempString = data.split(/\r?\n/);
    const disk: Array<Record<string, any>> = [];
    tempString.shift();
    tempString.forEach((value) => {
      const [fileName, size, used, available, usedPercent, mounted, on] = value
        .replace(/  +/g, " ")
        .split(" ");
      disk.concat([
        { fileName, size, used, available, usedPercent, mounted, on },
      ]);
    });
    return disk;
  } catch (error) {
    console.error("Error reading disk:", error);
    return {};
  }
}
