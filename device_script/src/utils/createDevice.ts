import { API_URL, GET_URL } from "../constants";

export async function createDevice(id: string): Promise<void> {
  if (!API_URL || !GET_URL) {
    console.error(
      "Error: API_URL environment variable is not set or is empty.",
    );
    return;
  }

  const jsonPayload = JSON.stringify({
    name: "test",
    uuid: id,
    ip_address: "test",
  });
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    await fetch(GET_URL, {
      method: "POST",
      body: jsonPayload,
      headers,
    });
  } catch (error) {
    console.error("Error sending createDevice request:", error);
  }
}
