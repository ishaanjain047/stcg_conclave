import React, { useEffect, useState } from "react";
import "./homepage.css";
import Timer from "../Timer/Timer.js";
import Questions from "../Questions/Questions.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const TEAM_URL = "/api/quiz";

const Homepage = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [teamname, setTeamName] = useState("bsdk");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    // axiosPrivate se bheji get request so that you can also send JWT to verify to backend
    const getTeam = async () => {
      try {
        const response = await axiosPrivate.get(TEAM_URL, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setTeamName(response.data.name);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getTeam();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="homepage">
      <h1>`Lets start Seek the Civil Geek ${teamname}`</h1>
      <Timer></Timer>
      <Questions></Questions>
      <div className="button">End Test</div>
    </div>
  );
};

export default Homepage;
