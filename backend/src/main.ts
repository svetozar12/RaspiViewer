/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";
import swaggerUi from "swagger-ui-express";
import { exampleRouter } from "./routes/example/example";
import { specs } from "./config/swagger";

const app = express();

app.use("/api", exampleRouter);
app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/v1/swagger/doc.json", (req, res) => res.send(specs));

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
