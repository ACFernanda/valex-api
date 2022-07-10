import joi from "joi";

const cardIdSchema = joi.object({
  cardId: joi.number().required(),
});

export default cardIdSchema;
