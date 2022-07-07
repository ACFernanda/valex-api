import { Router } from "express";
import { rechargeCard } from "../controllers/rechargesController";

const rechargesRouter = Router();

rechargesRouter.post("/recharge", rechargeCard);

export default rechargesRouter;
