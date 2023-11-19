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

const handleAccount = async (UserId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT *  FROM Accounts WHERE UserId = ?";
    pool.query(sql, [UserId], (err, results) => {
      if (err) {
        reject({ errormsg: err.message });
      } else if (results.length > 0) {
        resolve({
          userDetails: results[0],
        });
      } else {
        resolve({ errormsg: "No Account with that ID found" });
      }
    });
  });
};

module.exports = { handleAccount };
