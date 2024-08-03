import { Router } from "express";

export const devicesRouter = Router();

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Retrieves a list of devices
 *     responses:
 *       200:
 *         description: A successful response
 */
devicesRouter.get("/example", (req, res) => {
  return res.send("example");
});
