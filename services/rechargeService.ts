import * as rechargeRepository from "../repositories/rechargeRepository.js";

import { utils } from "../utils/utils.js";

async function rechargeCard(key: string, cardId: number, amount: number) {
  await utils.checkIfCompanyExists(key);
  const card = await utils.checkIfCardExists(cardId);
  await utils.checkIfCardIsActive(card.password);
  await utils.checkIfCardIsExpired(card.expirationDate);

  const rechargeData = { cardId, amount };
  await rechargeRepository.insert(rechargeData);
}

export const rechargeService = {
  rechargeCard,
};
