package com.exa.service;

import com.exa.repository.RedisRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RedisService {

    private final RedisRepository redisRepository;

    public RedisService(RedisRepository redisRepository) {
        this.redisRepository = redisRepository;
    }

    public String setKeyValue(String key, String value) {
        return redisRepository.setKeyValue(key, value);
    }

    public String getValue(String key) {
        return redisRepository.getValue(key);
    }

    public Long incrementKey(String key) {
        return redisRepository.incrementKey(key);
    }

    public String addToHash(String hash, String field, String value) {
        return redisRepository.addToHash(hash, field, value);
    }

    public Map<String, String> getHash(String hash) {
        return redisRepository.getHash(hash);
    }

    public Long addToList(String list, String value) {
        return redisRepository.addToList(list, value);
    }

    public String[] getList(String list) {
        List<String> items = redisRepository.getList(list);
        return items.toArray(new String[0]);
    }
}

