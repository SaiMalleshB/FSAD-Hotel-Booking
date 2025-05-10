package com.sampleSecurity.security.controller;


import com.sampleSecurity.security.model.Hotel;
import com.sampleSecurity.security.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @PostMapping
    public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotel) {
        Hotel createdHotel = hotelService.createHotel(hotel);
        return ResponseEntity.ok(createdHotel);
    }

    @PostMapping("/hotelname/{hotelId}")
    public  ResponseEntity<String> getHotelNameById(@PathVariable UUID hotelId){
        return ResponseEntity.ok(hotelService.getHotelNameById(hotelId));
    }

    @GetMapping("/{hotelId}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable UUID hotelId) {
        Hotel hotel = hotelService.getHotelById(hotelId);
        return ResponseEntity.ok(hotel);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Hotel>> getHotels() {
        List<Hotel> l= hotelService.getAllHotels();
        return ResponseEntity.ok(l);
    }


    @PutMapping("/{hotelId}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable UUID hotelId, @RequestBody Hotel hotel) {
        Hotel updatedHotel = hotelService.updateHotel(hotelId, hotel);
        return ResponseEntity.ok(updatedHotel);
    }

    @DeleteMapping("/{hotelId}")
    public ResponseEntity<Void> deleteHotel(@PathVariable UUID hotelId) {
        hotelService.deleteHotel(hotelId);
        return ResponseEntity.noContent().build();
    }
}