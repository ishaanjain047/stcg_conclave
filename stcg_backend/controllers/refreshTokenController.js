const { Team } = require("../models/teamModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(req.cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  const foundUser = await Team.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, "conclaveprivatekey", (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          name: decoded.name,
        },
      },
      "conclaveprivatekey",
      { expiresIn: "10s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
