import pg from "pg";
import "./setup.js";

const { Pool } = pg;
const configDatabase = {
  connectionString: process.env.DATABASE_URL,
  ssl: {},
};

if (process.env.MODE === "PROD") {
  configDatabase.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new Pool(configDatabase);
export default db;
