import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

const LOGIN_URL = "/api/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // const from = location.state?.from?.pathname || "/";
  const from = location.state?.from?.pathname || "/stcg";

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ name, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      setAuth({ name, password, accessToken });
      // navigate("/stcg");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="login">
      <h1>Seek the Civil Geek</h1>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your Team Name"
      ></input>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your Password"
      ></input>
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/register")}>
        Register
      </div>
      <div className="persistCheck">
        <input
          type="checkbox"
          id="persist"
          onChange={togglePersist}
          checked={persist}
        />
        <label htmlFor="persist">Trust This Device</label>
      </div>
    </div>
  );
};

export default Login;
