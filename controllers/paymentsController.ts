import { Request, Response } from "express";

export function postNewPOSPayment(req: Request, res: Response) {
  res.send("Adicionei um pagamento");
}
