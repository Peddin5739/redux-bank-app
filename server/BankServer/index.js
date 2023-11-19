const serverless = require("serverless-http");
const { handleLogin, testfun } = require("./controlers/authControler");
const { handleAccount } = require("./controlers/accountControler");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
const path = require("path");

//--------------------------------- Setup CORS options -----------------------------------
const corsOptions = {
  origin: ["http://localhost:3000", "*"], // replace with your specific domain, or use '*' to allow all domains
  methods: "*", // replace with the HTTP methods you want to allow
  allowedHeaders: ["*"], // replace with the headers you want to allow
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

// --------------------------- Making Session available for Component ----------------------------------------
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

// ------------------------------ End Component Session ----------------------------------------

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
