import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import HotelDetails from './pages/HotelDetails';
import MyBooking from './pages/MyBooking';
import PrivateRoute from './components/PrivateRoute';
import BookingPage from './pages/BookingPage'
import Chatbot from './pages/Chatbot';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-fill container my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/chatbot" element={<Chatbot />} />
          <Route
            path="/book/:hotelId"
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />
            <Route
              path="/my-bookings"
              element={
                <PrivateRoute>
                  <MyBooking />
                </PrivateRoute>
              }
            />
            <Route path="/payment" element={<PaymentPage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
