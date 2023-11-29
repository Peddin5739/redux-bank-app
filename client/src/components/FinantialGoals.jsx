import React, { useState } from "react";
import styles from "./stylesfolder/finantialGoals.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FinancialGoals() {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.auth);
  const UserId = userDetails.user.UserID;
  console.log("from Goals", UserId);

  // State to store form data
  const [formData, setFormData] = useState({
    depositAmount: "",
    destinationDate: "",
    monthlyContribution: "",
    purpose: "",
    currentSavings: "",
    incomeSource: "",
    regularExpenses: "",
    goalPriority: "",
    UId: UserId,
  });

  // Handles changes in the form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handles form submission
  const HandleSubmit = (event) => {
    event.preventDefault();

    try {
      // Only format the date if it's a valid, non-empty string
      const formattedDate = formData.destinationDate
        ? new Date(formData.destinationDate).toISOString().split("T")[0]
        : "";

      // Create updated form data with the formatted date
      const updatedFormData = {
        ...formData,
        destinationDate: formattedDate,
      };

      // Fetch request with the updated form data
      fetch(
        "https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/handle-goals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          navigate("/personal");
        })
        .catch((error) => {
          console.error("Error:", error);
          navigate("/personal");
        });
    } catch (error) {
      console.error("Date Formatting Error:", error);
      // Handle the error appropriately
    }
  };

  return (
    <div className={styles["financial-goals-container"]}>
      <form onSubmit={HandleSubmit} className={styles["financial-goals-form"]}>
        {/* Various Input Fields */}
        <div>
          <label htmlFor="depositAmount">Deposit Amount:</label>
          <input
            type="number"
            id="depositAmount"
            name="depositAmount"
            value={formData.depositAmount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="destinationDate">Destination Date:</label>
          <input
            type="date"
            id="destinationDate"
            name="destinationDate"
            value={formData.destinationDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="monthlyContribution">Monthly Contribution:</label>
          <input
            type="number"
            id="monthlyContribution"
            name="monthlyContribution"
            value={formData.monthlyContribution}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="purpose">Purpose:</label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="currentSavings">Current Savings:</label>
          <input
            type="number"
            id="currentSavings"
            name="currentSavings"
            value={formData.currentSavings}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="incomeSource">Income Source:</label>
          <input
            type="text"
            id="incomeSource"
            name="incomeSource"
            value={formData.incomeSource}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="regularExpenses">Regular Expenses:</label>
          <input
            type="number"
            id="regularExpenses"
            name="regularExpenses"
            value={formData.regularExpenses}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="goalPriority">Goal Priority:</label>
          <input
            type="text"
            id="goalPriority"
            name="goalPriority"
            placeholder="High, Medium, Low"
            value={formData.goalPriority}
            onChange={handleChange}
          />
        </div>
        {/* Submit Button */}
        <button type="submit">Submit Goal</button>
      </form>
    </div>
  );
}

export default FinancialGoals;
