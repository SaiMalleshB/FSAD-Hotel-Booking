import React, { useState, useEffect } from "react";
import { Row, Col, Form, Container, Alert } from "react-bootstrap";
import HotelCard from "../components/HotelCard";
import api from "../services/api";
import Loader from "../components/Loader";
import "./Home.css"; // Import custom CSS

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get("/hotels/all");
        setHotels(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch hotels. Please try again later.");
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter(
    (hotel) =>
      (hotel.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hotel.location || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hotel.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <Container className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Discover Your Perfect  <span>❛ Hotel ❜</span></h1>
        <p className="hero-subtitle">
          Browse our exclusive collection and book your next stay with ease.
        </p>
        <Form className="hero-search">
          <Form.Control
            type="text"
            placeholder="Search hotels by name, location, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>
      </div>

      <div className="content-section">
        {loading && <Loader />}
        {error && (
          <Alert variant="danger" className="text-center error-alert">
            {error}
          </Alert>
        )}
        <Row>
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <Col md={4} key={hotel.hotelId} className="mb-4">
                <HotelCard hotel={hotel} />
              </Col>
            ))
          ) : (
            !loading && <p className="text-center no-hotels">No hotels found.</p>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default Home;
