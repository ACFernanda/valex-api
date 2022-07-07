import { Request, Response } from "express";

export function createNewCard(req: Request, res: Response) {
  res.send("Criei um cartão");
}

export function activateEmployeeCard(req: Request, res: Response) {
  res.send("Ativei um cartão");
}

export function getCardsFromEmployee(req: Request, res: Response) {
  res.send("Achei um cartão");
}

export function getBalanceAndTransactionsFromCard(req: Request, res: Response) {
  res.send("Gastos e as transações");
}

export function blockEmployeeCard(req: Request, res: Response) {
  res.send("Bloqueei um cartão");
}

export function unblockEmployeeCard(req: Request, res: Response) {
  res.send("Desbloqueei um cartão");
}
