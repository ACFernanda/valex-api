import { NextFunction, Request, Response } from "express";

export default function handleErrorsMiddleware(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "not_found") {
    res.sendStatus(404);
  }
  if (error.type === "unprocessable_entity") {
    res.sendStatus(422);
  }

  res.sendStatus(500);
}
