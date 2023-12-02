import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./stylesfolder/DisplayFD.module.css";
export default function DisplayFD() {
  const userDetails = useSelector((state) => state.auth);
  const UserId = userDetails.user.UserID;
  const [fetchResults, setFetchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/fetchfds",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: UserId }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFetchResults(data.fds); // Assuming data.fds is the array of deposit objects
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (UserId) {
      fetchData();
    }
  }, [UserId]);

  return (
    <div className={styles.fdContainer}>
      {fetchResults.map((fd, index) => (
        <div key={index} className={styles.fdItem}>
          <p>Deposit ID: {fd.DepositID}</p>
          <p>Amount: {fd.Amount}</p>
          <p>Interest Rate: {fd.InterestRate}%</p>
          <p>Start Date: {new Date(fd.StartDate).toLocaleDateString()}</p>
          <p>Maturity Date: {new Date(fd.MaturityDate).toLocaleDateString()}</p>
          {/* Add more properties as needed */}
        </div>
      ))}
    </div>
  );
}
