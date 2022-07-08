import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

async function createNewCard(
  key: string,
  employeeId: number,
  cardType: cardRepository.TransactionTypes
) {
  const company = await companyRepository.findByApiKey(key);
  if (!company) {
    throw {
      type: "not_found",
      message: `Could not find specified "${company}"!`,
    };
  }

  const employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw {
      type: "not_found",
      message: `Could not find specified "${employee}"!`,
    };
  }

  const employeeCardWithSameType = await cardRepository.findByTypeAndEmployeeId(
    cardType,
    employeeId
  );
  if (employeeCardWithSameType) {
    throw {
      type: "method_not_allowed",
      message: `Employee card type "${cardType}" already exists!`,
    };
  }

  const cardNumber = faker.random.numeric(16);
  const cardName = employee.fullName.toUpperCase(); // FAZER A LÓGICA DO NOME DO CARTÃO
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
  return;
}

async function activateEmployeeCard(
  cardId: number,
  securityCode: string,
  password: string
) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw {
      type: "not_found",
      message: `Could not find card!`,
    };
  }

  // if (card.expirationDate) ...

  if (card.password) {
    throw {
      type: "conflict",
      message: `Card already active!`,
    };
  }

  const cryptr = new Cryptr("myTotallySecretKey");
  if (securityCode !== cryptr.decrypt(card.securityCode)) {
    throw {
      type: "unauthorized",
      message: `Unauthorized.`,
    };
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const updateData = { password: passwordHash };
  await cardRepository.update(cardId, updateData);
  return;
}

async function getCardsFromEmployee(employeeId: number, password: string) {
  const employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw {
      type: "not_found",
      message: `Could not find specified "${employee}"!`,
    };
  }

  const allEmployeecards = await cardRepository.findByEmployeeId(employee.id);
  const cards = [];
  allEmployeecards.map((card) => {
    if (bcrypt.compareSync(password, card.password)) {
      cards.push(card);
    }
  });
  return cards;
}

async function getBalanceAndTransactionsFromCard(cardId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw {
      type: "not_found",
      message: `Could not find card!`,
    };
  }

  const payments = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);

  let sumPayments: number;
  payments.map((payment) => (sumPayments += payment.amount));

  let sumRecharges: number;
  recharges.map((recharge) => (sumRecharges += recharge.amount));

  const balance = sumRecharges - sumPayments;

  return { balance, transactions: payments, recharges };
}

export const cardService = {
  createNewCard,
  activateEmployeeCard,
  getCardsFromEmployee,
  getBalanceAndTransactionsFromCard,
};
