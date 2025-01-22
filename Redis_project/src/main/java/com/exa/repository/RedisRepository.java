package com.exa.repository;

import org.springframework.stereotype.Repository;
import redis.clients.jedis.Jedis;

import java.util.List;
import java.util.Map;

@Repository
public class RedisRepository {

    private final Jedis jedis;

    public RedisRepository() {
        this.jedis = new Jedis("localhost", 6379); // Redis server connection
    }

    // Set a key-value pair
    public String setKeyValue(String key, String value) {
        return jedis.set(key, value);
    }

    // Get value by key
    public String getValue(String key) {
        return jedis.get(key);
    }

    // Increment a key's value
    public Long incrementKey(String key) {
        return jedis.incr(key);
    }

    // Add to hash
    public String addToHash(String hash, String field, String value) {
        jedis.hset(hash, field, value);
        return "Field added";
    }

    // Retrieve all fields from a hash
    public Map<String, String> getHash(String hash) {
        return jedis.hgetAll(hash);
    }

    // Add to a list
    public Long addToList(String list, String value) {
        return jedis.lpush(list, value);
    }

    // Retrieve all items from a list
    public List<String> getList(String list) {
        return jedis.lrange(list, 0, -1);
    }

    // Close Redis connection
    public void closeConnection() {
        jedis.close();
    }
}

