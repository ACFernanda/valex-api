import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.post("/pos-payment", postNewPOSPayment);

export default paymentsRouter;
