import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const [password, setPassword] = useState("");
  const[firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [studentId, setStudentId] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault();
  
    // Fetch existing users from the server to check for duplicates
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        // Check if a user with the same studentId or email already exists
        const userExists = data.some(
          (user) => user.studentId === studentId || user.email === email
        );
  
        if (userExists) {
          alert("A user with the same student ID or email already exists.");
          return; // Exit the function if a duplicate user is found
        }

        const score = 0;
        const events = [];
  
        // If no duplicate, proceed with creating the new user
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, studentId, email, contact, password, score, events }), // Add other fields as needed
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("User created", data);
            alert("Account created successfully!");
            navigate("/")
          })
          .catch((error) => {
            console.error("Error creating account", error);
            setError("Error creating account");
          });
      })
      .catch((error) => {
        console.error("Error fetching users", error);
        setError("Error checking if user exists");
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md="6" className="mx-auto">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Signup</h2>
            {error && <Alert color="danger">{error}</Alert>}
            <Form onSubmit={handleSignup}>
              <div className="d-flex flex-row justify-content-around">
              <FormGroup>
                <Label for="First Name">First Name</Label>
                <Input
                  type="text"
                  id="fname"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup >
                <Label for="lastname">Last Name</Label>
                <Input
                  type="text"
                  id="lastname"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </FormGroup>
              </div>
              <div className="d-flex flex-row justify-content-around">
              <FormGroup className="">
                <Label for="id">Student Id</Label>
                <Input
                  type="text"
                  id="id"
                  placeholder="Enter Student Id"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="">
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              </div>
              <div className="d-flex flex-row justify-content-around">
              <FormGroup className="">
                <Label for="contact">Contact Number</Label>
                <Input
                  type="text"
                  id="contact"
                  placeholder="Enter Contact Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="">
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
              </div>
           
             
              <Button color="primary" block type="submit">
                Signup
              </Button>
            </Form>
            <p className="text-center mt-3">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
