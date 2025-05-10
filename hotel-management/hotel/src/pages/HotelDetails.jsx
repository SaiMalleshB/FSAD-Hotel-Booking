import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import api from "../services/api";
import "./HotelDetails.css"; // Import the plain CSS

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await api.get(`/hotels/${id}`);
        setHotel(response.data);
      } catch (err) {
        console.error("Error fetching hotel details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleBookNow = () => {
    navigate(`/book/${id}`, { state: { hotelId: hotel.hotelId } });
  };

  if (loading) {
    return (
      <div className="hotel-details-container">
        <Loader />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="hotel-details-container">
        <p>Error loading hotel details.</p>
      </div>
    );
  }

  return (
    <div className="hotel-details-container">
      <div className="hotel-header">
        <img
          src={hotel.images || "https://via.placeholder.com/1200x400"}
          alt={hotel.name}
          className="hotel-image"
        />
        <div className="hotel-header-info">
          <h1 className="hotel-name">{hotel.name}</h1>
          <p className="hotel-address">
            {hotel.address}, {hotel.city}, {hotel.state}, {hotel.country} - {hotel.zipCode}
          </p>
          <p className="hotel-rating">⭐ {hotel.starRating} / 5</p>
        </div>
      </div>
      <div className="hotel-content">
        <div className="hotel-description">
          <h2>Description</h2>
          <p>{hotel.description}</p>
        </div>
        <div className="hotel-info-grid">
          <div className="hotel-info-item">
            <h3>Contact</h3>
            <p><strong>Phone:</strong> {hotel.phone}</p>
            <p><strong>Email:</strong> {hotel.email}</p>
            <p><strong>Contact Person:</strong> {hotel.contactPerson}</p>
            <p><strong>Contact Phone:</strong> {hotel.contactPersonPhone}</p>
            <p><strong>Contact Email:</strong> {hotel.contactPersonEmail}</p>
          </div>
          <div className="hotel-info-item">
            <h3>Check-In / Check-Out</h3>
            <p><strong>Check-In:</strong> {hotel.checkInTime}</p>
            <p><strong>Check-Out:</strong> {hotel.checkOutTime}</p>
            <p><strong>Total Rooms:</strong> {hotel.totalRooms}</p>
          </div>
          <div className="hotel-info-item">
            <h3>Amenities</h3>
            <p>{hotel.amenities}</p>
          </div>
          <div className="hotel-info-item">
            <h3>Policies</h3>
            <p>{hotel.policies}</p>
          </div>
          <div className="hotel-info-item">
            <h3>Facilities & Costs</h3>
            <p>
              <strong>Parking:</strong> {hotel.parkingAvailable ? `Yes (Fee: ${hotel.parkingFee})` : "No"}
            </p>
            <p>
              <strong>Breakfast:</strong> {hotel.breakfastIncluded ? `Yes (Cost: ${hotel.breakfastCost})` : "Not Included"}
            </p>
            <p>
              <strong>WiFi:</strong> {hotel.wifiAvailable ? `Yes (Cost: ${hotel.wifiCost})` : "No"}
            </p>
            <p>
              <strong>Airport Shuttle:</strong> {hotel.airportShuttle ? `Yes (Cost: ${hotel.airportShuttleCost})` : "No"}
            </p>
          </div>
          <div className="hotel-info-item">
            <h3>Additional Info</h3>
            <p>
              <strong>Website:</strong>{" "}
              <a href={hotel.website} target="_blank" rel="noopener noreferrer">
                {hotel.website}
              </a>
            </p>
            <p><strong>Tax Rate:</strong> {hotel.taxRate}%</p>
            <p><strong>Language Support:</strong> {hotel.languageSupport}</p>
            <p><strong>Timezone:</strong> {hotel.timezone}</p>
            <p><strong>Currency:</strong> {hotel.currency}</p>
          </div>
        </div>
      </div>
      <div className="hotel-footer">
        <button className="book-now-btn" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelDetails;
