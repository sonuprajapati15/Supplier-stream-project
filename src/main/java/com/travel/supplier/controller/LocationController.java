package com.travel.supplier.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;

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
    @Value("${weather-bg-images-json-path}")
    private String weatherBgImagesJson;

    private Map<String, String> weatherConditionMap;

    private RestTemplate restTemplate = new RestTemplate();
    private ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void postAction() throws IOException {
        File file = new File(weatherBgImagesJson);
        this.weatherConditionMap = objectMapper.readValue(file, Map.class);
    }


    @GetMapping(value = "/news")
    public String getNewsByPlace(@RequestParam String place) {
        String url = newsEndpoint.replace("LOCATION", place);
        return restTemplate.getForObject(url, String.class);
    }

    @GetMapping(value = "/weather")
    public Map<String, Object> getWeatherByPlace(@RequestParam String place) throws JsonProcessingException {
        String url = weatherEndpoint.replace("LOCATION", place);
        Map<String, Object> data = restTemplate.getForObject(url, Map.class);
        if (Objects.nonNull(data) && !ObjectUtils.isEmpty(weatherConditionMap)) {
            Map<String, String> current = objectMapper.readValue(objectMapper.writeValueAsString(data.get("current")), Map.class);
            Map<String, String> conditions = objectMapper.readValue(objectMapper.writeValueAsString(current.get("condition")), Map.class);
            String weatherBgImage = weatherConditionMap.get(conditions.get("text"));
            if (weatherBgImage != null) {
                data.put("weatherBgImage", weatherBgImage);
            } else {
                data.put("weatherBgImage", weatherConditionMap.get("Patchy snow possible")); // Fallback image if condition not found
            }
        }
        return data;
    }
}