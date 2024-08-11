import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";
import { UUID_FILE_PATH } from "../constants";

export async function getOrCreateUUID(): Promise<string> {
  try {
    const fileExists = await fs
      .stat(UUID_FILE_PATH)
      .then(() => true)
      .catch(() => false);
    if (fileExists) {
      const data = await fs.readFile(UUID_FILE_PATH, "utf-8");
      return data.trim();
    } else {
      const newUuid = uuidv4();
      await fs.writeFile(UUID_FILE_PATH, newUuid, "utf-8");
      return newUuid;
    }
  } catch (error) {
    console.error("Error reading or creating UUID file:", error);
    throw error;
  }
}
