import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query params from URL
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get("bookingId");
  const amount = searchParams.get("amount");

  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    if (!cardNumber || !nameOnCard || !expiry || !cvv) {
      setError("Please fill in all the fields.");
      return;
    }

    setError("");
    setIsProcessing(true);

    try {
      await api.post(`/bookings/payment/${bookingId}`); 
      setSuccess(true);
      setTimeout(() => navigate("/mybookings"), 2000);
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment Details</h2>
      {amount && <p>Amount to Pay: ₹{amount}</p>}
      {error && <p className="error">{error}</p>}
      {success ? (
        <p className="success">✅ Payment Successful! Redirecting...</p>
      ) : (
        <>
          <div className="input-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="input-group">
            <label>Name on Card</label>
            <input
              type="text"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="input-row">
            <div className="input-group half">
              <label>Expiry Date</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
              />
            </div>
            <div className="input-group half">
              <label>CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
              />
            </div>
          </div>

          <button
            className="confirm-button"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Confirm Payment"}
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
