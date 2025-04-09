import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert, Toast, ToastHeader, ToastBody, Spinner } from "reactstrap";
import showSuccessToast from "../lib/showSuccessToast";
import Toaster from "./Toaster";

const Login = ({ onLogin, setLocation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setUsername("");
    setPassword("");
    setError("");
    setLocation("/login");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when login is pressed
    

    // Simulate delay (e.g., to show spinner)
    setTimeout(() => {
      fetch("http://localhost:5000/users")
        .then((response) => response.json())
        .then((data) => {
          const user = data.find(
            (user) => user.studentId === username && user.password === password
          );
          setLoading(false);
          // toast.success("Log in successful")
          // showSuccessToast("Log in succesful");
           // Stop loading when response is received

          if (user) {
            
            
            setShowToast(true); // Show success toast
            setTimeout(() => {
              setShowToast(false);
              
              onLogin(user);
              window.history.pushState(null, "", "/");
              window.history.pushState(null, "", "/");
              window.history.pushState(null, "", "/");
              window.history.pushState(null, "", "/");
              window.history.pushState(null, "", "/");
              window.history.pushState(null, "", "/");
              window.history.pushState(null, "", "/");
              window.history.pushState(null, "", "/");
            navigate("/");
               // Redirect after a successful login
            }, 1000); // Hide toast after 3 seconds
          } else {
            setError("Invalid username or password");
          }
        })
        .catch((error) => {
          setLoading(false); // Stop loading if there's an error
          setError("Something went wrong. Please try again.");
        });
    }, 1000); // Simulate 1 second delay
  };

  const handleUsernameChange = (e) => {
    // Allow only numbers and ensure the length is exactly 8
    const value = e.target.value;

    if (/^\d{0,9}$/.test(value)) {
      setUsername(value);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md="6" className="mx-auto">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert color="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label for="username">Student ID</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Enter student ID (8 digits)"
                  value={username}
                  onChange={handleUsernameChange}
                  maxLength={8}
                  required
                />
                {/* Optional: You can show a message when the length is not 8 */}
                {username.length !== 8 && username.length > 0 && (
                  <Alert color="danger">Student Id must be 8 digits long</Alert>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <div className="d-flex flex-row justify-content-center">
                <Button color="primary" type="submit" disabled={username.length !== 8 || loading}>
                  {loading ? <Spinner size="sm" /> : "Login"}
                </Button>
              </div>
           
            </Form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </Col>
      </Row>
      
      {/* Toast for successful login */}
      {showToast && (
        // <div className="position-fixed top-0 end-0 p-3 rounded">
        //   <Toast>
        //     <ToastHeader icon="success"></ToastHeader>
        //     <ToastBody>Logged in successfully!</ToastBody>
        //   </Toast>
        // </div>
        <Toaster message = "Logged in" title="Log in confirmation" />
      )}
      
    </Container>
  );
};

export default Login;
