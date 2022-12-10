const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const teamlogin = require("./routes/teamlogin.js");
const teamregister = require("./routes/teamregister.js");
const quiz = require("./routes/quiz.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/quiz", quiz);
app.use("/api/registerteam", teamregister);
app.use("/api/enterevent", teamlogin);

mongoose
  .connect("mongodb://localhost:27017/STCG", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to STCG Database..."))
  .catch((err) => console.log("Couldnt connect", err));

const port = process.env.PORT || 9002;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
