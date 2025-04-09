import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentConfirmation = () => {
  const [amount, setAmount] = useState(null);

  // Get query parameters from the URL
  const location = useLocation();
  
  useEffect(() => {
    // Parse the query params from the URL (e.g., ?amount=1000)
    const queryParams = new URLSearchParams(location.search);
    const amountParam = queryParams.get('amount');
    
    // Set the amount state (convert it to dollars)
    if (amountParam) {
      setAmount(amountParam / 100); // Convert from cents to dollars
    }
  }, [location.search]);

  return (
    <div>
      <h2>Thank You for Your Payment!</h2>
      {amount !== null ? (
        <p>You have successfully paid ${amount.toFixed(2) * 100}. Thank you for your payment!</p>
      ) : (
        // <p>Loading payment details...</p>
        <></>
      )}
    </div>
  );
};

export default PaymentConfirmation;
