const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const teamlogin = require("./routes/teamlogin.js");
const teamregister = require("./routes/teamregister.js");
const refresh = require("./routes/refresh.js");
const quiz = require("./routes/quiz.js");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const app = express();
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// app.use(cors());
// now cors nhi aaega coz in frontend withCredentials is true

app.use(express.json());
//middleware for cookies
app.use(cookieParser());
app.use("/api/register", teamregister);
app.use("/api/auth", teamlogin);
app.use("/api/refresh", refresh);
//  Now need to verify JWT for the below route only , plaed before them , quiz cant start if person is not logged in
app.use(verifyJWT);
app.use("/api/quiz", quiz);

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
