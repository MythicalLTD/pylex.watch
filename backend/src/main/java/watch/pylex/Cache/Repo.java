package watch.pylex.Cache;

import java.util.HashMap;
import java.util.Map;

public class Repo {
    private Map<String, Object> cache = new HashMap<>();

    public Object getFromCache(String key) {
        return cache.get(key);
    }

    public void addToCache(String key, Object value) {
        cache.put(key, value);
    }

    public boolean isInCache(String key) {
        return cache.containsKey(key);
    }

    public void clearCache() {
        cache.clear();
    }
}