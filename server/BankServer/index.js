const serverless = require("serverless-http");
const session = require("express-session");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(express.json());

//--------------------------------- Setup CORS options -----------------------------------
const corsOptions = {
  origin: "http://localhost:3000", // replace with your specific domain, or use '*' to allow all domains
  methods: "GET", // replace with the HTTP methods you want to allow
  allowedHeaders: ["Content-Type"], // replace with the headers you want to allow
  credentials: true,
};
app.use(cors(corsOptions));
// --------------------------- End Setting CORS -----------------------------------------

// --------------------------- Creating Session ----------------------------------------
app.use(
  session({
    secret: "Thisissessionsecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60, // Session expires after 1 minute (1000 milliseconds * 60)
      httpOnly: true, // Recommended for security (prevents accessing cookie via client-side JS)
      secure: false, // Set to true if your site is served over HTTPS
    },
  })
);
// --------------------------- End Session ----------------------------------------

// --------------------------- Creating DB POOL ----------------------------------------
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// --------------------------- End DB Pool ----------------------------------------

// ------------------- querying from the pool-------------------------
app.post("/logincheck", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ? and password = ?";
  pool.query(sql, [req.body.userId, req.body.password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      req.session.isAuth = true;
      return res.json({
        Login: true,
        sessionId: req.session.id,
      });
    } else {
      return res.json({ Login: false });
    }
  });
});
// ------------------------ query end --------------------------------------

// --------------------------- Making Session available for Component ----------------------------------------
app.get("/getcomponent", (req, res) => {
  if (req.session.isAuth) {
    return res.json({ valid: true, username: req.session.id });
  } else {
    return res.json({ valid: false });
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
