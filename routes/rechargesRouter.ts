import { Router } from "express";

import { rechargeCard } from "../controllers/rechargesController.js";
import apiKeyValidateMiddleware from "../middlewares/apiKeyValidateMiddleware.js";
import schemaValidateMiddleware from "../middlewares/schemaValidate.js";
import rechargeCardSchema from "../schemas/rechargeCardSchema.js";

const rechargesRouter = Router();

rechargesRouter.post(
  "/recharge",
  apiKeyValidateMiddleware,
  schemaValidateMiddleware(rechargeCardSchema),
  rechargeCard
);

export default rechargesRouter;
