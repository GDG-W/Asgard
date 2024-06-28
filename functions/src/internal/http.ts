import { NextFunction, Request, Response } from "express";

/**
 * decorator for controllers. it should be noted that any request handler to be decorated using this
 * must never end the http request in anyway, errors should be thrown, while responses should simply
 * be returned.
 * @param fn
 * @returns
 */
export function controller(fn: (req: Request, res: Response) => Promise<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req, res);
      // log response here and what not
      res.json(data ?? null);
    } catch (err) {
      next(err);
    }
  };
}
