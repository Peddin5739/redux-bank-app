const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const handleLogin = async (userId, password) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT UserID,Username,Email,Phone,Address  FROM Users WHERE Email = ? and Pass = ?";
    pool.query(sql, [userId, password], (err, results) => {
      if (err) {
        reject({ Login: false, error: err.message });
      } else if (results.length > 0) {
        resolve({
          Login: { Login: true },
          userDetails: results[0],
        });
      } else {
        resolve({ Login: false });
      }
    });
  });
};

module.exports = { handleLogin };
