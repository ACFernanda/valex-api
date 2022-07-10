import joi from "joi";

const rechargeCardSchema = joi.object({
  cardId: joi.number().required(),
  amount: joi.number().integer().greater(0).required(),
});

export default rechargeCardSchema;
