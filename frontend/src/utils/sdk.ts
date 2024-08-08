import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:3333" });

type Device = {
  userId: string;
  name: string;
  ip_address: string;
  status: string;
  uuid: string;
};

const deviceApi = {
  getList: async () => {
    return client.get<{ devices: Device[] }>("/devices");
  },
};

export const sdk = { deviceApi };
