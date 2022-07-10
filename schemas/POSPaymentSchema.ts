import joi from "joi";

const POSPaymentSchema = joi.object({
  cardId: joi.number().required(),
  password: joi.string().pattern(/\d{4}/).required(),
  businessId: joi.number().required(),
  amount: joi.number().greater(0).required(),
});

export default POSPaymentSchema;
