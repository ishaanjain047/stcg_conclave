const express = require("express");
const Joi = require("joi");
const { Team } = require("../models/teamModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const teamNameSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(5).max(1024).required(),
});

router.post("/", async (req, res) => {
  const { error, value } = teamNameSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let team = await Team.findOne({ name: req.body.name });
  if (team) return res.status(400).send("Team already registered.");

  team = new Team({
    name: req.body.name,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  team.password = await bcrypt.hash(team.password, salt);
  await team.save();
  const token = jwt.sign({ _id: team.id }, "civilconclavewebdprivate");
  console.log(team);
  res.header("x-auth-token", token).send(_.pick(team, ["_id", "name"]));
});

module.exports = router;
