import "./App.css";
import Homepage from "./components/homepage/homepage.js";
import Login from "./components/login/login.js";
import Register from "./components/register/register.js";
import Layout from "./components/Layout.js";
import RequireAuth from "./components/RequireAuth.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* we want to protect these routes */}

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path="/stcg" element={<Homepage />} />
              </Route>
            </Route>

            {/* catch all */}
            {/* <Route path="*" element={<Missing />} /> */}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
