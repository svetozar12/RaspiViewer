import { Router } from "express";
import { devicesRouter } from "./devices/devices";

export const appRouter = Router();

appRouter.use("/devices", devicesRouter);
