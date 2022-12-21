const express = require("express");
const Joi = require("joi");
const { Team } = require("../models/teamModel");
const _ = require("lodash");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const teamNameSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(5).max(1024).required(),
  refreshToken: Joi.string(),
});

router.post("/", async (req, res) => {
  const { error, value } = teamNameSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let team = await Team.findOne({ name: req.body.name });
  if (!team) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, team.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");
  const accessToken = jwt.sign({ name: team.name }, "conclaveprivatekey", {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign({ name: team.name }, "conclaveprivatekey", {
    expiresIn: "100s",
  });
  team.refreshToken = refreshToken;
  const result = await team.save();

  // Creates Secure Cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 100 * 1000,
  });

  // Send authorization roles and access token to user
  res.send({ accessToken });

  // Note : Refresh token was only saved to your backend , frontend ko sirf access token bheja axios ko
});

module.exports = router;
