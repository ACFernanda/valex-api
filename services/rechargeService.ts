import * as companyRepository from "../repositories/companyRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

async function rechargeCard(key: string, cardId: number, amount: number) {
  const company = await companyRepository.findByApiKey(key);
  if (!company) {
    throw {
      type: "not_found",
      message: `Could not find specified "${company}"!`,
    };
  }

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

  const rechargeData = { cardId, amount };
  await rechargeRepository.insert(rechargeData);
}

export const rechargeService = {
  rechargeCard,
};
