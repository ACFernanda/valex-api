import { Request, Response } from "express";

export function rechargeCard(req: Request, res: Response) {
  res.send("Recarreguei um cartão");
}
