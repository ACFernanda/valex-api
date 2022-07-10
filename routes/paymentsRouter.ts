import { Router } from "express";

import { postNewPOSPayment } from "../controllers/paymentsController.js";
import schemaValidateMiddleware from "../middlewares/schemaValidate.js";
import POSPaymentSchema from "../schemas/POSPaymentSchema.js";

const paymentsRouter = Router();

paymentsRouter.post(
  "/pos-payment",
  schemaValidateMiddleware(POSPaymentSchema),
  postNewPOSPayment
);

export default paymentsRouter;
