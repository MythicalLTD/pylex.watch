"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MediaCard } from "@/components/media-card";
import { TitleDetails } from "@/components/title-details";
import { GenreFilter } from "@/components/genre-filter";
import { fetchSearchResults, fetchTitleDetails } from "@/lib/api";
import type { MediaType } from "@/types/MediaType";
import type { MediaShort } from "@/types/MediaShort";

interface Genre {
  id: number;
  name: string;
}

interface SearchResult extends MediaShort {
  description: string;
  rating?: number;
  date?: string;
  genre_ids: Genre[];
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [movies, setMovies] = useState<SearchResult[]>([]);
  const [series, setSeries] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTitleDetails, setShowTitleDetails] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<{ id: string; type: MediaType } | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  useEffect(() => {
    const searchContent = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const data = await fetchSearchResults(query);
        if (data.success) {
          // Fetch full details for movies
          const moviesWithDetails = await Promise.all(
            data.data
              .filter((item: SearchResult) => item.type === 'movie')
              .map(async (item: SearchResult) => {
                const details = await fetchTitleDetails('movie', item.id.toString());
                return {
                  ...item,
                  genre_ids: details.success ? details.data.genres : []
                };
              })
          );

          // Fetch full details for series
          const seriesWithDetails = await Promise.all(
            data.data
              .filter((item: SearchResult) => item.type === 'series')
              .map(async (item: SearchResult) => {
                const details = await fetchTitleDetails('series', item.id.toString());
                return {
                  ...item,
                  genre_ids: details.success ? details.data.genres : []
                };
              })
          );


          setMovies(moviesWithDetails);
          setSeries(seriesWithDetails);
        }
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    searchContent();
  }, [query]);

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const filterByGenres = (items: SearchResult[]) => {
    if (selectedGenres.length === 0) return items;
    return items.filter(item =>
      selectedGenres.some(selectedGenre =>
        item.genre_ids.some(genre => genre.id === selectedGenre)
      )
    );
  };

  const filteredMovies = filterByGenres(movies);
  const filteredSeries = filterByGenres(series);

  const handleCardClick = (id: number, type: MediaType) => {
    setSelectedTitle({ id: id.toString(), type });
    setShowTitleDetails(true);
  };

  return (
    <main className="min-h-screen bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-8 flex-1">
        <h1 className="text-3xl font-bold mb-8">
          {query ? `Search results for "${query}"` : 'Search'}
        </h1>

        {query && !loading && (movies.length > 0 || series.length > 0) && (
          <GenreFilter
            selectedGenres={selectedGenres}
            onGenreToggle={handleGenreToggle}
          />
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            {/* Movies Section */}
            {filteredMovies.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredMovies.map((movie) => (
                    <div
                      key={`movie-${movie.id}`}
                      onClick={() => handleCardClick(movie.id, 'movie')}
                    >
                      <MediaCard
                        id={movie.id}
                        title={movie.title}
                        description={movie.description}
                        imageUrl={movie.poster}
                        type="movie"  />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Series Section */}
            {filteredSeries.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">TV Shows</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredSeries.map((show) => (
                    <div
                      key={`series-${show.id}`}
                      onClick={() => handleCardClick(show.id, 'series')}
                    >
                      <MediaCard
                        id={show.id}
                        title={show.title}
                        description={show.description}
                        imageUrl={show.poster}
                        type="series" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!loading && filteredMovies.length === 0 && filteredSeries.length === 0 && query && (
              <div className="text-center py-12 text-gray-500">
                <p>No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-sm mt-2">Try searching for something else or adjusting your filters</p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      {showTitleDetails && selectedTitle && (
        <TitleDetails
          id={selectedTitle.id}
          type={selectedTitle.type}
          onClose={() => setShowTitleDetails(false)}
        />
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
} 