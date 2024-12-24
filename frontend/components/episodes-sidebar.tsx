"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface EpisodesSidebarProps {
  currentSeason: number;
  currentEpisode: number;
  maxEpisodes: number;
  totalSeasons: number;
  onEpisodeSelect: (season: number, episode: number) => void;
}

export function EpisodesSidebar({
  currentSeason,
  currentEpisode,
  maxEpisodes,
  totalSeasons,
  onEpisodeSelect,
}: EpisodesSidebarProps) {
  return (
    <div className="bg-zinc-900/95 rounded-lg p-4">
      <div className="mb-4">
        <select
          value={currentSeason}
          onChange={(e) => onEpisodeSelect(parseInt(e.target.value), 1)}
          className="w-full bg-zinc-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {Array.from({ length: totalSeasons }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Season {i + 1}
            </option>
          ))}
        </select>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-2">
          {Array.from({ length: maxEpisodes }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onEpisodeSelect(currentSeason, i + 1)}
              className={cn(
                "w-full text-left p-3 rounded-md transition-colors",
                currentEpisode === i + 1
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-zinc-800 text-zinc-300"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Episode {i + 1}</span>
                {currentEpisode === i + 1 && (
                  <span className="text-xs bg-zinc-800 px-2 py-1 rounded">
                    Playing
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}