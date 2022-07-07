import { Router } from "express";

const cardsRouter = Router();

cardsRouter.post("/new-card", createNewCard);
cardsRouter.post("/activate-card", activateCard);
cardsRouter.post("/view-card", getCardsFromEmployee);

export default cardsRouter;
