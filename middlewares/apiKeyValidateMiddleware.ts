import { NextFunction, Request, Response } from "express";

export default async function apiKeyValidateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const key = req.headers["x-api-key"];

  if (!key) throw { type: "bad_request", message: "API key is required." };

  next();
}
