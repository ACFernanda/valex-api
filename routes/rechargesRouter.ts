import { Router } from "express";
import { rechargeCard } from "../controllers/rechargesController.js";

const rechargesRouter = Router();

rechargesRouter.post("/recharge", rechargeCard);

export default rechargesRouter;
