package com.sampleSecurity.security.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID bookingId;

    @Version
    private int version;

    private String email; // User's email (Primary Key in User table)

    private UUID hotelId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private String guestName;

    private String guestEmail;

    private String guestPhone;

    private int numAdults;

    private int numChildren;

    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING; // Default status

    private LocalDateTime createdAt = LocalDateTime.now();

    public void setBookingId(UUID bookingId) {
        this.bookingId = bookingId;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setHotelId(UUID hotelId) {
        this.hotelId = hotelId;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public void setGuestEmail(String guestEmail) {
        this.guestEmail = guestEmail;
    }

    public void setGuestPhone(String guestPhone) {
        this.guestPhone = guestPhone;
    }

    public void setNumAdults(int numAdults) {
        this.numAdults = numAdults;
    }

    public void setNumChildren(int numChildren) {
        this.numChildren = numChildren;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public int getNumChildren() {
        return numChildren;
    }

    public int getNumAdults() {
        return numAdults;
    }

    public String getGuestPhone() {
        return guestPhone;
    }

    public String getGuestEmail() {
        return guestEmail;
    }

    public String getGuestName() {
        return guestName;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public UUID getHotelId() {
        return hotelId;
    }

    public String getEmail() {
        return email;
    }

    public int getVersion() {
        return version;
    }

    public UUID getBookingId() {
        return bookingId;
    }
}