import { NextFunction, Request, Response } from "express";

import { ApplicationError } from "../../internal/error";
import { StatusCodes } from "http-status-codes";

export function notFound(_req: Request, res: Response, next: NextFunction) {
  return next(
    new ApplicationError(StatusCodes.NOT_FOUND, "Whoops! Route doesn't exist.")
  );
}

/**
 * Middleware for automatically interpreting `ApplicationError`. It responsds
 * with `INTERNAL_SERVER_ERROR` if the error is not one of either.
 * @param logger octonet logger
 */
export function reporter(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // handling for asynchronous situations where error is thrown after response has been sent
  if (res.headersSent) return next(err);

  if (err instanceof ApplicationError) {
    res.status(err.code).json({ message: err.message, data: err.data });
  } else {
    console.error(err); // log error before reporting system error
    res.status(500).json({
      message: "We are having system level issues. Please bear with us",
    });
  }
}
