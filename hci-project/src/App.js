import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/SignUp";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <div>
      <h1>Welcome to the User Authentication App</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
        </div>
      ) : (
        <div>
          <Login onLogin={handleLogin} />
          <Signup />
        </div>
      )}
    </div>
  );
};

export default App;
