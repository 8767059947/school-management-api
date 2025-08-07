import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST, // Changed from DB_HOST
  user: process.env.DB_USER, // Changed from DB_USER
  password: process.env.DB_PASSWORD, // Changed from DB_PASSWORD
  database: process.env.DB_NAME, // Changed from DB_NAME
  port: process.env.PORT, // Changed from PORT
});
