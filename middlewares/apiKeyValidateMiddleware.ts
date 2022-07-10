import { NextFunction, Request, Response } from "express";

export default async function apiKeyValidateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const key: string = req.headers["x-api-key"].toString();

  if (!key) throw { type: "bad_request", message: "API key is required." };

  next();
}
