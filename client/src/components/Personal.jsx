import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./stylesfolder/Personal.module.css";
import { useNavigate } from "react-router-dom";
export default function Personal() {
  const userDetails = useSelector((state) => state.auth);
  const UserId = userDetails.user.UserID;
  const [personalData, setPersonalData] = useState([]);
  const [Transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  function DepositeToGoal() {
    navigate("/goaldeposite");
  }

  function GoToTransfer() {
    navigate("/transfer");
  }

  useEffect(() => {
    fetch("https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/get-goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserId: UserId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        setPersonalData(data.results);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  }, [UserId]);
  // Fetching transactions
  useEffect(() => {
    fetch(
      "https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/getTransactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: UserId }), // Note the lowercase 'u' in userId
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data);
        console.log(Transactions);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  }, [UserId]);

  return (
    <div className={styles.personalcontainer}>
      <h3>Achieve Your Financial Dreams</h3>
      {/*---------------------------------------------------------------*/}
      <div className={styles.goalscontainer}>
        {personalData.map((goal) => {
          const today = new Date();
          const destinationDate = new Date(goal.DestinationDate);
          const remainingTime = destinationDate - today;
          const remainingDays = Math.max(
            Math.ceil(remainingTime / (1000 * 60 * 60 * 24)),
            0
          );
          const amountDeposited = goal.DepositAmount;
          return (
            <div key={goal.GoalID} className={styles.financialGoal}>
              <h3>{goal.Purpose} </h3>
              <p> Days Remaining: {remainingDays} </p>

              <p> Amount Deposited: ${amountDeposited} </p>
            </div>
          );
        })}
        <button onClick={DepositeToGoal}>Deposite To wards a Goal</button>
      </div>
      {/*---------------------------------------------------------------*/}
      <h3>To Transfer the Money To Others Click the transfer button</h3>
      <button onClick={GoToTransfer}>Transfer</button>

      <h3>Your Transactions</h3>
      <div className={styles.transactionsContainer}>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Account ID</th>

              <th>Amount</th>
              <th>Transaction Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Transactions.map((transaction) => (
              <tr key={transaction.TransactionID}>
                <td>{transaction.TransactionID}</td>
                <td>{transaction.AccountID}</td>

                <td>${transaction.Amount}</td>
                <td>
                  {new Date(transaction.TransactionDate).toLocaleString()}
                </td>
                <td>{transaction.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
