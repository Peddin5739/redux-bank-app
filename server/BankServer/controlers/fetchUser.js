const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// MySQL pool configuration
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Fetch Receiver's Account
const fetchUserDetails = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Users WHERE UserID = ?";
    const values = [userId];

    pool.query(sql, values, (err, results) => {
      if (err) {
        reject({
          message: "No such Username and Account name Exist",
          error: err.message,
        });
      } else if (results.length === 0) {
        reject({ message: "Receiver's account not found" });
      } else {
        resolve({
          data: results[0],
        });
      }
    });
  });
};

module.exports = { fetchUserDetails };
