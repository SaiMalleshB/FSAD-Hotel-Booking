package com.sampleSecurity.security.service;

import com.fasterxml.jackson.databind.ser.std.UUIDSerializer;
import com.sampleSecurity.security.model.Hotel;
import com.sampleSecurity.security.repository.HotelRepo;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class  HotelService {

    @Autowired
    private HotelRepo hotelRepository;

    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public Hotel getHotelById(UUID hotelId) {
        Optional<Hotel> optionalHotel = hotelRepository.findById(hotelId);
        return optionalHotel.orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));
    }
    public String getHotelNameById(UUID hotelId){
        Hotel h = this.getHotelById(hotelId);
        return h.getName();
    }

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Hotel updateHotel(UUID hotelId, Hotel hotel) {
        Hotel existingHotel = getHotelById(hotelId);
        existingHotel.setName(hotel.getName());
        existingHotel.setAddress(hotel.getAddress());
        existingHotel.setCity(hotel.getCity());
        existingHotel.setState(hotel.getState());
        existingHotel.setCountry(hotel.getCountry());
        existingHotel.setZipCode(hotel.getZipCode());
        existingHotel.setPhone(hotel.getPhone());
        existingHotel.setEmail(hotel.getEmail());
        existingHotel.setStarRating(hotel.getStarRating());
        existingHotel.setDescription(hotel.getDescription());
        existingHotel.setWebsite(hotel.getWebsite());
        existingHotel.setCheckInTime(hotel.getCheckInTime());
        existingHotel.setCheckOutTime(hotel.getCheckOutTime());
        existingHotel.setTotalRooms(hotel.getTotalRooms());
        existingHotel.setAmenities(hotel.getAmenities());
        existingHotel.setPolicies(hotel.getPolicies());
        existingHotel.setLatitude(hotel.getLatitude());
        existingHotel.setLongitude(hotel.getLongitude());
        existingHotel.setOwnerName(hotel.getOwnerName());
        existingHotel.setContactPerson(hotel.getContactPerson());
        existingHotel.setContactPersonPhone(hotel.getContactPersonPhone());
        existingHotel.setContactPersonEmail(hotel.getContactPersonEmail());
        existingHotel.setActive(hotel.isActive());
        existingHotel.setCurrency(hotel.getCurrency());
        existingHotel.setLoyaltyProgram(hotel.isLoyaltyProgram());
        existingHotel.setParkingAvailable(hotel.isParkingAvailable());
        existingHotel.setParkingFee(hotel.getParkingFee());
        existingHotel.setPetFriendly(hotel.isPetFriendly());
        existingHotel.setBreakfastIncluded(hotel.isBreakfastIncluded());
        existingHotel.setBreakfastCost(hotel.getBreakfastCost());
        existingHotel.setWifiAvailable(hotel.isWifiAvailable());
        existingHotel.setWifiCost(hotel.getWifiCost());
        existingHotel.setAirportShuttle(hotel.isAirportShuttle());
        existingHotel.setAirportShuttleCost(hotel.getAirportShuttleCost());
        existingHotel.setImages(hotel.getImages());
        existingHotel.setSocialMediaLinks(hotel.getSocialMediaLinks());
        existingHotel.setTaxRate(hotel.getTaxRate());
        existingHotel.setLanguageSupport(hotel.getLanguageSupport());
        existingHotel.setTimezone(hotel.getTimezone());
        return hotelRepository.save(existingHotel);
    }

    public void deleteHotel(UUID hotelId) {
        hotelRepository.deleteById(hotelId);
    }
}
