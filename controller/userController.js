const pool = require("../db");
const jwt = require("jsonwebtoken");

const createUserTable = (req, res) => {
  const tableExistsQuery = `
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_name = 'user'
        )
      `;

  pool
    .query(tableExistsQuery)
    .then((result) => {
      if (result.rows[0].exists) {
        console.log("Table already exists");
        return Promise.reject("user table already exists");
      } else {
        const userTableQuery = `
              CREATE TABLE "user" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255),
                role VARCHAR(255),
                password VARCHAR(255),
                resetPasswordToken VARCHAR(255),
                resetPasswordExpire VARCHAR(255)
              )
            `;
        return pool.query(userTableQuery);
      }
    })
    .then(() => {
      console.log("User table created");
      res.status(201).send("user table created");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

const handleLogin = (req, res) => {
  const { password, email } = req.body;
  // Mock user
  const user = {
    id: 1,
    username: "seyha",
    email: "seyha@gmail.com",
    password: 123456789,
  };

  if (password === user.password && email === user.email) {
    console.log("Match user");
    jwt.sign({ user: user }, "123", (err, token) => {
      res.json({
        token: token,
      });
    });
  } else {
    console.log("Invalid user");
    res.status(401).json({
      error: "Invalid credentials",
    });
  }
};

module.exports = {
  createUserTable,
  handleLogin,
};
