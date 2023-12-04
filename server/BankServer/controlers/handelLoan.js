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

function calculateDueDate(startDate) {
  // Parse the input date
  let date = new Date(startDate);

  // Check if the date is valid
  if (isNaN(date)) {
    return "Invalid Date";
  }

  // Add one year to the date
  date.setFullYear(date.getFullYear() + 1);

  // Return the due date in YYYY-MM-DD format
  return date.toISOString().split("T")[0];
}

const inserIntoLoans = (formdata) => {
  return new Promise((resolve, reject) => {
    const dd = calculateDueDate(formdata.StartDate);
    const sql =
      "insert into Loans(UserID,Amount, StartDate, DueDate,LoanType) values(?,?,?,?,?);";
    const values = [
      formdata.UserId,
      formdata.Amount,
      formdata.StartDate,
      dd,
      formdata.LoanType,
    ];

    pool.query(sql, values, (err, results) => {
      if (err) {
        reject({ message: "error in Inserting Loan", error: err });
      } else {
        resolve({
          message: "success Inserting the loan",
          results: results,
        });
      }
    });
  });
};

//fetch all the loans user had
const fetchLoans = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = " select * from Loans where UserID = ?";
    const values = [userid];
    pool.query(sql, values, (err, results) => {
      if (err) {
        reject({ message: "error fetching fds", error: err });
      } else {
        resolve({ Loans: results });
      }
    });
  });
};

module.exports = { inserIntoLoans, fetchLoans };
