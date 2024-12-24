"use client"

import { useRef } from "react"
import { MediaCard } from "@/components/media-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MediaItem {
  description: string
  id: number;
  title: string;
  poster: string;
  type: "movie" | "series";
}

interface MediaCollectionProps {
  title: string;
  items: MediaItem[];
}

export function MediaCollection({ title, items }: MediaCollectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="mb-12 relative">
      <div className="px-4 md:px-8 mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="group/slider relative">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide px-4 md:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[240px]">
              <MediaCard
                id={item.id}
                title={item.title}
                description={item.description}
                imageUrl={item.poster}
                type={item.type}
              />
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/5 backdrop-blur-md rounded-full hidden group-hover/slider:flex z-10 ml-2 hover:bg-white/20 hover:backdrop-blur-lg"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/5 backdrop-blur-md rounded-full hidden group-hover/slider:flex z-10 mr-2 hover:bg-white/20 hover:backdrop-blur-lg"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  )
}
