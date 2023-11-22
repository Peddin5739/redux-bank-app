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

const handleRegister = (formData) => {
  return new Promise((resolve, reject) => {
    //  formData contains all the necessary fields for the INSERT operation
    const sql =
      "INSERT INTO Users (Username,Pass,Email,Phone,Address,UserType) VALUES (?, ?, ?, ?, ?, ?)";

    const values = [
      formData.Username,
      formData.Pass,
      formData.Email,
      formData.Phone,
      formData.Address,
      formData.UserType,
    ];

    pool.query(sql, values, (err, results) => {
      if (err) {
        reject({ success: false, error: err.message });
      } else {
        // results object contains information about the operation, such as affected rows
        resolve({ success: true, results: results });
      }
    });
  });
};
//getting the userid to create the account with 0$
const getUserId = (email, password) => {
  return new Promise((resolve, reject) => {
    //  formData contains all the necessary fields for the INSERT operation
    const sql = "SELECT UserId FROM Users WHERE Email = ? AND Phone = ?";

    const values = [email, password];

    pool.query(sql, values, (err, results) => {
      if (err) {
        reject({ success: false, error: err.message });
      } else {
        // results object contains information about the operation, such as affected rows
        resolve({ success: true, results: results[0].UserId });
      }
    });
  });
};

const createAccount = async (formData) => {
  const uid = await getUserId(formData.Email, formData.Phone);
  const fuid = uid.results;
  // Create a new Date object for the current date
  const currentDate = new Date();

  // Format the date in YYYY-MM-DD format
  const formattedDate = currentDate.toISOString().split("T")[0];

  return new Promise((resolve, reject) => {
    //  formData contains all the necessary fields for the INSERT operation
    const sql =
      "INSERT INTO Accounts (UserID,AccountType,Balance, DateOpened)  VALUES (?, ?, ?, ?)";

    const values = [fuid, "Checking", 0, formattedDate];

    pool.query(sql, values, (err, results) => {
      if (err) {
        reject({ success: false, error: err.message });
      } else {
        // results object contains information about the operation, such as affected rows
        resolve({ success: true, results: results });
      }
    });
  });
};

module.exports = { handleRegister, createAccount };
