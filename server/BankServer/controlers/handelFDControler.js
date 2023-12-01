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

const insertFixedDeposite = (formdata) => {
  return new Promise((resolve, reject) => {
    const sql =
      "insert into FixedDeposits (UserID,Amount,StartDate,MaturityDate) values (?,?,?,?)";
    const values = [
      formdata.UserId,
      formdata.Amount,
      formdata.StartDate,
      formdata.MaturityDate,
    ];

    pool.query(sql, values, (err, results) => {
      if (err) {
        reject({ message: "error in Fixed Deposite to bank", error: err });
      } else {
        resolve({
          message: "success doing the Fixed deposit",
          results: results,
        });
      }
    });
  });
};

//display all the fds
const fetchFDS = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = " select * from FixedDeposits where UserID = ?";
    const values = [userid];
    pool.query(sql, values, (err, results) => {
      if (err) {
        reject({ message: "error fetching fds", error: err });
      } else {
        resolve({ fds: results });
      }
    });
  });
};

module.exports = { insertFixedDeposite, fetchFDS };
