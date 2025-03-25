import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   setUsername("");
  //   setPassword("");
  //   setError("");
  // }, [])

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        const user = data.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          // onLogin(user);
          // <p>dwadawdwd</p>
          navigate('/home'); // Log in the user
        } else {
          setError("Invalid username or password");
        }
      });
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
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
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
              <Button color="primary" block type="submit" >
                Login
              </Button>
            </Form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
