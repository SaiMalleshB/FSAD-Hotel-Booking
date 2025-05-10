import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import "./Header.css"; // Import the custom CSS

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar className="custom-navbar" variant="light" expand="lg" >
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo">
          Destiny
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto custom-nav">
            <Nav.Link as={NavLink} to="/" className="custom-nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/chatbot" className="custom-nav-link">
              ChatBot
            </Nav.Link>
            {user && (
              <Nav.Link as={NavLink} to="/my-bookings" className="custom-nav-link">
                My Bookings
              </Nav.Link>
            )}
          </Nav>
          <Nav className="custom-auth">
            {user ? (
              <>
                <Navbar.Text className="greeting">Hello, {user}</Navbar.Text>
                <Button variant="success" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="custom-nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="custom-nav-link">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
