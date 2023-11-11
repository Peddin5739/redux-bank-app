const serverless = require("serverless-http");
const session = require("express-session");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const path = require("path");
app.use(express.json());
app.use(
  session({
    secret: "Thisissessionsecretkey",
  })
);
// Setup CORS options
const corsOptions = {
  origin: "*", // replace with your specific domain, or use '*' to allow all domains
  methods: "GET", // replace with the HTTP methods you want to allow
  allowedHeaders: ["Content-Type"], // replace with the headers you want to allow
};
app.use(cors(corsOptions));

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/data", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: results });
  });
});

app.post("/logincheck", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ? and password = ?";
  // ------------------- querying from the pool-------------------------
  pool.query(sql, [req.body.id, req.body.password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      return res.json({ Login: true });
    } else {
      return res.json({ Login: false });
    }
  });
  // ------------------------ query end --------------------------------------
});

app.get("/", (req, res, next) => {
  console.log(process.env.MYSQL_HOST);
  return res.status(200).json({
    message: "Hello from root!",
    path: pool.host,
  });
});

app.get("/path", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/files/loginsuccess.html"));
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
