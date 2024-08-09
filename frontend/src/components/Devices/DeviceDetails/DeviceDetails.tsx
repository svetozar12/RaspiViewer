import React, { useEffect, useState } from "react";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  YAxis,
} from "recharts";

const DevicesDetails = () => {
  const [data, setData] = useState([{ cpu_temperature: 0 }]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3333?deviceId=1");

    ws.onopen = () => {
      console.log("ws opened on browser");
    };

    ws.onmessage = (message) => {
      setData((prev) => [...prev, JSON.parse(message.data)]);
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="number" dataKey="cpu_temperature" stroke="#8884d8" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="cpu_temperature"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default DevicesDetails;
