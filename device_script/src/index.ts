import { setInterval } from "timers/promises";
import { API_URL } from "./constants";
import { WebSocketClientManager } from "./utils/ws";
import { getCpuTemperature } from "./utils/cpu/getCpuTemp";
import { createDevice } from "./utils/createDevice";
import { getOrCreateUUID } from "./utils/getOrCreateUUID";
import { getCpuUtilization } from "./utils/cpu/getCpuUtilization";

async function main() {
  const deviceId = await getOrCreateUUID();

  if (!API_URL) {
    throw new Error(
      "WebSocket server address not specified in environment variables",
    );
  }

  const serverUri = `ws://${API_URL}/?deviceId=${deviceId}`;

  await createDevice(deviceId);

  const clientManager = new WebSocketClientManager(serverUri);
  clientManager.connectAndRun();

  for await (const _ of setInterval(10000)) {
    const cpuTemp = await getCpuTemperature();
    const cpuUtilization = await getCpuUtilization();
    const data = JSON.stringify({
      cpu_temperature: Math.round(cpuTemp * 100) / 100,
      cpuUtilization,
    });
    clientManager.sendData(data);
  }
}

main().catch((error) => console.error("Error in main function:", error));
