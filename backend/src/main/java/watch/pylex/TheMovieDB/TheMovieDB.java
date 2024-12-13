package watch.pylex.TheMovieDB;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.Logger;

import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.model.core.Movie;
import info.movito.themoviedbapi.model.core.TvSeries;
import info.movito.themoviedbapi.model.movies.MovieDb;
import info.movito.themoviedbapi.model.tv.series.TvSeriesDb;
import info.movito.themoviedbapi.tools.appendtoresponse.MovieAppendToResponse;
import watch.pylex.Main;
import java.util.HashMap;
import java.util.Map;

public class TheMovieDB {
    
    private static final Map<String, List<String>> cache = new HashMap<>();
    private static final Map<Integer, MovieDb> movieInfoCache = new HashMap<>();
    private static final Map<Integer, TvSeriesDb> showInfoCache = new HashMap<>();

    public static boolean tryConnection(String key, Logger logger) {
        logger.info("Trying to connect to TheMovieDB API...");
        TmdbApi tmdbApi = new TmdbApi(key);
        try {
            tmdbApi.getGenre().getTvList("en");
            return true;
        } catch (Exception e) {
            logger.error("TheMovieDB connection failed", e);
            return false;
        }
    }

    public static List<String> getTopRatedMoviesIds() {
        String cacheKey = "topRatedMovies";
        if (cache.containsKey(cacheKey)) {
            return cache.get(cacheKey);
        }

        Main.getLogger().info("Fetching popular movies from TheMovieDB API...");
        TmdbApi tmdbApi = new TmdbApi(Main.getConfig().getTmdbApiKey());
        List<String> popularMovies = new ArrayList<>();
        try {
            for (Movie results : tmdbApi.getMovieLists().getTopRated("en-US", 1, "ro").getResults()) {
                popularMovies.add(String.valueOf(results.getId()));
            }
            cache.put(cacheKey, popularMovies);
        } catch (Exception e) {
            Main.getLogger().error("Failed to fetch popular movies", e);
        }
        return popularMovies;
    }

    public static List<String> getPopularMoviesIds() {
        String cacheKey = "popularMovies";
        if (cache.containsKey(cacheKey)) {
            return cache.get(cacheKey);
        }

        Main.getLogger().info("Fetching most rated movies from TheMovieDB API...");
        TmdbApi tmdbApi = new TmdbApi(Main.getConfig().getTmdbApiKey());
        List<String> mostRatedMovies = new ArrayList<>();
        try {
            for (Movie results : tmdbApi.getMovieLists().getPopular("en-US", 1, "ro").getResults()) {
                mostRatedMovies.add(String.valueOf(results.getId()));
            }
            cache.put(cacheKey, mostRatedMovies);
        } catch (Exception e) {
            Main.getLogger().error("Failed to fetch most rated movies", e);
        }
        return mostRatedMovies;
    }

    public static List<String> getPopularShowsIds() {
        String cacheKey = "popularTvShows";
        if (cache.containsKey(cacheKey)) {
            return cache.get(cacheKey);
        }

        Main.getLogger().info("Fetching most rated shows from TheMovieDB API...");
        TmdbApi tmdbApi = new TmdbApi(Main.getConfig().getTmdbApiKey());
        List<String> mostRatedMovies = new ArrayList<>();
        try {
            for (TvSeries results : tmdbApi.getTvSeriesLists().getPopular("en-US", 1).getResults()) {
                mostRatedMovies.add(String.valueOf(results.getId()));
            }
            cache.put(cacheKey, mostRatedMovies);
        } catch (Exception e) {
            Main.getLogger().error("Failed to fetch most rated shows", e);
        }
        return mostRatedMovies;
    }

    public static List<String> getTopRatedShowsIds() {
        String cacheKey = "topRatedTvShows";
        if (cache.containsKey(cacheKey)) {
            return cache.get(cacheKey);
        }

        Main.getLogger().info("Fetching popular shows from TheMovieDB API...");
        TmdbApi tmdbApi = new TmdbApi(Main.getConfig().getTmdbApiKey());
        List<String> popularMovies = new ArrayList<>();
        try {
            for (TvSeries results : tmdbApi.getTvSeriesLists().getTopRated("en-US", 1).getResults()) {
                popularMovies.add(String.valueOf(results.getId()));
            }
            cache.put(cacheKey, popularMovies);
        } catch (Exception e) {
            Main.getLogger().error("Failed to fetch popular shows", e);
        }
        return popularMovies;
    }

    

    public static MovieDb getMovieInfo(int movieId) {
        if (movieInfoCache.containsKey(movieId)) {
            return movieInfoCache.get(movieId);
        }

        Main.getLogger().info("Fetching movie info from TheMovieDB API for movie ID: " + movieId);
        TmdbApi tmdbApi = new TmdbApi(Main.getConfig().getTmdbApiKey());
        try {
            MovieDb movieInfo = tmdbApi.getMovies().getDetails(movieId, "en-US", new MovieAppendToResponse[0]);
            movieInfoCache.put(movieId, movieInfo);
            return movieInfo;
        } catch (Exception e) {
            Main.getLogger().error("Failed to fetch movie info for movie ID: " + movieId, e);
            return null;
        }
    }

    public static TvSeriesDb  getShowInfo(int showId) {
        if (movieInfoCache.containsKey(showId)) {
            return showInfoCache.get(showId);
        }

        Main.getLogger().info("Fetching show info from TheMovieDB API for show ID: " + showId);
        TmdbApi tmdbApi = new TmdbApi(Main.getConfig().getTmdbApiKey());
        try {
            TvSeriesDb  showInfo = tmdbApi.getTvSeries().getDetails(showId, "en-US");
            showInfoCache.put(showId, showInfo);
            return showInfo;
        } catch (Exception e) {
            Main.getLogger().error("Failed to fetch show info for show ID: " + showId, e);
            return null;
        }
    }
}
