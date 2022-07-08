import { NextFunction, Request, Response } from "express";

export default function handleErrorsMiddleware(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "not_found") {
    res.status(404).send(error.message);
  }
  if (error.type === "unprocessable_entity") {
    res.status(422).send(error.message);
  }
  if (error.type === "method_not_allowed") {
    res.status(405).send(error.message);
  }
  if (error.type === "bad_request") {
    res.status(400).send(error.message);
  }
  if (error.type === "unauthorized") {
    res.status(401).send(error.message);
  }

  res.sendStatus(500);
}
