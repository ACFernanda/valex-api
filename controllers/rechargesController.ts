import { Request, Response } from "express";

import { rechargeService } from "../services/rechargeService.js";

export async function rechargeCard(req: Request, res: Response) {
  const key: string = req.headers["x-api-key"].toString();
  const { cardId, amount }: { cardId: number; amount: number } = req.body;

  if (!key) {
    res.sendStatus(401);
  }

  await rechargeService.rechargeCard(key, cardId, amount);
  res.sendStatus(201);
}
