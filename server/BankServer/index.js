const serverless = require("serverless-http");
const { handleLogin } = require("./controlers/authControler");
const { handleAccount } = require("./controlers/accountControler");
const { insertFixedDeposite } = require("./controlers/handelFDControler.js");
const {
  sendmoney,
  getTransactions,
} = require("./controlers/handelTransactions");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
const path = require("path");

const {
  handleGoals,
  getGoals,
  depositeTowardsGoal,
} = require("./controlers/finantialGoalsControler");
const {
  handleRegister,
  createAccount,
} = require("./controlers/registerControler");

//--------------------------------- Setup CORS options -----------------------------------
const corsOptions = {
  origin: "*", // Allows all origins
  methods: "*", // Allows all HTTP methods
  allowedHeaders: "*", // Allows all headers
};

app.use(cors(corsOptions));
// --------------------------- End Setting CORS -----------------------------------------

// ------------------- Checking the user -------------------------
app.post("/logincheck", async (req, res) => {
  try {
    // Await the result of handleLogin
    const result = await handleLogin(req.body.userId, req.body.password);
    res.json(result); // Send the result as the response
  } catch (error) {
    // Handle any errors that might occur
    res.status(500).json({ error: error.message });
  }
});
// ------------------------ query end --------------------------------------

// --------------------------- getting account details----------------------------------------
app.post("/getAccountDetails", async (req, res) => {
  const UserId = req.body.UserId;
  try {
    // Await the result of handleLogin
    const result = await handleAccount(UserId);
    res.status(200).send({ result: result }); // Send the result as the response
  } catch (error) {
    // Handle any errors that might occur
    res.status(500).send({ errormsg: error });
  }
});

// ------------------------------ End Getting account details----------------------------------------

//------------------------------ Register User --------------------------------------------------

app.post("/register-user", (req, res) => {
  const formData = req.body;

  handleRegister(formData)
    .then((registerResult) => {
      // Registration successful, now proceed to create an account
      return createAccount(formData).then((accountResult) => {
        // Both registration and account creation are successful
        return { registerResult, accountResult };
      });
    })
    .then((results) => {
      // Send a successful response back to the client
      res.status(200).json({
        message: "Registered successfully and account created",
        data: results,
      });
    })
    .catch((error) => {
      // Send an error response back to the client
      res.status(500).json({
        message: "Error during registration or account creation",
        error: error.message,
      });
    });
});

//----------------------------- End Register User ---------------------------------------------

// -------------------------------- Goals ----------------------

// POST route to handle goals
app.post("/handle-goals", (req, res) => {
  const formData = req.body;

  handleGoals(formData)
    .then((result) => {
      // Send a successful response back to the client
      res.status(200).json({
        message: "Goal handled successfully",
        data: result,
      });
    })
    .catch((error) => {
      // Send an error response back to the client
      res.status(500).json({
        message: "Error handling goal",
        error: error,
      });
    });
});

// -------------------------- End Goals--------------------------

//------------------------------- Getting Goals -----------------------------------
// POST route to handle getting financial goals
app.post("/get-goals", (req, res) => {
  const UserId = req.body.UserId; // Extract UserId from request body

  getGoals(UserId)
    .then((data) => {
      // Sending back the queried data as a JSON response
      res.status(200).json(data);
    })
    .catch((error) => {
      // Handling errors, such as database connection issues
      res.status(500).json({ success: false, error: error.message });
    });
});

//-------------------------End Getting Goals -----------------------------------

//---------------------- Goals Deposite ----------------------------------
app.post("/deposite-goals", (req, res) => {
  const submitdata = req.body;

  depositeTowardsGoal(submitdata)
    .then((data) => {
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error.message });
    });
});

// --------------------- End Goals Deposite -------------------------------------
// ---------------- Transfer Money -----------------------------
app.post("/sendmoney", async (req, res) => {
  try {
    const formData = req.body;
    await sendmoney(formData);
    res.status(200).send("Transaction completed successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred in the transaction process.");
  }
});
//--------------- End Transfer Money----------------------------------

// ------------------------ Get Transactions ----------------------

app.post("/getTransactions", async (req, res) => {
  try {
    const userId = req.body.userId;
    const transactions = await getTransactions(userId);
    res.status(200).json(transactions);
  } catch (err) {
    // Combining the error message and the error object into one response
    res.status(500).json({
      message: "An error occurred while fetching transactions",
      error: err.message,
    });
  }
});

//------------------------- End get Transactions -----------------

// ----------------------- insert FDS -------------------

app.post("/insertFDS", async (req, res) => {
  try {
    const formdata = req.body.formdata;
    const insertResults = await insertFixedDeposite(formdata);
    res.status(200).json({ message: "Money Deposited to Banks FD Scheme" });
  } catch (err) {
    res.status(500).json({ message: "error doing the fixed deposite to bank" });
  }
});

// ---------------------- End FDS---------------------

app.get("/", (req, res, next) => {
  console.log(process.env.MYSQL_HOST);
  return res.status(200).json({
    message: "Hello from root!",
    path: pool.host,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
