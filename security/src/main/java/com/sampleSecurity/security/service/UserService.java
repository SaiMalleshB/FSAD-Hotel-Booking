package com.sampleSecurity.security.service;

import com.sampleSecurity.security.model.Users;
import com.sampleSecurity.security.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private UserRepo repo;


    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public ResponseEntity<Users> register(Users user) {
        try{
            user.setPassword(encoder.encode(user.getPassword()));
            repo.save(user);
            return  new ResponseEntity<>(user, HttpStatusCode.valueOf(201));
        }catch (Exception e){
            return  new ResponseEntity<>(null, HttpStatusCode.valueOf(300));
        }

    }

    public ResponseEntity<?> verify(Users user) {
        System.out.println(user);
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
                if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(user.getUsername());
                return ResponseEntity.ok(Map.of("token", token));
            } else {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error" + e  );
        }
    }
    public Users details(Users user) {
        return repo.findByUsername(user.getUsername());
    }
}