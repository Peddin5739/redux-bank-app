import React, { useState } from "react";
import styles from "./stylesfolder/Business.module.css"; // Import the CSS module
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Business() {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.auth);
  const UserId = userDetails.user.UserID;
  console.log("from Busciness", UserId);

  const viewfd = () => {
    navigate("/DisplayFD");
  };

  // State variables for Fixed Deposit
  const [fdAmount, setFdAmount] = useState("");
  const [fdMaturityDate, setFdMaturityDate] = useState("");
  const [fdStartDate, setFdStartDate] = useState(
    new Date().toLocaleDateString()
  ); // New state variable for FD Start Date

  // State variables for Loan
  const [loanAmount, setLoanAmount] = useState("");
  const [loanType, setLoanType] = useState("home");
  const [loanStartDate, setLoanStartDate] = useState(
    new Date().toLocaleDateString()
  ); // New state variable for Loan Start Date

  //-------------------------------------------------------- Fixed Deposit form submission handler
  const handleFdSubmit = (e) => {
    e.preventDefault();
    const formdata = {
      Amount: parseFloat(fdAmount),
      InterestRate: 8.0, // Assuming a fixed interest rate
      StartDate: fdStartDate,
      MaturityDate: fdMaturityDate,
      UserId: UserId,
    };
    console.log("Fixed Deposit Data:", JSON.stringify(formdata));

    fetch("https://9qdlu2q5gk.execute-api.us-east-2.amazonaws.com/insertFDS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formdata: formdata }),
    })
      .then((data) => {
        //sfsfd
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/DisplayFD");
  };

  // ---------------------------------------  Loan form submission handler
  const handleLoanSubmit = (e) => {
    e.preventDefault();
    const loanDueDate = new Date();
    loanDueDate.setFullYear(loanDueDate.getFullYear() + 1);
    const loanFormData = {
      Amount: parseFloat(loanAmount),
      InterestRate: 0, // Set based on loan type
      StartDate: loanStartDate,
      DueDate: loanDueDate.toLocaleDateString(),
      Status: "Active",
      LoanType: loanType,
    };
    console.log("Loan Data:", JSON.stringify(loanFormData));
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1>Fixed Deposit and Loan Form</h1>
        <div className={styles.section}>
          <h2>Fixed Deposit In Bank</h2>
          <form onSubmit={handleFdSubmit} className={styles.form}>
            <div>
              <label>
                Amount:
                <input
                  type="number"
                  step="0.01"
                  value={fdAmount}
                  onChange={(e) => setFdAmount(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Maturity Date:
                <input
                  type="date"
                  value={fdMaturityDate}
                  onChange={(e) => setFdMaturityDate(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Start Date:
                <input
                  type="date"
                  value={fdStartDate}
                  onChange={(e) => setFdStartDate(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit">Submit FixedDeposit</button>
            <button type="submit" onClick={viewfd}>
              View Your FixedDeposi
            </button>
          </form>
        </div>
        <div className={styles.section}>
          <h2>Loan</h2>
          <form onSubmit={handleLoanSubmit} className={styles.form}>
            <div>
              <label>
                Amount:
                <input
                  type="number"
                  step="0.01"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Loan Type:
                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                >
                  <option value="home">Home Loan</option>
                  <option value="vehicle">Vehicle Loan</option>
                  <option value="personal">Personal Loan</option>
                  <option value="educational">Educational Loan</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Start Date:
                <input
                  type="date"
                  value={loanStartDate}
                  onChange={(e) => setLoanStartDate(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit">Submit Loan Request</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Business;
