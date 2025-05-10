package com.sampleSecurity.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;
import java.security.SecureRandom;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public String sendEmail(String to,String subject,String text) {
        try {
            SecureRandom secureRandom = new SecureRandom();
            StringBuilder otp = new StringBuilder();
            for (int i = 0; i < 6; i++) {
                otp.append(secureRandom.nextInt(10)); // Generate 6-digit OTP
            }

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            System.out.println("OTP sent successfully to " + to);
            return "success";
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            return "failure";
        }
    }
}
