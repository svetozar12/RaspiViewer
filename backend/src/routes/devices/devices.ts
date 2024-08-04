import { Router } from "express";
import Device from "../../database/models/Device.model";
import { model, Types, Document, ObjectId } from "mongoose";

export const devicesRouter = Router();

devicesRouter.get("/", (req, res) => {
  return res.send("get devices list");
});

devicesRouter.get("/:id", (req, res) => {
  return res.send("get device id " + req.params.id);
});

devicesRouter.post("/", async (req, res) => {
  try {
    const { _id, ...body } = req.body;
    const device = new Device({
      ...body,
      userId: new Types.ObjectId(),
    });
    device.save();
    console.log(device, body);
    return res.json({ device });
  } catch (error) {
    return res.status(500).send("Smth went wrong");
  }
});

devicesRouter.delete("/:id", (req, res) => {
  return res.send("delete device " + req.params.id);
});
