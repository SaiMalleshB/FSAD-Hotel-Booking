import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HotelCard.css"; // Import custom CSS

const HotelCard = ({ hotel }) => {
  return (
    <Card className="hotel-card mb-4">
      <div className="card-img-container">
        <Card.Img
          variant="top"
          src={hotel.images || "https://via.placeholder.com/400x200"}
          alt={hotel.name}
          className="card-img"
        />
      </div>
      <Card.Body className="card-body">
        <div className="card-header d-flex justify-content-between align-items-center">
          <Card.Title className="card-title">{hotel.name}</Card.Title>
          <Badge className="rating-badge" bg="warning" text="dark">
            ⭐ {hotel.starRating}
          </Badge>
        </div>
        <Card.Subtitle className="card-subtitle text-muted mb-2">
          📍 {hotel.address}
        </Card.Subtitle>
        <Card.Text className="card-description">{hotel.description}</Card.Text>
        {hotel.amenities && (
          <div className="amenities-section mb-3">
            <strong>Amenities:</strong>
            <div className="amenities-list d-flex flex-wrap gap-2 mt-2">
              {hotel.amenities.split(",").map((amenity, index) => (
                <Badge key={index} bg="secondary" className="amenity-badge">
                  {amenity.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <Button
          as={Link}
          to={`/hotel/${hotel.hotelId}`}
          variant="primary"
          className="details-btn"
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default HotelCard;
