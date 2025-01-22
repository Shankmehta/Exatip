package com.exa.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exa.service.RedisService;

@RestController
@RequestMapping("/redis")
public class RedisController {

    private final RedisService redisService;

    public RedisController(RedisService redisService) {
        this.redisService = redisService;
    }

    @PostMapping("/set")
    public String setKeyValue(@RequestParam String key, @RequestParam String value) {
        return redisService.setKeyValue(key, value);
    }

    @GetMapping("/get")
    public String getValue(@RequestParam String key) {
        return redisService.getValue(key);
    }

    @PostMapping("/increment")
    public Long incrementKey(@RequestParam String key) {
        return redisService.incrementKey(key);
    }

    @PostMapping("/hash")
    public String addToHash(@RequestParam String hash, @RequestParam String field, @RequestParam String value) {
        return redisService.addToHash(hash, field, value);
    }

    @GetMapping("/hash")
    public Map<String, String> getHash(@RequestParam String hash) {
        return redisService.getHash(hash);
    }

    @PostMapping("/list")
    public Long addToList(@RequestParam String list, @RequestParam String value) {
        return redisService.addToList(list, value);
    }

    @GetMapping("/list")
    public String[] getList(@RequestParam String list) {
        return redisService.getList(list);
    }
}
