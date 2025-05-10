import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../services/api";
import BookingForm from "../components/BookingForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "../components/Loader";

const BookingPage = () => {
  const { user, email } = useAuth();
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(true); 

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        console.log(`Fetching hotel with ID: ${hotelId}`);
        const response = await api.get(`/hotels/${hotelId}`);
        console.log("Hotel Data:", response.data);


        setHotel(response.data);
      } catch (err) {
        console.error("Error fetching hotel:", err);
        setError("Oops! Hotel details could not be retrieved. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId, user]);

  const handleBookingSuccess = () => {
    setShowForm(false); // Hide form on successful booking
  };

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center bg-dark text-white">
        <div className="spinner-border text-light" role="status"><Loader /></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center bg-dark text-white">
        <div className="alert alert-danger p-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="container d-flex vh-80 justify-content-center align-items-center text-white">
      {hotel && user ? (
        <div className="card p-4 bg-light text-dark shadow-lg">
          <h2 className="text-center mb-4">Book Your Stay</h2>
          {showForm ? (
            <BookingForm
              hotelId={hotelId}
              userEmail={email}
              hotelName={hotel.name}
              onBookingSuccess={handleBookingSuccess} // Pass function to close form on success
            />
          ) : (
            <div className="alert alert-success text-center p-4">
              Booking successful! Thank you for choosing {hotel.name}.
            </div>
          )}
        </div>
      ) : (
        <div className="alert alert-warning p-4 text-center">
          Please log in to proceed with your booking.
        </div>
      )}
    </div>
  );
};

export default BookingPage;
