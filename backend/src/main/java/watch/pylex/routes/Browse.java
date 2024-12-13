package watch.pylex.routes;

import spark.Request;
import spark.Response;
import watch.pylex.Main;
import watch.pylex.Movie.Movies;
import watch.pylex.TheMovieDB.TheMovieDB;

import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import info.movito.themoviedbapi.model.movies.MovieDb;
import info.movito.themoviedbapi.model.tv.series.TvSeriesDb;
import java.util.concurrent.TimeUnit;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

public class Browse extends Route {
    private static final Cache<String, String> cache = CacheBuilder.newBuilder()
            .expireAfterWrite(1, TimeUnit.HOURS)
            .build();

    public Browse() {
        super("/browse", "GET");
    }

    @Override
    public Object handle(Request request, Response response) {
        String cacheKey = "browseResponse";
        String cachedResponse = cache.getIfPresent(cacheKey);

        if (cachedResponse != null) {
            response.type("application/json");
            Main.getLogger().info("Serving cached response for /browse");
            return cachedResponse;
        }

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("success", true);

        JSONObject hero = new JSONObject();
        hero.put("id", 1184918);
        hero.put("type", "movie");
        hero.put("title", "The Wild Robot");
        hero.put("description",
                "After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island's animals and cares for an orphaned baby goose.");

        JSONObject images = new JSONObject();
        images.put("logo", "https://image.tmdb.org/t/p/w500/xvXJfGKjHHe1m4Usye198DCw7iJ.png");
        images.put("backdrop", "https://image.tmdb.org/t/p/original/mQZJoIhTEkNhCYAqcHrQqhENLdu.jpg");
        hero.put("images", images);

        JSONObject data = new JSONObject();
        data.put("hero", hero);

        // Add collections
        JSONArray collections = new JSONArray();

        JSONObject trendingMovies = new JSONObject();
        trendingMovies.put("title", "Trending Movies");
        JSONArray trendingMoviesItems = new JSONArray();

        Gson gson = new Gson();
        JsonArray jsonArray = new JsonArray();

        List<String> popularMovies = Movies.getPopularMoviesIDS();

        for (String movie : popularMovies) {
            int MovieID = Integer.parseInt(movie);
            MovieDb movieInfo = TheMovieDB.getMovieInfo(MovieID);
            String bg = movieInfo.getPosterPath();
            String title = movieInfo.getTitle();
            List<String> genres = movieInfo.getGenres().stream()
                    .map(genre -> genre.getName())
                    .collect(Collectors.toList());
            String overview = movieInfo.getOverview();
            String type = "movie";

            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("title", title);
            jsonObject.add("genres", gson.toJsonTree(genres));
            jsonObject.addProperty("overview", overview);
            jsonObject.addProperty("poster", "https://image.tmdb.org/t/p/w300/" + bg);
            jsonObject.addProperty("type", type);
            jsonObject.addProperty("id", MovieID);

            jsonArray.add(jsonObject);
        }

        for (int i = 0; i < jsonArray.size(); i++) {
            trendingMoviesItems.put(new JSONObject(gson.toJson(jsonArray.get(i))));
        }

        JSONObject mostRatedMovies = new JSONObject();
        mostRatedMovies.put("title", "Most Rated Movies");
        JSONArray mostRatedMoviesItems = new JSONArray();

        List<String> topRatedMovies = Movies.getTopRatedMoviesIDS();

        for (String movie : topRatedMovies) {
            int MovieID = Integer.parseInt(movie);
            MovieDb movieInfo = TheMovieDB.getMovieInfo(MovieID);
            String bg = movieInfo.getPosterPath();
            String title = movieInfo.getTitle();
            List<String> genres = movieInfo.getGenres().stream()
                    .map(genre -> genre.getName())
                    .collect(Collectors.toList());
            String overview = movieInfo.getOverview();
            String type = "movie";

            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("title", title);
            jsonObject.add("genres", gson.toJsonTree(genres));
            jsonObject.addProperty("overview", overview);
            jsonObject.addProperty("poster", "https://image.tmdb.org/t/p/w300/" + bg);
            jsonObject.addProperty("type", type);
            jsonObject.addProperty("id", MovieID);

            mostRatedMoviesItems.put(new JSONObject(gson.toJson(jsonObject)));
        }

        JSONObject trendingShows = new JSONObject();
        trendingShows.put("title", "Trending Shows");
        JSONArray trendingShowsItems = new JSONArray();

        List<String> popularShows = Movies.getPopularTvShows();

        for (String show : popularShows) {
            int ShowID = Integer.parseInt(show);
            TvSeriesDb showInfo = TheMovieDB.getShowInfo(ShowID);
            String bg = showInfo.getPosterPath();
            String title = showInfo.getName();
            List<String> genres = showInfo.getGenres().stream()
                    .map(genre -> genre.getName())
                    .collect(Collectors.toList());
            String overview = showInfo.getOverview();
            String type = "series";

            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("title", title);
            jsonObject.add("genres", gson.toJsonTree(genres));
            jsonObject.addProperty("overview", overview);
            jsonObject.addProperty("poster", "https://image.tmdb.org/t/p/w300/" + bg);
            jsonObject.addProperty("type", type);
            jsonObject.addProperty("id", ShowID);

            trendingShowsItems.put(new JSONObject(gson.toJson(jsonObject)));
        }

        JSONObject mostRatedShows = new JSONObject();
        mostRatedShows.put("title", "Most Rated Shows");
        JSONArray mostRatedShowsItems = new JSONArray();

        List<String> topRatedShows = Movies.getTvTopRatedShows();

        for (String show : topRatedShows) {
            int ShowID = Integer.parseInt(show);
            TvSeriesDb showInfo = TheMovieDB.getShowInfo(ShowID);
            String bg = showInfo.getPosterPath();
            String title = showInfo.getName();
            List<String> genres = showInfo.getGenres().stream()
                    .map(genre -> genre.getName())
                    .collect(Collectors.toList());
            String overview = showInfo.getOverview();
            String type = "series";

            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("title", title);
            jsonObject.add("genres", gson.toJsonTree(genres));
            jsonObject.addProperty("overview", overview);
            jsonObject.addProperty("poster", "https://image.tmdb.org/t/p/w300/" + bg);
            jsonObject.addProperty("type", type);
            jsonObject.addProperty("id", ShowID);

            mostRatedShowsItems.put(new JSONObject(gson.toJson(jsonObject)));
        }

        mostRatedMovies.put("items", mostRatedMoviesItems);
        collections.put(mostRatedMovies);
        trendingMovies.put("items", trendingMoviesItems);
        collections.put(trendingMovies);

        mostRatedShows.put("items", mostRatedShowsItems);
        collections.put(mostRatedShows);
        trendingShows.put("items", trendingShowsItems);
        collections.put(trendingShows);

        data.put("collections", collections);

        jsonResponse.put("data", data);

        String responseString = jsonResponse.toString();
        cache.put(cacheKey, responseString);

        response.type("application/json");
        return responseString;
    }
}
