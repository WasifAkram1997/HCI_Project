import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import NavbarComponent from "./components/Navbar";
import Homepage from "./components/Homepage";
import Contact from "./components/Contact";
import Payment from "./components/Payment";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <div>
        {user && <NavbarComponent onLogout={handleLogin}/>} {/* Show Navbar after login */}
        <Routes>
          {/* Routes without Navbar (Login, Signup) */}
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          {/* Routes with Navbar */}
          <Route path="/home" element={<Homepage />} />
          <Route path="/leaderboard" element={<h1>Leaderboard</h1>} />
          <Route path="/newsletter" element={<h1>Newsletter</h1>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/scheduler" element={<h1>Scheduler</h1>} />
          <Route path="/payment" element={<Payment />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
