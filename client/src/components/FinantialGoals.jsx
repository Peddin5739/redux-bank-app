import React, { useState } from "react";
import styles from "./stylesfolder/finantialGoals.module.css";
import { useSelector } from "react-redux";

function FinancialGoals() {
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

    // Format the destination date
    const formattedDate = new Date(formData.destinationDate)
      .toISOString()
      .split("T")[0];

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
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={HandleSubmit} className={styles["financial-goals-form"]}>
      {/* Input for Deposit Amount */}
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
      {/* Input for Destination Date */}
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
      {/* Input for Monthly Contribution */}
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
      {/* Input for Purpose */}
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
      {/* Input for Current Savings */}
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
      {/* Input for Income Source */}
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
      {/* Input for Regular Expenses */}
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
      {/* Input for Goal Priority */}
      <div>
        <label htmlFor="goalPriority">Goal Priority:</label>
        <input
          type="text"
          id="goalPriority"
          name="goalPriority"
          placeholder="Hig, Medium, Low"
          value={formData.goalPriority}
          onChange={handleChange}
        />
      </div>
      {/* Submit Button */}
      <button type="submit">Submit Goal</button>
    </form>
  );
}

export default FinancialGoals;
