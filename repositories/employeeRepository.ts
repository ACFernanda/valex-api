import db from "../config/db.js";

export interface Employee {
  id: number;
  fullName: string;
  cpf: string;
  email: string;
  companyId: number;
}

export async function findByEmployeeIdAndCompanyId(
  employeeId: number,
  companyId: number
) {
  const result = await db.query(
    `SELECT * FROM employees WHERE id=$1 AND "companyId"=$2`,
    [employeeId, companyId]
  );

  return result.rows[0];
}
