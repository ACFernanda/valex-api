import { Router } from "express";
import {
  activateEmployeeCard,
  blockEmployeeCard,
  createNewCard,
  getBalanceAndTransactionsFromCard,
  getCardsFromEmployee,
  unblockEmployeeCard,
} from "../controllers/cardsController.js";

const cardsRouter = Router();

cardsRouter.post("/new-card", createNewCard);
cardsRouter.post("/activate-card", activateEmployeeCard);
cardsRouter.post("/view-card", getCardsFromEmployee);
cardsRouter.post("/balance-transactions", getBalanceAndTransactionsFromCard);
cardsRouter.post("/block-card", blockEmployeeCard);
cardsRouter.post("/unblock-card", unblockEmployeeCard);

export default cardsRouter;