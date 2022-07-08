import { Router } from "express";
import { postNewPOSPayment } from "../controllers/paymentsController.js";

const paymentsRouter = Router();

paymentsRouter.post("/pos-payment", postNewPOSPayment);

export default paymentsRouter;
