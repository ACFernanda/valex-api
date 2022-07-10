import { Router } from "express";

import { rechargeCard } from "../controllers/rechargesController.js";
import apiKeyValidateMiddleware from "../middlewares/apiKeyValidateMiddleware.js";

const rechargesRouter = Router();

rechargesRouter.post("/recharge", apiKeyValidateMiddleware, rechargeCard);

export default rechargesRouter;
