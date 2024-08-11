import { exec } from "child_process";

let prevIdle = 0;
let prevTotal = 0;

export async function getCpuUtilization(): Promise<string> {
  const data = await execute("cat /proc/stat | grep '^cpu '");

  const result = data.replace(/\s+/g, " ").split(" ");

  // Extract CPU times
  const user = parseInt(result[1], 10);
  const nice = parseInt(result[2], 10);
  const system = parseInt(result[3], 10);
  const idle = parseInt(result[4], 10);
  const iowait = parseInt(result[5], 10);
  const irq = parseInt(result[6], 10);
  const softirq = parseInt(result[7], 10);

  // Calculate idle and total time
  const currIdle = idle + iowait;
  const currTotal = user + nice + system + idle + iowait + irq + softirq;

  // Calculate the differences
  const idleDiff = currIdle - prevIdle;
  const totalDiff = currTotal - prevTotal;

  // Calculate CPU utilization
  const cpuUsage = (100 * (totalDiff - idleDiff)) / totalDiff;

  // Update previous values
  prevIdle = currIdle;
  prevTotal = currTotal;

  return cpuUsage.toFixed(2);
}

function execute(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}
