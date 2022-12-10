const express = require("express");
const Joi = require("joi");
const { Team } = require("../models/teamModel");
const _ = require("lodash");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const teamNameSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(5).max(1024).required(),
});

router.post("/", async (req, res) => {
  const { error, value } = teamNameSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let team = await Team.findOne({ name: req.body.name });
  if (!team) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, team.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");
  const token = jwt.sign({ _id: team.id }, "civilconclavewebdprivate");
  res.header("x-auth-token", token).send(_.pick(team, ["_id", "name"]));
});

module.exports = router;
