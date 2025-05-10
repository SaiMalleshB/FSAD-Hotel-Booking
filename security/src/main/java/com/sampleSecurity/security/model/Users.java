package com.sampleSecurity.security.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity // Ensure this matches your database table name
public class Users {

    @Setter
    @Getter
    private String username;
    @Setter
    @Getter
    @Id
    private String email;  // Ensure this field exists

    @Setter
    @Getter
    private String password;
    private Users(){}


    public Users(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
