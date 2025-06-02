package com.travel.supplier.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * LocationController
 *
 * @author sonu.prajapati@amaexgbt.com
 * @date 02/06/25
 */
@RequestMapping(value = "/v1")
@RestController
public class LocationController {

    @Value("${news.endpoint}")
    private String newsEndpoint;
    @Value("${weather.endpoint}")
    private String weatherEndpoint;
    private RestTemplate restTemplate = new RestTemplate();


    @GetMapping(value = "/news")
    public String getNewsByPlace(@RequestParam String place) {
        String url = newsEndpoint.replace("LOCATION", place);
        return restTemplate.getForObject(url, String.class);
    }

    @GetMapping(value = "/weather")
    public String getWeatherByPlace(@RequestParam String place) {
        String url = weatherEndpoint.replace("LOCATION", place);
        return restTemplate.getForObject(url, String.class);
    }
}