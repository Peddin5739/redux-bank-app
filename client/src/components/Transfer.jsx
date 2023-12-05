import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./stylesfolder/Transfer.module.css";
import { useNavigate } from "react-router-dom";

export default function Transfer() {
  const userDetails = useSelector((state) => state.auth);
  const UserId = userDetails.user.UserID;
  const navigate = useNavigate();
  function GotoHome() {
    navigate("/home");
  }
  const [accountNumber, setAccountNumber] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      accountNumber,
      name,
      amount: parseFloat(amount),
      UserId: UserId,
    };
    console.log("Data submitted:", JSON.stringify(data));

    try {
      const response = await fetch(
        "https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/sendmoney",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Check if the response is in JSON format
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const responseJson = await response.json();
        console.log("Response from the server:", responseJson);
      } else {
        const responseText = await response.text();
        console.log("Non-JSON response from the server:", responseText);
      }

      GotoHome();
    } catch (error) {
      console.error("Error in sending data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>
            Account Number:
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Amount (to deposit):
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
      <p>
        Can Only Transfer The Money To The Customers of the Bank:
        <br />
        Try Sending Money To
        <br />
        AccountNumber: 3
        <br />
        Name: mounika
      </p>
    </div>
  );
}
