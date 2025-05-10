import React, { useState } from 'react';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api'; // your axios instance

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post('/register', { username: name, email, password });
      console.log(response.status);
      if (response.status === 201 || response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(response.data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "450px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Registered successfully! Redirecting to login...</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-2">
              Register
            </Button>
          </Form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login here</Link>.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
