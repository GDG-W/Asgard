import "./config/env";
import "./config/postgres";

import * as errors from "./http/middlewares/error";
import * as functions from "firebase-functions";

import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(errors.notFound, errors.reporter);

export const tickets = functions.https.onRequest(app);
