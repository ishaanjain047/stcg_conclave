import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/splitxlogin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database connected...");
  }
);

// The above lines of code is always required so remember them , and now a database named splitx login is created

const userSchema = new mongoose.Schema({
  name: String,
  emailofuser: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("My API");
});

// Now we have to basically create routes

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ emailofuser: email }, (err, user) => {
    console.log(user);
    console.log(err);
    // User.findOne is a function provided by mongoose ,
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  User.findOne({ emailofuser: email }, (err, user) => {
    // Find one is a function provided to us by mongoose bro
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        // The above line of code is a new syntax agar schema aur object jo frontend se aaya unki property same hai toh
        emailofuser: email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

app.listen(9002, () => {
  console.log("Backend started at port 9002");
});
// Now tera backend start ho gyaa 9002 port par and database hai 27002 port par , basically teri API is at 9002 and tera frontend is at 3000
