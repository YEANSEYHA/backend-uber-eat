const express = require("express");
const app = express();
// change to port 3000
const port = 3001;

app.use(express.json());

const categoriesRoutes = require("./routes/categoryRoute");
const authRoutes = require("./routes/auth");

const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    // next middle ware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

app.use("/api/v1/uber/category", verifyToken, categoriesRoutes);
app.use("/api/v1/uber/user", authRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
