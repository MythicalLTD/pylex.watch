package watch.pylex.Movie;

import java.util.List;

import watch.pylex.TheMovieDB.TheMovieDB;
import watch.pylex.VidSRC.VidSRC;

public class Movies {
    public static List<String> getPopularMoviesIDS() {
        List<String> popularMovies = TheMovieDB.getPopularMoviesIds();
        List<String> vidSrcMovies = VidSRC.getMoviesIds();

        popularMovies.retainAll(vidSrcMovies);
        return popularMovies;
    }  

    public static List<String> getTopRatedMoviesIDS() {
        List<String> topRatedMovies = TheMovieDB.getTopRatedMoviesIds();
        List<String> vidSrcMovies = VidSRC.getMoviesIds();

        topRatedMovies.retainAll(vidSrcMovies);
        return topRatedMovies;
    }

    public static List<String> getTvTopRatedShows() {
        List<String> trendingMovies = TheMovieDB.getTopRatedShowsIds();
        List<String> vidSrcMovies = VidSRC.getShowsIds();

        trendingMovies.retainAll(vidSrcMovies);
        return trendingMovies;
    }

    public static List<String> getPopularTvShows() {
        List<String> trendingMovies = TheMovieDB.getPopularShowsIds();
        List<String> vidSrcMovies = VidSRC.getShowsIds();

        trendingMovies.retainAll(vidSrcMovies);
        return trendingMovies;
    }
}
