package com.travel.supplier.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * AncillaryController
 *
 * @author sonu.prajapati@amaexgbt.com
 * @date 22/06/25
 */
@RequestMapping(value = "/v1")
@RestController
public class AncillaryController {

    @Value("${ancillary.url}")
    private String ancillaryUrl;

    private RestTemplate restTemplate = new RestTemplate();


    @GetMapping(value = "/ancillary")
    public String getNewsByPlace() {
        return restTemplate.getForObject(ancillaryUrl, String.class);
    }
}