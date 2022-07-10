import { Router } from "express";

import {
  activateEmployeeCard,
  blockEmployeeCard,
  createNewCard,
  getBalanceAndTransactionsFromCard,
  unblockEmployeeCard,
} from "../controllers/cardsController.js";
import apiKeyValidateMiddleware from "../middlewares/apiKeyValidateMiddleware.js";
import schemaValidateMiddleware from "../middlewares/schemaValidate.js";
import newCardSchema from "../schemas/newCardSchema.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import cardIdSchema from "../schemas/cardIdSchema.js";
import cardIdAndPasswordSchema from "../schemas/cardIdAndPasswordSchema.js";

const cardsRouter = Router();

cardsRouter.post(
  "/new-card",
  apiKeyValidateMiddleware,
  schemaValidateMiddleware(newCardSchema),
  createNewCard
);
cardsRouter.post(
  "/activate-card",
  schemaValidateMiddleware(activateCardSchema),
  activateEmployeeCard
);

// cardsRouter.post("/view-card", getCardsFromEmployee); ROTA RETIRADA DOS REQUISITOS

cardsRouter.post(
  "/balance-transactions",
  schemaValidateMiddleware(cardIdSchema),
  getBalanceAndTransactionsFromCard
);
cardsRouter.post(
  "/block-card",
  schemaValidateMiddleware(cardIdAndPasswordSchema),
  blockEmployeeCard
);
cardsRouter.post(
  "/unblock-card",
  schemaValidateMiddleware(cardIdAndPasswordSchema),
  unblockEmployeeCard
);

export default cardsRouter;
