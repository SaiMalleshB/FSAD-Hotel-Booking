import React, { useState } from "react";
import { Container, Form, Button, Card, ListGroup } from "react-bootstrap";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Response templates
  const responses = {
    greeting: ["Hello! How can I assist you today?"],
    bookingInquiry: ["Are you looking to make a booking? I can help with that!"],
    roomTypes: ["We offer single, double, and suite rooms. Would you like to know more about any of them?"],
    priceInquiry: ["Our rooms start at $100 per night. Would you like to know the price for a specific room type?"],
    services: ["We offer free breakfast, a swimming pool, and spa services."],
    checkInCheckOut: ["Check-in is from 2:00 PM, and check-out is by 11:00 AM."],
    help: ["Feel free to ask any questions about our hotel or services. I'm happy to assist!"],
    cancellationPolicy: ["You can cancel your booking up to 24 hours before check-in for a full refund."],
    payment: ["We accept credit cards, debit cards, UPI, and net banking."],
    location: ["We are located at 123 Main Street, Downtown."],
    breakfast: ["Yes, we serve complimentary breakfast from 7:00 AM to 10:30 AM."],
    parking: ["We offer free and secure parking 24/7."],
    wifi: ["Free high-speed Wi-Fi is available throughout the hotel."],
    discount: ["We currently offer a 10% discount for online bookings!"],
    pets: ["Yes, pets are allowed. Please inform us in advance."],
    lateCheckout: ["Late checkout is available upon request."],
    extraBed: ["We can provide an extra bed for a small fee."],
    attractions: ["Nearby attractions include the City Museum, Riverwalk, and Central Park."],
    childPolicy: ["Children under 6 stay free with parents. Let us know if you need a crib."],
    shuttle: ["We provide airport shuttle service. Would you like to book it?"],
    smoking: ["We have designated smoking rooms available."],
    honeymoon: ["We offer honeymoon packages with special room decor and amenities."],
    conference: ["Our conference hall seats up to 100 guests and is fully equipped."],
    gym: ["The gym is open 24/7 and includes cardio and strength equipment."],
    spa: ["Our spa offers massages and wellness treatments from 10 AM to 8 PM."],
    pool: ["The pool is open from 7 AM to 9 PM daily."],
    restaurant: ["Our restaurant offers Indian and Continental cuisine."],
    laundry: ["Laundry service is available on request with 24-hour delivery."],
    housekeeping: ["Housekeeping is available daily between 8 AM and 5 PM."],
    taxi: ["We can book a taxi for you. Please share your destination and time."],
    luggage: ["You can store your luggage before check-in or after check-out."],
    feedback: ["We value your feedback! Please share your thoughts with us."],
    default: ["Sorry, I didn't quite catch that. Could you please rephrase?"]
  };

  // Keyword map with 100+ keyword phrases
  const keywordMap = {
    greeting: ["hello", "hi", "hey", "good morning", "good evening", "good afternoon"],
    bookingInquiry: ["book", "reservation", "reserve", "booking", "make a booking"],
    roomTypes: ["room", "rooms", "suite", "double", "single", "types of rooms", "accommodation"],
    priceInquiry: ["price", "cost", "rate", "charges", "how much", "tariff", "pricing"],
    services: ["service", "services", "facility", "facilities", "amenity", "gym", "pool", "spa", "restaurant", "laundry", "housekeeping"],
    checkInCheckOut: ["check-in", "checkin", "check out", "checkout", "timing", "arrival", "departure", "when can I check in", "when is checkout"],
    help: ["help", "support", "assistance", "issue", "problem", "query"],
    cancellationPolicy: ["cancel", "cancellation", "refund", "change booking", "reschedule", "booking policy"],
    payment: ["payment", "pay", "card", "credit", "debit", "upi", "net banking", "cash", "wallet", "transaction"],
    location: ["location", "address", "where", "situated", "place", "directions", "how to reach"],
    breakfast: ["breakfast", "meal", "buffet", "food", "morning meal", "brunch"],
    parking: ["parking", "vehicle", "car", "garage", "park", "car park", "valet"],
    wifi: ["wifi", "internet", "connectivity", "network", "data", "connection"],
    discount: ["discount", "offer", "deal", "promotion", "coupon", "special rate", "online offer"],
    pets: ["pet", "dog", "cat", "animal", "pet-friendly", "bring my dog"],
    lateCheckout: ["late checkout", "extend stay", "extra time", "delay checkout"],
    extraBed: ["extra bed", "additional bed", "third person", "child bed", "rollaway", "baby bed"],
    attractions: ["nearby", "attractions", "things to do", "tourist", "sightseeing", "local places", "visit"],
    childPolicy: ["child", "children", "kids", "baby", "crib", "child policy"],
    shuttle: ["shuttle", "airport pickup", "airport drop", "transport", "bus", "cab service"],
    smoking: ["smoking", "smoking room", "can I smoke", "smoke"],
    honeymoon: ["honeymoon", "romantic", "newlywed", "decor", "couple"],
    conference: ["conference", "meeting", "event", "seminar", "business", "hall"],
    gym: ["gym", "fitness", "exercise", "workout", "health club"],
    spa: ["spa", "massage", "relax", "treatment", "wellness"],
    pool: ["pool", "swimming", "swim", "water"],
    restaurant: ["restaurant", "food", "dining", "eat", "lunch", "dinner"],
    laundry: ["laundry", "wash", "clothes", "clean"],
    housekeeping: ["housekeeping", "room clean", "cleaning", "maid", "room service"],
    taxi: ["taxi", "cab", "car hire", "ride", "transport"],
    luggage: ["luggage", "bag", "baggage", "store", "locker"],
    feedback: ["feedback", "review", "rate", "opinion", "comment"]
  };

  // Function to determine appropriate response
  const getChatbotResponse = (message) => {
    const lowerMessage = message.toLowerCase().trim();
    for (const [category, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return responses[category][0]; // Use first response per category for clarity
      }
    }
    return responses.default[0];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userMessage.trim()) {
      const botReply = getChatbotResponse(userMessage);
      setChatHistory(prev => [
        ...prev,
        { sender: "user", message: userMessage },
        { sender: "bot", message: botReply }
      ]);
      setUserMessage("");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "100%", maxWidth: "600px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Hotel Booking Chatbot</h2>
          <ListGroup variant="flush">
            {chatHistory.map((chat, index) => (
              <ListGroup.Item
                key={index}
                className={chat.sender === "user" ? "text-end" : "text-start"}
                style={{
                  backgroundColor: chat.sender === "user" ? "#e0f7fa" : "#f1f1f1",
                  marginBottom: "10px"
                }}
              >
                <strong>{chat.sender === "user" ? "You:" : "Chatbot:"}</strong> {chat.message}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form onSubmit={handleSendMessage}>
            <Form.Group controlId="userMessage">
              <Form.Control
                type="text"
                placeholder="Ask me anything about booking!"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">Send</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Chatbot;