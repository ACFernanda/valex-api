import bcrypt from "bcrypt";

import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as businessRepository from "../repositories/businessRepository.js";

async function postNewPOSPayment(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw {
      type: "not_found",
      message: `Could not find card!`,
    };
  }

  if (!card.password) {
    throw {
      type: "conflict",
      message: `Card is not active!`,
    };
  }

  // if (card.expirationDate) ...

  if (card.isBlocked === true) {
    throw {
      type: "conflict",
      message: `Card is blocked!`,
    };
  }

  if (!bcrypt.compareSync(password, card.password)) {
    throw {
      type: "unauthorized",
      message: `Unauthorized.`,
    };
  }

  const business = await businessRepository.findById(businessId);
  if (!business) {
    throw {
      type: "not_found",
      message: `Could not find business!`,
    };
  }

  if (card.type !== business.type) {
    throw {
      type: "unauthorized",
      message: `Type not match.`,
    };
  }

  const payments = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);

  let sumPayments: number;
  payments.map((payment) => (sumPayments += payment.amount));

  let sumRecharges: number;
  recharges.map((recharge) => (sumRecharges += recharge.amount));

  const balance = sumRecharges - sumPayments;

  if (balance < amount) {
    throw {
      type: "unauthorized",
      message: `Balance not enough`,
    };
  }

  const paymentData = { cardId, businessId, amount };
  await paymentRepository.insert(paymentData);
}

export const paymentService = {
  postNewPOSPayment,
};
