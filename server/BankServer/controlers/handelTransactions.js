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
const fetchReceiversAccount = (formData, connection) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT Users.Username, Accounts.AccountID FROM Users INNER JOIN Accounts ON Users.UserID = Accounts.UserID AND Users.Username = ? AND Accounts.AccountID = ?";
    const values = [formData.name, formData.accountNumber];

    connection.query(sql, values, (err, results) => {
      if (err) {
        reject({
          message: "No such Username and Account name Exist",
          error: err.message,
        });
      } else if (results.length === 0) {
        reject({ message: "Receiver's account not found" });
      } else {
        resolve({
          name: results[0].Username,
          AccountNumber: results[0].AccountID,
        });
      }
    });
  });
};

// Fetch Sender's Account
const fetchSenderAccount = (UserID, connection) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT AccountID FROM Accounts WHERE UserID = ?";
    const values = [UserID];

    connection.query(sql, values, (err, results) => {
      if (err) {
        reject({
          message: "Problem fetching sender account details",
          error: err.message,
        });
      } else if (results.length === 0) {
        reject({ message: "Sender's account not found" });
      } else {
        resolve({ AccountNumber: results[0].AccountID });
      }
    });
  });
};

// Send Money Function
async function sendmoney(formData) {
  let connection;

  try {
    connection = await new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          resolve(conn);
        }
      });
    });

    // begin the transaction
    await new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    // fetching the receiver Account Number
    const receiverResponse = await fetchReceiversAccount(formData, connection);
    const toAccountID = receiverResponse.AccountNumber;
    // fetching the Sender Account Number
    const senderResponse = await fetchSenderAccount(
      formData.UserId,
      connection
    );
    const fromAccountID = senderResponse.AccountNumber;

    // Deduct from Sender
    let query = "UPDATE Accounts SET Balance = Balance - ? WHERE AccountID = ?";
    await connection.query(query, [formData.amount, fromAccountID]);

    // Credit to Receiver
    query = "UPDATE Accounts SET Balance = Balance + ? WHERE AccountID = ?";
    await connection.query(query, [formData.amount, toAccountID]);

    // Insert transaction record
    query =
      "INSERT INTO Transactions (AccountID, Type, Amount, TransactionDate, Description) VALUES (?, 'Transfer', ?, NOW(), ?)";
    await connection.query(query, [
      fromAccountID,
      formData.amount,
      `Transfer to account ${toAccountID}`,
    ]);
    // comitting the transaction
    await new Promise((resolve, reject) => {
      connection.commit((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    console.log(
      `Transfer of ${formData.amount} from account ${fromAccountID} to account Number ${toAccountID} successful.`
    );
  } catch (error) {
    if (connection) {
      await new Promise((resolve) => connection.rollback(() => resolve()));
    }
    console.error("Transaction failed:", error);
    throw error; // Re-throw the error to be handled by the caller
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function getTransactions(UserId) {
  return new Promise((resolve, reject) => {
    // First, get the AccountID associated with the UserId
    const accountSql = "SELECT AccountID FROM Accounts WHERE UserID = ?";
    pool.query(accountSql, [UserId], (accountErr, accountResults) => {
      if (accountErr) {
        reject({ error: accountErr.message });
      } else if (accountResults.length === 0) {
        reject({ message: "Account not found for the given user ID" });
      } else {
        const AccountID = accountResults[0].AccountID;

        // Then, fetch transactions for this AccountID
        const transactionSql = "SELECT * FROM Transactions WHERE AccountID = ?";
        pool.query(
          transactionSql,
          [AccountID],
          (transactionErr, transactionResults) => {
            if (transactionErr) {
              reject({ error: transactionErr.message });
            } else {
              resolve(transactionResults);
            }
          }
        );
      }
    });
  });
}

module.exports = { sendmoney, getTransactions };
