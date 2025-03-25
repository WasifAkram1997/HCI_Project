import React, { useState } from "react";
import { Button, Form, Spinner, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2025");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handlePayment = () => {
    if (
      !cardNumber ||
      !expiryMonth ||
      !expiryYear ||
      !cvv ||
      !month ||
      !year
    ) {
      alert("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 2000); // Simulate a delay for the payment process
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Payment</h2>
      <Form>
        <Form.Group controlId="monthSelect">
          <Form.Label>Month</Form.Label>
          <Form.Control
            as="select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option value="">Select Month</option>
            {Array.from({ length: 12 }, (_, i) => {
              const monthName = new Date(0, i).toLocaleString('en', { month: 'long' });
              return (
                <option key={i} value={i + 1}>
                  {monthName}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="yearSelect">
          <Form.Label>Year</Form.Label>
          <Form.Control
            as="select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            disabled
          >
            <option value="2025">2025</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="cardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number"
            required
          />
        </Form.Group>

        <div className="row">
          <div className="col">
            <Form.Group controlId="expiryMonth">
              <Form.Label>Expiry Month</Form.Label>
              <Form.Control
                type="text"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                placeholder="MM"
                required
              />
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group controlId="expiryYear">
              <Form.Label>Expiry Year</Form.Label>
              <Form.Control
                type="text"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                placeholder="YYYY"
                required
              />
            </Form.Group>
          </div>
        </div>

        <Form.Group controlId="cvv">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="Enter CVV"
            required
          />
        </Form.Group>

        <div className="text-center mt-3">
          <Button
            variant="primary"
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Confirm Payment"
            )}
          </Button>
        </div>
      </Form>

      {/* Modal for Payment Confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your payment was successful. Thank you for your purchase!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
              setShowModal(false)
              navigate("/home")


          }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Payment;
