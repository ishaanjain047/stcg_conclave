const mongoose = require("mongoose");
const Joi = require("joi");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  refreshToken: String,
});

const Team = mongoose.model("Teams", teamSchema);

module.exports.Team = Team;
