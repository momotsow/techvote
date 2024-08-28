import React from 'react';
import { useLocation, Link } from 'react-router-dom';


function ThankYou() {
  const location = useLocation();
  const { confirmationCode } = location.state || {};


  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Thank You for Voting!</h2>
      {confirmationCode && (
        <p>Your confirmation code is: <strong>{confirmationCode}</strong></p>
      )}
      <Link to="/profile">Go to Home</Link>
    </div>
      
    </div>
  );
}

export default ThankYou;
