import joi from "joi";

const activateCardSchema = joi.object({
  cardId: joi.number().required(),
  securityCode: joi
    .string()
    .regex(/^\d{3}$/)
    .required(),
  password: joi
    .string()
    .regex(/^\d{4}$/)
    .required(),
});

export default activateCardSchema;
