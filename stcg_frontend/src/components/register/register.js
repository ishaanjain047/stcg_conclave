import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [team, setTeam] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam({
      ...team,
      [name]: value,
    });
  };

  const register = () => {
    const { name, password } = team;
    console.log("team is ", team);
    if (name && password) {
      axios.post("http://localhost:9002/api/registerteam", team).then((res) => {
        console.log(res);
        navigate("/login");
      });
    } else {
      alert("Please enter Valid Input details");
    }
  };

  return (
    <div className="register">
      {console.log("Team is ", team)}
      <h1>Welcome to Seek the Civil Geek by Civil Conclave</h1>
      <br />
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={team.name}
        placeholder="Enter Team Name"
        onChange={handleChange}
      ></input>
      {/* <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleChange}
      ></input> */}
      <input
        type="password"
        name="password"
        value={team.password}
        placeholder="Your Password"
        onChange={handleChange}
      ></input>
      {/* <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-enter Password"
        onChange={handleChange}
      ></input> */}
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <button className="button" onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
};

export default Register;
