import { PaymentRequestDto, paymentRequestDto } from "./payment.dto";
import { Request, Response } from "express";

import _ from "lodash";
import { autoValidate } from "../../middlewares/joi";
import { controller } from "../../../internal/http";
import express from "express";

async function makeRequest(req: Request, res: Response) {
  const body: PaymentRequestDto = req.body;

  return body;
}

export function paymentRoutes() {
  const router = express.Router();

  router.post(
    "/requests",
    autoValidate(paymentRequestDto),
    controller(makeRequest)
  );

  return router;
}
