import { Router } from "express";

import cardsRouter from "./cardsRouter.js";
import paymentsRouter from "./paymentsRouter.js";
import rechargesRouter from "./rechargesRouter.js";

const router = Router();

router.use(cardsRouter);
router.use(paymentsRouter);
router.use(rechargesRouter);

export default router;
