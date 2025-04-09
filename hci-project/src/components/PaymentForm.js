import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';  // Stripe.js library
import { Elements, CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';  // Stripe Elements

// Load your public key from Stripe
const stripePromise = loadStripe('pk_test_51RBaYOB2FNgKstoSb3jJpG2dQXroGOyqyLhHFULWKQ2GUpMd6relZIYj9QTFkM2AmlQGxcZ1t3SKP4X5JKKbYdA300QsJsxhkq');  // Replace with your actual public key

const PaymentForm = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(1000); // Example amount: $10.00 (1000 cents)
  const stripe = useStripe();
  const elements = useElements();

  // Create the payment intent on the backend when the component is mounted
  useEffect(() => {
    // Call the backend to create the payment intent
    const createPaymentIntent = async () => {
      const response = await fetch('http://localhost:4000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret); // Set client secret from backend
    };

    createPaymentIntent();
  }, [amount]);

  // Handle form submission to confirm payment
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Make sure stripe is loaded
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(PaymentElement),
      },
    });

    if (error) {
      console.error('Payment failed', error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment successful!');
    }
  };

  return (
    <div>
      <h2>Stripe Payment</h2>
      <form onSubmit={handleSubmit}>
      {/* <Elements stripe={stripePromise}> */}
        <PaymentElement />
      {/* </Elements> */}
        {/* <CardElement /> Stripe Card Element to collect card details */}
        <button type="submit" disabled={!stripe}>Pay</button>
      </form>
    </div>
  );
};

// const PaymentPage = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//     </Elements>
//   );
// };

export default PaymentForm;
