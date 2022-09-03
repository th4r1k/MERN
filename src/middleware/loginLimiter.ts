import { NextFunction, Request, Response } from "express";
import { Options, rateLimit } from "express-rate-limit";
import { logEvents } from "./logger";

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 6,
  message: {
    message: "Too many login attempts from this IP, please try again",
  },
  handler: (
    req: Request,
    res: Response,
    next: NextFunction,
    options: Options
  ) => {
    logEvents(
      `Too many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
