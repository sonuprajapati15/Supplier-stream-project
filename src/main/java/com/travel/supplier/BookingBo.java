package com.travel.supplier;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * BookingBo
 *
 * @author sonu.prajapati@amaexgbt.com
 * @date 01/06/25
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Builder
public class BookingBo implements Serializable {
    private String userId;
    private String name;
    private String phone;
    private String email;
    private int age;
    private String ticketNo;
    private String pnrNo;
    private String flightId;
    private String fareType;
    private int fareId;
    private String provider;
    private List<Object> bookings;
}