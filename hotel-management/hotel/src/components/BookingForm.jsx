import { useState, useEffect } from "react";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
const BookingForm = ({ hotelId, userEmail, hotelName, onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: userEmail || "",
    guestPhone: "",
    numAdults: 1,
    numChildren: 0,
    totalPrice: 0,
  });

  const [loading, setLoading] = useState(false);
  
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      setFormData((prev) => ({ ...prev, totalPrice: calculateTotalPrice() }));
    }
  }, [formData.checkInDate, formData.checkOutDate]);

  const calculateTotalPrice = () => {
    const basePrice = 1000;
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    return nights > 0 ? basePrice * nights : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
      setError("Check-out date must be after check-in date.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/bookings", { ...formData, email: userEmail, hotelId });
      onBookingSuccess(); 
      setMessage("Successfully Booked !")
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div className="p-4 border rounded shadow-sm bg-light" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center mb-4">Book Your Stay at {hotelName}</h2>
  
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
  
        {!message && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Check-in Date</label>
              <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required className="form-control"/>
            </div>
  
            <div className="mb-3">
              <label className="form-label">Check-out Date</label>
              <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} required className="form-control"/>
            </div>
  
            <div className="mb-3">
              <label className="form-label">Guest Name</label>
              <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} required className="form-control"/>
            </div>
  
            <div className="mb-3">
              <label className="form-label">Guest Phone</label>
              <input type="text" name="guestPhone" value={formData.guestPhone} onChange={handleChange} required className="form-control"/>
            </div>
  
            <div className="mb-3">
              <label className="form-label">Adults</label>
              <input type="number" name="numAdults" value={formData.numAdults} onChange={handleChange} min="1" max="4" className="form-control"/>
            </div>
  
            <div className="mb-3">
              <label className="form-label">Children</label>
              <input type="number" name="numChildren" value={formData.numChildren} onChange={handleChange} min="0" className="form-control"/>
            </div>
  
            <div className="mb-3">
              <label className="form-label">Total Price</label>
              <input type="text" value={`Rs.${formData.totalPrice}`} readOnly className="form-control"/>
            </div>
  
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
export default BookingForm; 