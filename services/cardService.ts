import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

import { utils } from "../utils/utils.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

async function createNewCard(
  key: string,
  employeeId: number,
  cardType: cardRepository.TransactionTypes
) {
  const company = await utils.checkIfCompanyExists(key);
  const employee = await utils.checkIfEmployeeExists(employeeId, company.id);
  await utils.checkIfEmployeeHasCardType(employeeId, cardType);

  const cardNumber = faker.random.numeric(16); // MUDAR PRA STRING COM O LAYOUT
  const cardName = formatNameToCardHolderName(employee.fullName);
  const expirationDate = dayjs().add(5, "year").format("MM/YY");
  const securityCode = faker.random.numeric(3);
  const cryptr = new Cryptr("myTotallySecretKey");
  const encryptSecurityCode = cryptr.encrypt(securityCode);

  const newCard = {
    employeeId: employeeId,
    number: cardNumber,
    cardholderName: cardName,
    securityCode: encryptSecurityCode,
    expirationDate: expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: true,
    type: cardType,
  };

  await cardRepository.insert(newCard);
  return newCard;
}

async function activateEmployeeCard(
  cardId: number,
  securityCode: string,
  password: string
) {
  const card = await utils.checkIfCardExists(cardId);
  await utils.checkIfCardIsExpired(card.expirationDate);
  await utils.checkIfCardIsActive(card.password);
  await utils.checkIfSecyrityCodeIsCorrect(securityCode, card);

  const passwordHash = bcrypt.hashSync(password, 10);
  const updateData = { password: passwordHash };
  await cardRepository.update(cardId, updateData);
  return;
}

async function getBalanceAndTransactionsFromCard(cardId: number) {
  await utils.checkIfCardExists(cardId);
  const payments = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);
  const balance = await utils.getCardBalance(payments, recharges);

  return { balance, transactions: payments, recharges };
}

async function blockEmployeeCard(cardId: number, password: string) {
  const card = await utils.checkIfCardExists(cardId);
  await utils.checkIfCardIsExpired(card.expirationDate);
  await utils.checkIfCardIsBlocked(card);
  await utils.checkIfPasswordIsCorrect(password, card);

  await cardRepository.update(cardId, { isBlocked: true });
  return;
}

async function unblockEmployeeCard(cardId: number, password: string) {
  const card = await utils.checkIfCardExists(cardId);
  await utils.checkIfCardIsExpired(card.expirationDate);
  await utils.checkIfCardIsUnblocked(card);
  await utils.checkIfPasswordIsCorrect(password, card);

  await cardRepository.update(cardId, { isBlocked: false });
  return;
}

export const cardService = {
  createNewCard,
  activateEmployeeCard,
  getBalanceAndTransactionsFromCard,
  blockEmployeeCard,
  unblockEmployeeCard,
};

function formatNameToCardHolderName(fullName: string) {
  const name: string[] = fullName.split(" ");
  let simplifiedName: string = name[0];
  for (let i = 1; i < name.length - 1; i++) {
    if (name[i].length >= 3) simplifiedName += ` ${name[i][0]}`;
  }
  simplifiedName += ` ${name[name.length - 1]}`;
  return simplifiedName.toUpperCase();
}
