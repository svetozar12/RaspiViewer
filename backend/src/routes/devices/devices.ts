import { Router } from "express";
import Device from "../../database/models/Device.model";
import { Types } from "mongoose";

export const devicesRouter = Router();

devicesRouter.get("/", async (req, res) => {
  try {
    const devices = await Device.find().lean();
    return res.json({ devices });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

devicesRouter.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const device = await Device.findById(_id).lean();
    return res.send(device);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

devicesRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const device = new Device({
      ...body,
      userId: new Types.ObjectId(),
    });
    device.save();
    return res.send(device);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

devicesRouter.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const device = await Device.findByIdAndDelete(_id).lean();
    return res.json({ device });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
