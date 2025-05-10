package com.sampleSecurity.security.repository;

import com.sampleSecurity.security.model.Users;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users, String> {

    Users findByUsername(String username);
    Users findByEmail(String email);
}
