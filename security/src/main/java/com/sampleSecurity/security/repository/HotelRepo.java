package com.sampleSecurity.security.repository;

import com.sampleSecurity.security.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface HotelRepo extends JpaRepository<Hotel, UUID> {
    void deleteById(UUID hotelId);
}
