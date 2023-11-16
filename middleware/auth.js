const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new Error("Unauthorized"));
  }

  try{
    const decoded = jwt.verify(token, "123")
    console.log("Log decode",decoded)
  }

};
