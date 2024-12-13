package watch.pylex;

import org.yaml.snakeyaml.Yaml;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.InputStream;
import java.util.Map;

public class Config {
    private static final Logger logger = LogManager.getLogger(Config.class);
    private static final String CONFIG_FILE = "/config.yml";

    private int port;
    private String host;
    private String apiEndpoint;
    private String logLevel;
    private String logFile;

    private String tmdbApiKey;
    private String vidSRCUri;


    public Config() {
        loadConfig();
    }

    private void loadConfig() {
        try (InputStream inputStream = Config.class.getResourceAsStream(CONFIG_FILE)) {
            Yaml yaml = new Yaml();
            Map<String, Object> config = yaml.load(inputStream);

            @SuppressWarnings("unchecked")
            Map<String, Object> serverConfig = (Map<String, Object>) config.get("server");
            this.port = (int) serverConfig.get("port");
            this.host = (String) serverConfig.get("host");
            @SuppressWarnings("unchecked")
            Map<String, Object> apiConfig = (Map<String, Object>) config.get("api");
            this.apiEndpoint = (String) apiConfig.get("endpoint");
            
            @SuppressWarnings("unchecked")
            Map<String, Object> tmdbConfig = (Map<String, Object>) config.get("tmdb");
            this.tmdbApiKey = (String) tmdbConfig.get("api_key");

            @SuppressWarnings("unchecked")
            Map<String, Object> visrcConfig = (Map<String, Object>) config.get("vidsrc");
            this.vidSRCUri = (String) visrcConfig.get("remote");

            @SuppressWarnings("unchecked")
            Map<String, Object> loggingConfig = (Map<String, Object>) config.get("logging");
            this.logLevel = (String) loggingConfig.get("level");
            this.logFile = (String) loggingConfig.get("file");

            logger.info("Configuration loaded successfully");
        } catch (Exception e) {
            logger.error("Error loading configuration", e);
            throw new RuntimeException("Failed to load configuration", e);
        }
    }

    public int getPort() {
        return port;
    }

    public String getHost() {
        return host;
    }

    public String getApiEndpoint() {
        return apiEndpoint;
    }

    public String getLogLevel() {
        return logLevel;
    }

    public String getLogFile() {
        return logFile;
    }

    public String getTmdbApiKey() {
        return tmdbApiKey;
    }

    public String getVidSRCUri() {
        return vidSRCUri;
    }
}

