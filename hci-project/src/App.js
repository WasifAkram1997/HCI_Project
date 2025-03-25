import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import NavbarComponent from "./components/Navbar";
import Homepage from "./components/Homapage";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <div>
        {/* {user ? ( */}
          {/* <div> */}
            {/* <NavbarComponent /> Show Navbar after login */}
            <Routes>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/leaderboard" element={<h1>Leaderboard</h1>} />
              <Route path="/newsletter" element={<h1>Newsletter</h1>} />
              <Route path="/contact" element={<h1>Contact Us</h1>} />
              <Route path="/scheduler" element={<h1>Scheduler</h1>} />
              <Route path="/payment" element={<h1>Payment</h1>} />
              <Route path="/logout" element={<Login />} />
            </Routes>
          {/* </div> */}
        {/* // ) : (
        //   <Routes>
         
        //   </Routes>
        // )} */}
      </div>
    </Router>
  );
};

export default App;
