import { NextFunction, Request, Response } from "express";

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  // implement auth here
  return next();
}
