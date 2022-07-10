import { Router } from "express";

import {
  activateEmployeeCard,
  blockEmployeeCard,
  createNewCard,
  getBalanceAndTransactionsFromCard,
  unblockEmployeeCard,
} from "../controllers/cardsController.js";
import apiKeyValidateMiddleware from "../middlewares/apiKeyValidateMiddleware.js";

const cardsRouter = Router();

cardsRouter.post("/new-card", apiKeyValidateMiddleware, createNewCard);
cardsRouter.post("/activate-card", activateEmployeeCard);
// cardsRouter.post("/view-card", getCardsFromEmployee); ROTA RETIRADA DOS REQUISITOS
cardsRouter.post("/balance-transactions", getBalanceAndTransactionsFromCard);
cardsRouter.post("/block-card", blockEmployeeCard);
cardsRouter.post("/unblock-card", unblockEmployeeCard);

export default cardsRouter;
