import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert, Toast, ToastBody, ToastHeader, Spinner } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Toaster from "./Toaster";

const Signup = ({ setLocation, onSignup, user, setUser }) => {
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [plan ,setPlan] = useState({planName: "", price: 0})
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [formErrors, setFormErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    studentIdError: "",
    emailError: "",
    contactError: "",
    passwordError: "",
    confirmpassError: "",
  });

  const navigate = useNavigate();



  useEffect(() => {
    setLocation("/signup");
  }, []);

   // Function to handle the plan selection
   const handleSelect = (event) => {
    const selectedValue = event.target.value;

    // Setting the plan name and corresponding price
    let planName = '';
    let price = 0;

    switch (selectedValue) {
      case 'Bi-weekly':
        planName = 'Bi-weekly';
        price = 25;
        break;
      case 'Monthly':
        planName = 'Monthly';
        price = 50;
        break;
      case 'Yearly':
        planName = 'Yearly';
        price = 420;
        break;
      default:
        planName = '';
        price = 0;
    }

    // Update the state with the selected plan and price
    setPlan({ planName, price });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true)
    setTimeout(() => {
      if (Object.values(formErrors).some((error) => error !== "")) {
        setError("Please fix the errors in the form.");
        return;
      }
  
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

           // Create the new user instance with all form data
        const newUser = {
          firstName,
          lastName,
          studentId,
          email,
          contact,
          password,
          score: 50, // Default score for the new user
          events: [], // Default events array
          plan: plan.planName,
          amount: plan.price
        };

        setUser(newUser)
        navigate("/paymentfirsttime")

  
          // const score = 50;
          // const events = [];
  
          // If no duplicate, proceed with creating the new user
          // fetch("http://localhost:5000/users", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({ firstName, lastName, studentId, email, contact, password, score, events }), // Add other fields as needed
          // })
          //   .then((response) => response.json())
          //   .then((data) => {
          //     console.log("User created", data);
          //     // alert("Account created successfully!");
          //     setShowToast(true); // Show success toast
          //     setTimeout(() => {
          //       setShowToast(false);
          //       onSignup(data)
          //       navigate("/");
          //        // Redirect after a successful login
          //     }, 1000); // Hide toast after 3 seconds
              
          //   })
          //   .catch((error) => {
          //     console.error("Error creating account", error);
          //     setError("Error creating account");
          //   });
        })
        .catch((error) => {
          console.error("Error fetching users", error);
          setError("Error checking if user exists");
        });
    }, 1000)

   
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    // Updated regex to allow letters and spaces, with a maximum length of 20 characters
    if (/^[A-Za-z\s]*$/.test(value) && value.length <= 20) {
      setFirstName(value);
      setFormErrors({ ...formErrors, firstNameError: "" });
    } else {
      setFormErrors({ ...formErrors, firstNameError: "First name can only contain letters and spaces, and be 20 characters long." });
    }
  };
  
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    // Updated regex to allow letters and spaces, with a maximum length of 20 characters
    if (/^[A-Za-z\s]*$/.test(value) && value.length <= 20) {
      setLastName(value);
      setFormErrors({ ...formErrors, lastNameError: "" });
    } else {
      setFormErrors({ ...formErrors, lastNameError: "Last name can only contain letters and spaces, and be 20 characters long." });
    }
  };

  const handleStudentIdChange = (e) => {
    const value = e.target.value;
    if(/^\d*$/.test(value)){
      setStudentId(value);
    }
    
    // Enforce exactly 8 digits
    if (value.length == 8) {
      // setStudentId(value);
      setFormErrors({ ...formErrors, studentIdError: "" });
    } else {
      setFormErrors({ ...formErrors, studentIdError: "Student ID must be exactly 8 digits long." });
    }
  };

  // const handleStudentIdChange = (e) => {
  //   // Allow only numbers and ensure the length is exactly 8
  //   const value = e.target.value;

  //   if (/^\d{0,9}$/.test(value)) {
  //     setStudentId(value);
  //   }
  // };

  const handleContactChange = (e) => {
    const value = e.target.value;
    
    if(/^\d*$/.test(value)){
      setContact(value);
    }
    
  
    // Check if the first 3 digits are 514 or 438
    if(value.length >= 3){
      if (/^(514|438)/.test(value)) {
        // Check if there are exactly 10 digits in total
        if (value.length === 10 && /^\d{10}$/.test(value)) {
          setFormErrors({ ...formErrors, contactError: "" });
        } else {
          setFormErrors({ ...formErrors, contactError: "Contact number must be exactly 10 digits long." });
        }
      } else {
        setFormErrors({ ...formErrors, contactError: "Contact number must start with 514 or 438." });
      }
    }else{
      setFormErrors({ ...formErrors, contactError: "" });
    }
   
  };
  

  // const handleContactChange = (e) => {
  //   const value = e.target.value;
  //   // Regular expression to ensure the contact number starts with 514 or 438 and is 10 digits long
  //   if (/^(514|438)\d{7}$/.test(value)) {
  //     setContact(value);
  //   }
  // };
  

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length >= 6) {
      setFormErrors({ ...formErrors, passwordError: "" });
    } else {
      setFormErrors({ ...formErrors, passwordError: "Password must be at least 6 characters long." });
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPass(value);
    if (value === password) {
     
      setFormErrors({ ...formErrors, confirmpassError: "" });
    } else {
      setFormErrors({ ...formErrors, confirmpassError: "Password fields don't match" });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md="6" className="mx-auto">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Signup</h2>
            {error && <Alert color="danger">{error}</Alert>}
            <Form onSubmit={handleSignup}>
              {/* <div className="d-flex flex-row justify-content-around"> */}
                <FormGroup>
                  <Label for="FirstName">First Name</Label>
                  <Input
                    type="text"
                    id="fname"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                  />
                  {formErrors.firstNameError && <Alert color="danger">{formErrors.firstNameError}</Alert>}
                </FormGroup>
                <FormGroup>
                  <Label for="LastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lname"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                  />
                  {formErrors.lastNameError && <Alert color="danger">{formErrors.lastNameError}</Alert>}
                </FormGroup>
              {/* </div> */}

              {/* <div className="d-flex flex-row justify-content-around"> */}
                <FormGroup>
                  <Label for="StudentId">Student ID</Label>
                  <Input
                    type="text"
                    id="studentId"
                    placeholder="Enter Student Id"
                    value={studentId}
                    onChange={handleStudentIdChange}
                    required
                    maxLength="8"
                  />
                   {/* Optional: You can show a message when the length is not 8 */}
                  {formErrors.studentIdError && <Alert color="danger">{formErrors.studentIdError}</Alert>}
                </FormGroup>
                <FormGroup>
                  <Label for="Email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {formErrors.emailError && <Alert color="danger">{formErrors.emailError}</Alert>}
                </FormGroup>
              {/* </div> */}

              {/* <div className="d-flex flex-row justify-content-around"> */}
                <FormGroup>
                  <Label for="Contact">Contact Number</Label>
                  <Input
                    type="text"
                    id="contact"
                    placeholder="Enter Contact Number"
                    value={contact}
                    onChange={handleContactChange}
                    required
                    maxLength={10}
                  />
                  {/* {contact.length !== 10 && contact.length > 0 && <Alert color="danger">Contact number must start with either 514 or 438 and be of 10 digits long</Alert>} */}
                  {formErrors.contactError && <Alert color="danger">{formErrors.contactError}</Alert>}
                </FormGroup>
                <FormGroup>
                  <Label className="w-100" for="Plan">Plan</Label>
                  <div className="border rounded px-1 py-2">
                    <select value={plan.planName} onChange={handleSelect} className="border-0 w-100" required style={{
                    border: 'none', // Ensure no border
                    outline: 'none', // Remove outline that may reappear
                    }}>
                      <option value="" disabled>Select an option</option>
                      <option value="Bi-weekly">Bi-weekly($25)</option>
                      <option value="Monthly">Monthly($50)</option>
                      <option value="Yearly">Yearly($420)</option>
                    </select>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label for="Password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {formErrors.passwordError && <Alert color="danger">{formErrors.passwordError}</Alert>}
                </FormGroup>

                <FormGroup>
                  <Label for="Password">Confirm Password</Label>
                  <Input
                    type="password"
                    id="confirmpassword"
                    placeholder="Enter password again"
                    value={confirmpass}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  {formErrors.confirmpassError && <Alert color="danger">{formErrors.confirmpassError}</Alert>}
                </FormGroup>
              {/* </div> */}

              <div className="d-flex flex-row justify-content-center">
                <Button color="primary" type="submit" disabled={Object.values(formErrors).some((error) => error !== "")}>
                {loading ? <Spinner size="sm" /> : "Singup"}
                </Button>
              </div>
            </Form>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </Col>
      </Row>
       {/* Toast for successful login */}
       {showToast && (
       <Toaster message="Account created" title="Sign Up Confirmation" />
      )}


      
    </Container>
  );
};

export default Signup;
