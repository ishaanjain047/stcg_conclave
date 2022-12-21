const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader is", authHeader);
  if (!authHeader) return res.sendStatus(401);
  // Bearer token
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");
  jwt.verify(token, "conclaveprivatekey", (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.team = decoded;
    console.log("req.team is ", req.team);
    next();
  });
};

module.exports = verifyJWT;
