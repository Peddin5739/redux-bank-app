import React, { useState } from "react";
import styles from "./stylesfolder/register.module.css"; // Importing external CSS

function Register() {
  const [formData, setFormData] = useState({
    Username: "",
    Pass: "",
    ConfirmPass: "",
    Email: "",
    Phone: "",
    Address: "",
    UserType: "Customer",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.Pass !== formData.ConfirmPass) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError(""); // Clear error message
    submitUserData(formData);
  };

  const submitUserData = (userData) => {
    // Logic to submit user data (e.g., HTTP POST request)
    console.log("Submitting User Data:", userData);
    fetch(
      "https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/register-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Typically lowercase
        },
        body: JSON.stringify(userData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Ensure you return this promise
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error); // Using console.error for error logging
      });
  };

  return (
    <div className={styles["registration-form-container"]}>
      <h2>Register to open a Bank Account in NKP-Bank</h2>
      <form onSubmit={handleSubmit} className={styles["registration-form"]}>
        <input
          type="text"
          name="Username"
          className={styles["form-input"]}
          value={formData.Username}
          onChange={handleChange}
          placeholder="Username"
        />

        <input
          type="email"
          name="Email"
          className={styles["form-input"]}
          value={formData.Email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="password"
          name="Pass"
          className={styles["form-input"]}
          value={formData.Pass}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="ConfirmPass"
          className={styles["form-input"]}
          value={formData.ConfirmPass}
          onChange={handleChange}
          placeholder="Confirm Password"
        />

        <input
          type="tel"
          name="Phone"
          className={styles["form-input"]}
          value={formData.Phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <textarea
          name="Address"
          className={styles["form-input"]}
          value={formData.Address}
          onChange={handleChange}
          placeholder="Address"
        />
        <select
          name="UserType"
          className={styles["form-input"]}
          value={formData.UserType}
          onChange={handleChange}
        >
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>
        {passwordError && (
          <div className={styles["error-message"]}>{passwordError}</div>
        )}
        <button type="submit" className={styles["submit-button"]}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
