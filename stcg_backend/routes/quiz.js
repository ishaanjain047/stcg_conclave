const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Lets start quiz");
});

module.exports = router;
