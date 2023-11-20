import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./stylesfolder/Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const userDetails = useSelector((state) => state.auth);
  const username = userDetails.user.Username;
  const UserId = userDetails.user.UserID;

  const navigate = useNavigate();
  const [userAccountDetails, setUserAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const movetoSetGoals = () => {
    navigate("/setFinantialGoal");
  };

  useEffect(() => {
    if (UserId) {
      fetch(
        "https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/getAccountDetailS",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserId }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUserAccountDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setError(error.message);
          setLoading(false);
        });
    } else {
      setError("UserId not found.");
      setLoading(false);
    }
  }, [UserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const account = userAccountDetails?.result?.userDetails;

  return (
    <div className={styles.greeting}>
      <h2> Welcome Back, {username} </h2>
      <p>
        Your financial well-being is our top priority...
        {/* Rest of your welcome message */}
      </p>

      {account && (
        <div className={styles.accountDetails}>
          <h1>Your Account Details</h1>
          <p>
            <strong>Account ID:</strong> {account.AccountID}
          </p>
          <p>
            <strong>User ID:</strong> {account.UserID}
          </p>
          <p>
            <strong>Account Type:</strong> {account.AccountType}
          </p>
          <p>
            <strong>Balance:</strong> ${account.Balance.toFixed(2)}
          </p>
          <p>
            <strong>Date Opened:</strong>{" "}
            {new Date(account.DateOpened).toLocaleDateString()}
          </p>

          <div>
            <h2>Embark on Your Financial Journey</h2>
            <p>
              Take control of your financial future today. Whether you're saving
              for a dream vacation, planning for a comfortable retirement, or
              setting aside funds for a major purchase, our goal-setting tools
              are here to guide you every step of the way. Start by defining
              your financial aspirations, and we'll help you chart a path
              towards achieving them with practical advice and actionable
              insights.
            </p>
            <button onClick={movetoSetGoals}>
              🌟 Set Your Financial Goal Now
            </button>
            <p>
              Begin by establishing a clear and achievable financial target.
              Whether it's big or small, every goal is a stepping stone to
              financial success. Let's get started!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
