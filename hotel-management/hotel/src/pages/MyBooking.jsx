import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./MyBooking.css";

const MyBooking = () => {
  const { email } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handlePaymentRedirect = (booking) => {
    // Assuming you're using query params to send booking info to payment page
    window.location.href = `/payment?bookingId=${booking.bookingId}&amount=${booking.totalPrice}`;
  };
  

  useEffect(() => {
    const fetchBookings = async () => {
      if (!email) return;
      try {
        const response = await api.get(`/bookings/${email}`);
        const bookingData = response.data;

        
        const updatedBookings = await Promise.all(
          bookingData.map(async (booking) => {
            try {
              console.log(booking.hotelId);
              const res = await api.post(`/hotels/hotelname/${booking.hotelId}`);
              return { ...booking, hotelName: res.data }; 
            } catch {
              return { ...booking, hotelName: "Unknown" };
            }
          })
        );
        

        setBookings(updatedBookings);
      } catch (err) {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [email]);

  return (
    <div className="my-booking-container">
      <h2>My Bookings</h2>
      <p className="sub-title">Review and manage your bookings</p>

      {loading ? (
        <div className="loader"></div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="booking-grid">
          {console.log(bookings)}
          {bookings.map((booking) => (
            <div key={booking.bookingId} className="booking-card">
              <h3 className="booking-hotel">Hotel: {booking.hotelName}</h3>
              <p>
                <strong>Check-in:</strong> {booking.checkInDate}
              </p>
              <p>
                <strong>Check-out:</strong> {booking.checkOutDate}
              </p>
              <p>
                <strong>Guests:</strong> {booking.numAdults} Adults, {booking.numChildren} Children
              </p>
              <p>
                <strong>Total Price:</strong> ${booking.totalPrice}
              </p>
              <p>
                <strong>Status:</strong>
                <span className={`status ${booking.paymentStatus.toLowerCase()}`}>
                  {booking.paymentStatus}
                  
                </span>
                    {booking.paymentStatus.toLowerCase() == "pending" && (
                  <button
                    className="pay-button"
                    onClick={() => handlePaymentRedirect(booking)}
                  >
                    Pay Now
                  </button>
                )}

              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
