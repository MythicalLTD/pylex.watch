"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Genre {
  id: number;
  name: string;
}

const GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

interface GenreFilterProps {
  selectedGenres: number[];
  onGenreToggle: (genreId: number) => void;
}

export function GenreFilter({ selectedGenres, onGenreToggle }: GenreFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -200 : 200;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Filter by Genre</h3>
      <div className="relative px-8">
        <div 
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {GENRES.map((genre) => (
            <Button
              key={genre.id}
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full whitespace-nowrap flex-shrink-0 border transition-all duration-200",
                selectedGenres.includes(genre.id) 
                  ? "bg-white/5 text-white border-white/5 hover:bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
              onClick={() => onGenreToggle(genre.id)}
            >
              {genre.name}
            </Button>
          ))}
        </div>
        <div 
          className="absolute left-0 top-[35%] -translate-y-1/2 cursor-pointer z-10 h-full flex items-center bg-gradient-to-r from-background from-5% to-transparent to-50% pl-2 pr-4 hover:text-white/80 transition-colors"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </div>
        <div 
          className="absolute right-0 top-[35%] -translate-y-1/2 cursor-pointer z-10 h-full flex items-center bg-gradient-to-l from-background from-5% to-transparent to-50% pr-2 pl-4 hover:text-white/80 transition-colors"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
} 