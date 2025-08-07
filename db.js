import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.MYSQLHOST, // Changed from DB_HOST
  user: process.env.MYSQLUSER, // Changed from DB_USER
  password: process.env.MYSQLPASSWORD, // Changed from DB_PASSWORD
  database: process.env.MYSQLDATABASE, // Changed from DB_NAME
  port: process.env.MYSQLPORT, // Changed from PORT
});
