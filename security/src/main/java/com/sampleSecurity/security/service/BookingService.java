package com.sampleSecurity.security.service;
import com.sampleSecurity.security.model.Booking;
import com.sampleSecurity.security.model.BookingRequestDTO;
import com.sampleSecurity.security.repository.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {
    @Autowired
    private  BookingRepo bookingRepository;


    @Transactional
    public void createBooking(BookingRequestDTO bookingRequest) {
        UUID bookingId = UUID.randomUUID(); // Generate a unique booking ID
        String paymentStatus = "PENDING"; // Default payment status
        LocalDateTime createdAt = LocalDateTime.now();
        int version = 0; // Default version

        bookingRepository.insertBooking(bookingId, bookingRequest.getEmail(), bookingRequest.getHotelId(),
                bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate(),
                bookingRequest.getGuestName(), bookingRequest.getGuestEmail(),
                bookingRequest.getGuestPhone(), bookingRequest.getNumAdults(),
                bookingRequest.getNumChildren(), bookingRequest.getTotalPrice(),
                paymentStatus, createdAt, version);
    }
    public Booking getBookingById(UUID bookingId){
        return bookingRepository.findById(bookingId).orElse(new Booking());
    }
    public Booking updateBooking(Booking b){
       return bookingRepository.save(b);
    }

    public List<Booking> getBookingsByEmail(String email) {
        return bookingRepository.findByEmail(email);
    }
}
