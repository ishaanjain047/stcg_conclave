import "./App.css";
import Homepage from "./components/homepage/homepage.js";
import Login from "./components/login/login.js";
import Register from "./components/register/register.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div>
      <div className="Appcon">
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                user && user._id ? (
                  <Homepage setLoginUser={setLoginUser} />
                ) : (
                  <Login setLoginUser={setLoginUser} />
                )
                // Suppose app start hua npm start se , then setLoginUser is empty object as defined above
              }
            ></Route>
            <Route
              exact
              path="/login"
              element={<Login setLoginUser={setLoginUser} />}
            ></Route>
            <Route exact path="/register" element={<Register />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
