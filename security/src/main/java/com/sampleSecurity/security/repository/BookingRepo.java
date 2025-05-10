package com.sampleSecurity.security.repository;

import com.sampleSecurity.security.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface BookingRepo extends JpaRepository<Booking, UUID> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO booking (booking_id, email, hotel_id, check_in_date, check_out_date, guest_name, guest_email, guest_phone, num_adults, num_children, total_price, payment_status, created_at, version) " +
            "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)", nativeQuery = true)
    void insertBooking(UUID bookingId, String email, UUID hotelId, LocalDate checkInDate, LocalDate checkOutDate,
                       String guestName, String guestEmail, String guestPhone, int numAdults, int numChildren,
                       BigDecimal totalPrice, String paymentStatus, LocalDateTime createdAt, int version);
    List<Booking> findByEmail(String email);

}

