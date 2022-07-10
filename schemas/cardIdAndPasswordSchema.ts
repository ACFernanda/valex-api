import joi from "joi";

const cardIdAndPasswordSchema = joi.object({
  cardId: joi.number().required(),
  password: joi.string().pattern(/\d{4}/).required(),
});

export default cardIdAndPasswordSchema;
