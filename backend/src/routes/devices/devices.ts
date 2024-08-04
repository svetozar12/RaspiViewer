import { Router } from "express";
import Device from "../../database/models/Device.model";

export const devicesRouter = Router();

devicesRouter.get("/", (req, res) => {
  return res.send("get devices list");
});

devicesRouter.get("/:id", (req, res) => {
  return res.send("get device id " + req.params.id);
});

devicesRouter.post("/", (req, res) => {
  try {
    const body = req.body;
    // const device = Device.create(body);
    console.log(body);
    return res.json({});
  } catch (error) {
    return res.status(500).send("Smth went wrong");
  }
});

devicesRouter.delete("/:id", (req, res) => {
  return res.send("delete device " + req.params.id);
});
