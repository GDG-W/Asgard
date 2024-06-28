import "./config/env";
import "./config/postgres";

import * as errors from "./http/middlewares/error";
import * as functions from "firebase-functions";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import { paymentRoutes } from "./http/controllers/payments/payment.controller";

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/payments", paymentRoutes());

app.use(errors.notFound, errors.reporter);

export const tickets = functions.https.onRequest(app);

// for use only in dev
require("http")
  .createServer(app)
  .listen(8080, () => console.log("server listening on port 8080"));
