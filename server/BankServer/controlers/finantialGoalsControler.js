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

const handleGoals = (formData) => {
  return new Promise((resolve, reject) => {
    //  formData contains all the necessary fields for the INSERT operation
    const sql =
      "INSERT INTO FinancialGoals (UserID, DepositAmount, DestinationDate, MonthlyContribution, Purpose, CurrentSavings, IncomeSource, RegularExpenses, GoalPriority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
      formData.UId,
      formData.depositAmount,
      formData.destinationDate,
      formData.monthlyContribution,
      formData.purpose,
      formData.currentSavings,
      formData.incomeSource,
      formData.regularExpenses,
      formData.goalPriority,
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

const getGoals = (UserId) => {
  return new Promise((resolve, reject) => {
    //  formData contains all the necessary fields for the INSERT operation
    const sql = "SELECT * FROM FinancialGoals WHERE UserId = ? ";

    const values = [UserId];

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

// getting the goal and deposite amount
const depositeTowardsGoal = (submissionData) => {
  return new Promise((resolve, reject) => {
    // submissionData contain json data required for the updation
    const sql =
      "UPDATE FinancialGoals SET DepositAmount = DepositAmount + ? WHERE UserId = ? AND Purpose = ? ";

    const values = [
      submissionData.depositAmount,
      submissionData.UserId,
      submissionData.selectedGoal,
    ];
    pool.query(sql, values, (err, results) => {
      if (err) {
        reject({ success: false, error: err.message });
      } else {
        // return success if the insertion is true
        resolve({ success: true });
      }
    });
  });
};

module.exports = { handleGoals, getGoals, depositeTowardsGoal };
