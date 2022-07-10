import { Request, Response } from "express";

import { cardService } from "../services/cardService.js";
import { TransactionTypes } from "../repositories/cardRepository.js";

export async function createNewCard(req: Request, res: Response) {
  const key: string = req.headers["x-api-key"].toString();
  const {
    employeeId,
    cardType,
  }: { employeeId: number; cardType: TransactionTypes } = req.body;

  const newCard = await cardService.createNewCard(key, employeeId, cardType);
  res.status(201).send(newCard);
}

export async function activateEmployeeCard(req: Request, res: Response) {
  const {
    cardId,
    securityCode,
    password,
  }: { cardId: number; securityCode: string; password: string } = req.body;

  await cardService.activateEmployeeCard(cardId, securityCode, password);
  res.sendStatus(200);
}

export async function getBalanceAndTransactionsFromCard(
  req: Request,
  res: Response
) {
  const { cardId } = req.body;

  const data = await cardService.getBalanceAndTransactionsFromCard(cardId);
  res.send(data);
}

export async function blockEmployeeCard(req: Request, res: Response) {
  const { cardId, password }: { cardId: number; password: string } = req.body;

  await cardService.blockEmployeeCard(cardId, password);
  res.sendStatus(200);
}

export async function unblockEmployeeCard(req: Request, res: Response) {
  const { cardId, password }: { cardId: number; password: string } = req.body;

  await cardService.unblockEmployeeCard(cardId, password);
  res.sendStatus(200);
}
