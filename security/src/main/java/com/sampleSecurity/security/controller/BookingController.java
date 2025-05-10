package com.sampleSecurity.security.controller;


import com.sampleSecurity.security.model.BookingRequestDTO;
import com.sampleSecurity.security.model.Booking;
import com.sampleSecurity.security.model.PaymentStatus;
import com.sampleSecurity.security.model.Users;
import com.sampleSecurity.security.service.BookingService;
import com.sampleSecurity.security.service.EmailService;
import com.sampleSecurity.security.service.HotelService;
import com.sampleSecurity.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;
    @Autowired
    private HotelService hotelService;
    @PostMapping
    public ResponseEntity<String> createBooking(@RequestBody BookingRequestDTO bookingRequestDTO) {
        bookingService.createBooking(bookingRequestDTO);
        return ResponseEntity.ok("Successful");
    }
    @PostMapping("/payment/{bookingId}")
    public ResponseEntity<String> paymentBooking(@PathVariable UUID bookingId,
                                                 @AuthenticationPrincipal UserDetails userDetails
    ){
        Users u = new Users(userDetails.getUsername());
        String email = userService.details(u).getEmail();
        System.out.println(email);
        Booking b =  bookingService.getBookingById(bookingId);
        b.setPaymentStatus(PaymentStatus.COMPLETED);
        if (bookingService.updateBooking(b) != null){
           emailService.sendEmail(email," DESTINY Hotel Booking Platform","Thank you for Booking the Hotel "+hotelService.getHotelNameById(b.getHotelId())+"\nHave a Great Trip ahead.\nYours Sincerely Destiny Hotel.");
            return ResponseEntity.ok("Payment received");
        }
        else {
            return (ResponseEntity<String>) ResponseEntity.internalServerError();
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Booking>> getBookings(@PathVariable String email) {
        List<Booking> bookings = bookingService.getBookingsByEmail(email);
        return ResponseEntity.ok(bookings);
    }
}