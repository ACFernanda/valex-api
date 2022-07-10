import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

import * as businessRepository from "../repositories/businessRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

async function checkIfCompanyExists(companyKey: string) {
  const company = await companyRepository.findByApiKey(companyKey);
  if (!company) {
    throw {
      type: "not_found",
      message: `Could not find specified company!`,
    };
  }

  return company;
}

async function checkIfEmployeeExists(employeeId: number, companyId: number) {
  const employee = await employeeRepository.findByEmployeeIdAndCompanyId(
    employeeId,
    companyId
  );
  if (!employee) {
    throw {
      type: "not_found",
      message: `Could not find specified employee!`,
    };
  }

  return employee;
}

async function checkIfEmployeeHasCardType(
  employeeId: number,
  cardType: cardRepository.TransactionTypes
) {
  const employeeCardWithSameType = await cardRepository.findByTypeAndEmployeeId(
    cardType,
    employeeId
  );
  if (employeeCardWithSameType) {
    throw {
      type: "method_not_allowed",
      message: `Employee card type already exists!`,
    };
  }

  return;
}

async function checkIfCardExists(cardId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw {
      type: "not_found",
      message: `Could not find card!`,
    };
  }

  return card;
}

async function checkIfCardIsActive(cardPassword: string) {
  if (!cardPassword) {
    throw {
      type: "conflict",
      message: `Card is not active!`,
    };
  }

  return;
}

async function checkIfCardIsExpired(expirationDate: string) {
  const date: string[] = expirationDate.split("/");
  const month: number = parseInt(date[0]);
  const year: number = parseInt(date[1]);
  console.log("year: ", year);
  console.log("dayjs year: ", dayjs().year());

  if (dayjs().year() > 2000 + year) {
    throw {
      type: "unauthorized",
      message: `Card expired.`,
    };
  }

  if (dayjs().year() === 2000 + year && dayjs().month() + 1 > month) {
    throw {
      type: "unauthorized",
      message: `Card expired here.`,
    };
  }

  return;
}

async function checkIfSecyrityCodeIsCorrect(securityCode: string, card) {
  const cryptr = new Cryptr("myTotallySecretKey");
  if (securityCode !== cryptr.decrypt(card.securityCode)) {
    throw {
      type: "unauthorized",
      message: `Unauthorized.`,
    };
  }

  return;
}

async function checkIfCardIsBlocked(card) {
  if (card.isBlocked === true) {
    throw {
      type: "conflict",
      message: `Card already blocked!`,
    };
  }

  return;
}

async function checkIfCardIsUnblocked(card) {
  if (card.isBlocked === false) {
    throw {
      type: "conflict",
      message: `Card already unblocked!`,
    };
  }

  return;
}

async function checkIfPasswordIsCorrect(password, card) {
  if (!bcrypt.compareSync(password, card.password)) {
    throw {
      type: "unauthorized",
      message: `Unauthorized.`,
    };
  }

  return;
}

async function checkIfBussinessIsRegister(businessId: number) {
  const business = await businessRepository.findById(businessId);
  if (!business) {
    throw {
      type: "not_found",
      message: `Could not find business!`,
    };
  }

  return business;
}

async function checkIfCardAndBusinessTypesMatch(
  cardType: string,
  businessType: string
) {
  if (cardType !== businessType) {
    throw {
      type: "unauthorized",
      message: `Type not match.`,
    };
  }

  return;
}

async function checkIfBalanceIsEnough(balance, amount) {
  if (balance < amount) {
    throw {
      type: "unauthorized",
      message: `Balance not enough`,
    };
  }

  return;
}

async function getCardBalance(payments, recharges) {
  let sumPayments: number;
  payments.map((payment) => (sumPayments += payment.amount));

  let sumRecharges: number;
  recharges.map((recharge) => (sumRecharges += recharge.amount));

  const balance = sumRecharges - sumPayments;

  return balance;
}

export const utils = {
  checkIfCompanyExists,
  checkIfEmployeeExists,
  checkIfEmployeeHasCardType,
  checkIfCardExists,
  checkIfCardIsActive,
  checkIfCardIsExpired,
  checkIfSecyrityCodeIsCorrect,
  checkIfCardIsBlocked,
  checkIfCardIsUnblocked,
  checkIfPasswordIsCorrect,
  checkIfBussinessIsRegister,
  checkIfCardAndBusinessTypesMatch,
  checkIfBalanceIsEnough,
  getCardBalance,
};
