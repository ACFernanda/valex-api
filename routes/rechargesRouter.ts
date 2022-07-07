import { Router } from "express";

const rechargesRouter = Router();

rechargesRouter.post("/recharge", rechargeCard);

export default rechargesRouter;
