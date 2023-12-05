import React, { useState, useEffect } from "react";
import styles from "./stylesfolder/Profile.module.css";
import { useSelector } from "react-redux";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userDetails = useSelector((state) => state.auth);
  const userId = userDetails?.user?.UserID; // Using optional chaining

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setError("No user ID found");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/fetchUsers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div className={styles.dataField}>Loading...</div>;
  if (error) return <div className={styles.dataField}>Error: {error}</div>;
  if (!userData) return <div className={styles.dataField}>No data found</div>;
  console.log(userData);

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXcETXueRkt0LVJJAtiRNYhf3pnj6rFEAiGFlxBeSo&s"
          }
          alt="Profile Avatar"
          className={styles.avatar}
        />
        <h1 className={styles.profileName}>{userData.data.Username}</h1>
        <div className={styles.profileInfo}>
          <p className={styles.profileDetail}>
            <strong>Email:</strong> {userData.data.Email}
          </p>
          <p className={styles.profileDetail}>
            <strong>Phone:</strong> {userData.data.Phone}
          </p>
          <p className={styles.profileDetail}>
            <strong>Address:</strong> {userData.data.Address}
          </p>
        </div>
      </div>
    </div>
  );
}
