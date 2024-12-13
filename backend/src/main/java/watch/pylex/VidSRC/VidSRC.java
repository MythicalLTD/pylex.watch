package watch.pylex.VidSRC;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.List;

import org.apache.logging.log4j.Logger;

import watch.pylex.Main;
import org.json.JSONArray;
import org.json.JSONObject;

public class VidSRC {
    public static boolean tryConnection(String uri, Logger logger) {
        logger.info("Trying to connect to VidSRC...");
        logger.info("URI: " + uri);
        if (uri == null) {
            logger.error("URI cannot be null");
            return false;
        }
        try {
            @SuppressWarnings("deprecation")
            java.net.URL url = new java.net.URL(uri);
            java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            int responseCode = conn.getResponseCode();
            if (responseCode != 200) {
                throw new RuntimeException("HTTP error code: " + responseCode);
            }
            // Connect to VidSRC
            return true;
        } catch (Exception e) {
            logger.error("VidSRC connection failed", e);
            return false;
        }
    }

    public static String getAllMovies() {
        Main.getLogger().info("Fetching all movies from VidSRC...");
        createCacheFolder();

        // Check cache first
        File cacheFile = new File("cache/movies.json");
        if (cacheFile.exists()) {
            long lastModified = cacheFile.lastModified();
            long currentTime = System.currentTimeMillis();
            if ((currentTime - lastModified) < 3600000) { // 3600000 ms = 1 hour
                try {
                    java.nio.file.Path path = cacheFile.toPath();
                    String cachedContent = new String(java.nio.file.Files.readAllBytes(path));
                    Main.getLogger().info("Returning cached movies list");
                    return cachedContent;
                } catch (Exception e) {
                    Main.getLogger().warn("Failed to read cache file", e);
                }
            } else {
                Main.getLogger().info("Cache is expired");
            }
        }
        // If cache miss or error, fetch from API
        try {
            @SuppressWarnings("deprecation")
            java.net.URL url = new java.net.URL(Main.getConfig().getVidSRCUri() + "/list/movie.json");
            java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            // Save to cache
            try {
                java.nio.file.Files.write(cacheFile.toPath(), response.toString().getBytes());
                Main.getLogger().info("Saved movies list to cache");
            } catch (Exception e) {
                Main.getLogger().warn("Failed to write to cache file", e);
            }

            return response.toString();
        } catch (Exception e) {
            Main.getLogger().error("Failed to fetch movies", e);
            return "{}";
        }
    }
    public static String getAllShows() {
        Main.getLogger().info("Fetching all shows from VidSRC...");
        createCacheFolder();

        // Check cache first
        File cacheFile = new File("cache/tv.json");
        if (cacheFile.exists()) {
            long lastModified = cacheFile.lastModified();
            long currentTime = System.currentTimeMillis();
            if ((currentTime - lastModified) < 3600000) { // 3600000 ms = 1 hour
                try {
                    java.nio.file.Path path = cacheFile.toPath();
                    String cachedContent = new String(java.nio.file.Files.readAllBytes(path));
                    Main.getLogger().info("Returning cached shows list");
                    return cachedContent;
                } catch (Exception e) {
                    Main.getLogger().warn("Failed to read cache file", e);
                }
            } else {
                Main.getLogger().info("Cache is expired");
            }
        }
        // If cache miss or error, fetch from API
        try {
            @SuppressWarnings("deprecation")
            java.net.URL url = new java.net.URL(Main.getConfig().getVidSRCUri() + "/list/tv.json");
            java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            // Save to cache
            try {
                java.nio.file.Files.write(cacheFile.toPath(), response.toString().getBytes());
                Main.getLogger().info("Saved shows list to cache");
            } catch (Exception e) {
                Main.getLogger().warn("Failed to write to cache file", e);
            }

            return response.toString();
        } catch (Exception e) {
            Main.getLogger().error("Failed to fetch shows", e);
            return "{}";
        }
    }
    public static List<String> getMoviesIds() {
        List<String> ids = new java.util.ArrayList<>();
        try {
            String moviesJson = getAllMovies();
            JSONArray moviesArray = new JSONArray(moviesJson);
            for (int i = 0; i < moviesArray.length(); i++) {
                JSONObject movie = moviesArray.getJSONObject(i);
                ids.add(String.valueOf(movie.getInt("tmdb")));
            }
        } catch (Exception e) {
            Main.getLogger().error("Failed to parse movies JSON", e);
        }
        return ids;
    }

    public static List<String> getShowsIds() {
        List<String> ids = new java.util.ArrayList<>();
        try {
            String showsJson = getAllShows();
            JSONArray showsArray = new JSONArray(showsJson);
            for (int i = 0; i < showsArray.length(); i++) {
                JSONObject show = showsArray.getJSONObject(i);
                ids.add(String.valueOf(show.getInt("tmdb")));
            }
        } catch (Exception e) {
            Main.getLogger().error("Failed to parse shows JSON", e);
        }
        return ids;
    }

    public static void createCacheFolder() {
        File cacheFolder = new File("cache");
        if (!cacheFolder.exists()) {
            boolean created = cacheFolder.mkdir();
            if (!created) {
                throw new RuntimeException("Failed to create cache directory");
            }
        }
    }
}
