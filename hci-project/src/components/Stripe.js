import React, { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Alert } from "reactstrap";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet
    }

    // Confirm the payment with the PaymentElement component
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete", // Dummy URL for successful payment
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setPaymentSuccess(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        setErrorMessage(null);
        alert("Payment Success!"); // Simulate a payment success
      } else {
        setErrorMessage('Payment failed.');
      }
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Button type="submit" disabled={!stripe}>
          Pay Now
        </Button>
      </form>

      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
      {paymentSuccess && <Alert color="success">Payment was successful!</Alert>}
    </div>
  );
};

export default CheckoutForm;
