import React from "react";
import "./homepage.css";
import Timer from "../Timer/Timer.js";
import Questions from "../Questions/Questions.js";

const Homepage = ({ setLoginUser }) => {
  return (
    <div className="homepage">
      <h1>Lets start Seek the Civil Geek</h1>
      <Timer></Timer>
      <Questions></Questions>
      <div className="button" onClick={() => setLoginUser({})}>
        Logout
      </div>
    </div>
  );
};

export default Homepage;
