import { utils } from "../utils/utils.js";

import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

async function postNewPOSPayment(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  const card = await utils.checkIfCardExists(cardId);
  await utils.checkIfCardIsActive(card.password);
  await utils.checkIfCardIsExpired(card.expirationDate);
  await utils.checkIfCardIsBlocked(card);
  await utils.checkIfPasswordIsCorrect(password, card);
  const business = await utils.checkIfBussinessIsRegister(businessId);
  await utils.checkIfCardAndBusinessTypesMatch(card.type, business.type);
  const payments = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);
  const balance = await utils.getCardBalance(payments, recharges);
  await utils.checkIfBalanceIsEnough(balance, amount);

  const paymentData = { cardId, businessId, amount };
  await paymentRepository.insert(paymentData);

  return;
}

export const paymentService = {
  postNewPOSPayment,
};
