import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./stylesfolder/DepositeTowardsGoal.module.css";
import { useNavigate } from "react-router-dom";

export default function DepositeTowardsGoal() {
  const userDetails = useSelector((state) => state.auth);
  const UserId = userDetails.user.UserID;
  const [personalData, setPersonalData] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (UserId) {
      fetch(
        "https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/get-goals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserId: UserId }),
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
          setPersonalData(data.results);
          if (data.results && data.results.length > 0) {
            setSelectedGoal(data.results[0].Purpose); // Set the first goal as default
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
    }
  }, [UserId]);

  const handleGoalChange = (e) => {
    setSelectedGoal(e.target.value);
  };

  const handleAmountChange = (e) => {
    setDepositAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGoal) {
      console.error("No goal selected");
      return; // Prevent form submission if no goal is selected
    }

    const submissionData = {
      selectedGoal,
      depositAmount,
      UserId,
    };
    fetch(
      "https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/deposite-goals",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/personal");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.personalcontainer}>
      <h3>Achieve Your Financial Dreams</h3>
      {personalData.length > 0 && (
        <form onSubmit={handleSubmit}>
          <select value={selectedGoal} onChange={handleGoalChange}>
            {personalData.map((goal) => (
              <option key={goal.GoalID} value={goal.Purpose}>
                {goal.Purpose}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Enter deposit amount"
            value={depositAmount}
            onChange={handleAmountChange}
          />
          <button type="submit" disabled={!selectedGoal}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
