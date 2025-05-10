package com.sampleSecurity.security.model;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {

    @Id
    private UUID hotelId;
    private String name;
    private String address;
    private String city;
    private String state;
    private String country;
    private String zipCode;
    private String phone;
    private String email;
    private int starRating;
    private String description;
    private String website;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private int totalRooms;
    private String amenities;
    private String policies;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String ownerName;
    private String contactPerson;
    private String contactPersonPhone;
    private String contactPersonEmail;
    private boolean isActive;
    private String currency;
    private boolean loyaltyProgram;
    private boolean parkingAvailable;
    private BigDecimal parkingFee;
    private boolean petFriendly;
    private boolean breakfastIncluded;
    private BigDecimal breakfastCost;
    private boolean wifiAvailable;
    private BigDecimal wifiCost;
    private boolean airportShuttle;
    private BigDecimal airportShuttleCost;
    private String images;
    private String socialMediaLinks;
    private BigDecimal taxRate;
    private String languageSupport;
    private String timezone;
    private Date createdAt;
    private Date updatedAt;

    public UUID getHotelId() {
        return hotelId;
    }

    public void setHotelId(UUID hotelId) {
        this.hotelId = hotelId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getStarRating() {
        return starRating;
    }

    public void setStarRating(int starRating) {
        this.starRating = starRating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public LocalTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public int getTotalRooms() {
        return totalRooms;
    }

    public void setTotalRooms(int totalRooms) {
        this.totalRooms = totalRooms;
    }

    public String getAmenities() {
        return amenities;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }

    public String getPolicies() {
        return policies;
    }

    public void setPolicies(String policies) {
        this.policies = policies;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactPersonPhone() {
        return contactPersonPhone;
    }

    public void setContactPersonPhone(String contactPersonPhone) {
        this.contactPersonPhone = contactPersonPhone;
    }

    public String getContactPersonEmail() {
        return contactPersonEmail;
    }

    public void setContactPersonEmail(String contactPersonEmail) {
        this.contactPersonEmail = contactPersonEmail;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public boolean isLoyaltyProgram() {
        return loyaltyProgram;
    }

    public void setLoyaltyProgram(boolean loyaltyProgram) {
        this.loyaltyProgram = loyaltyProgram;
    }

    public boolean isParkingAvailable() {
        return parkingAvailable;
    }

    public void setParkingAvailable(boolean parkingAvailable) {
        this.parkingAvailable = parkingAvailable;
    }

    public BigDecimal getParkingFee() {
        return parkingFee;
    }

    public void setParkingFee(BigDecimal parkingFee) {
        this.parkingFee = parkingFee;
    }

    public boolean isPetFriendly() {
        return petFriendly;
    }

    public void setPetFriendly(boolean petFriendly) {
        this.petFriendly = petFriendly;
    }

    public boolean isBreakfastIncluded() {
        return breakfastIncluded;
    }

    public void setBreakfastIncluded(boolean breakfastIncluded) {
        this.breakfastIncluded = breakfastIncluded;
    }

    public BigDecimal getBreakfastCost() {
        return breakfastCost;
    }

    public void setBreakfastCost(BigDecimal breakfastCost) {
        this.breakfastCost = breakfastCost;
    }

    public boolean isWifiAvailable() {
        return wifiAvailable;
    }

    public void setWifiAvailable(boolean wifiAvailable) {
        this.wifiAvailable = wifiAvailable;
    }

    public BigDecimal getWifiCost() {
        return wifiCost;
    }

    public void setWifiCost(BigDecimal wifiCost) {
        this.wifiCost = wifiCost;
    }

    public boolean isAirportShuttle() {
        return airportShuttle;
    }

    public void setAirportShuttle(boolean airportShuttle) {
        this.airportShuttle = airportShuttle;
    }

    public BigDecimal getAirportShuttleCost() {
        return airportShuttleCost;
    }

    public void setAirportShuttleCost(BigDecimal airportShuttleCost) {
        this.airportShuttleCost = airportShuttleCost;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public String getSocialMediaLinks() {
        return socialMediaLinks;
    }

    public void setSocialMediaLinks(String socialMediaLinks) {
        this.socialMediaLinks = socialMediaLinks;
    }

    public BigDecimal getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(BigDecimal taxRate) {
        this.taxRate = taxRate;
    }

    public String getLanguageSupport() {
        return languageSupport;
    }

    public void setLanguageSupport(String languageSupport) {
        this.languageSupport = languageSupport;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
