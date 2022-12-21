const express = require("express");
const router = express.Router();
const { Team } = require("../models/teamModel");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", verifyJWT, async (req, res) => {
  // now middle ware ne data req.team mein send kardia hai
  // console.log(req.team);
  console.log("i am in get team server");
  if (!req.team.name)
    return res.status(400).json({ message: "Team name required." });

  const team = await Team.findOne({ name: req.team.name }).exec();
  // console.log("team is ", team);
  if (!team) {
    return res
      .status(204)
      .json({ message: `No Team found with name ${req.team.name}.` });
  }
  res.json(team);
  // json vaale se 200 aata hai
});

module.exports = router;
