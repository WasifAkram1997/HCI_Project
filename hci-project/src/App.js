import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js';
import {
 Elements
} from '@stripe/react-stripe-js';
import Login from "./components/Login";
import Signup from "./components/SignUp";
import NavbarComponent from "./components/Navbar";
import Homepage from "./components/Homepage";
import Contact from "./components/Contact";
import Payment from "./components/Payment";
import Leaderboard from "./components/Leaderboard";
import CalendarTrial from "./components/CalendarTrial";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CheckoutForm from "./components/Stripe";


const App = () => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState()
  

  const handleLogin = (user) => {
    setUser(user);
  };

  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};


 


  useEffect(() => {
    setLocation(window.location.pathname)
  }, [window.location.pathname])



  console.log(user)
  console.log(location)


  return (
    <>
    <Router>
      <>
        {/* Always render Navbar on Homepage */}
        {/* {window.location.pathname !== "/login" && window.location.pathname !== "/signup" && (
          <NavbarComponent onLogout={handleLogin} user={user} />
        )} */}

        

        {
          location == '/' || user ? (<NavbarComponent onLogout={handleLogin} user={user} />) : <></>
        }
        
        <Routes>
          {/* Routes without Navbar (Login, Signup) */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} setLocation={setLocation}/>} />
          <Route path="/signup" element={<Signup setLocation={setLocation} onSignup={handleLogin}/>} />

          {/* Routes with Navbar, only if the user is logged in */}
          <Route path="/leaderboard" element={  <Leaderboard user={user} /> } />
          <Route path="/newsletter" element={ <Newsletter /> } />
          <Route path="/contact" element={ <Contact />} />
          <Route path="/scheduler" element={ <CalendarTrial user={user} setUser={setUser} /> } />
          <Route path="/payment" element={  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm />
  </Elements> } />
        </Routes>
        {
          location == '/' || user ? (<Footer />) : <></>
        }
        
        
      </>
    </Router>
   
    </>
  );
};

export default App;
