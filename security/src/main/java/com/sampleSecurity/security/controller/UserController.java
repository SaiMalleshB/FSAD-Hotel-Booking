package com.sampleSecurity.security.controller;

import com.sampleSecurity.security.model.Users;
import com.sampleSecurity.security.service.EmailService;
import com.sampleSecurity.security.service.JwtService;
import com.sampleSecurity.security.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService service;
    @Autowired
    private JwtService jwt;


    @PostMapping("/register")
    public ResponseEntity<Users> register(@RequestBody Users user) {
        return service.register(user);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
        System.out.println(service.verify(user));
        return service.verify(user);
    }
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(HttpServletRequest request) {
        String token = jwt.extractTokenFromRequest(request);
        if (token != null && jwt.validateToken(token)) {
            String username = jwt.extractUserName(token);
            return ResponseEntity.ok().body(Map.of("user", username));
        }
        return ResponseEntity.status(401).body("Invalid token");
    }
    @PostMapping("/details")
    public Users details(@RequestBody Users user){
        System.out.println(service.details(user));
        return service.details(user);
    }
}