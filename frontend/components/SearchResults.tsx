"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import type { SearchResult } from "@/types/SearchResult"

interface SearchResultsProps {
  results: SearchResult[]
  loading: boolean
}

export function SearchResults({ results, loading }: SearchResultsProps) {
  const router = useRouter()

  if (loading) {
    return <p className="px-4 py-3 text-sm text-gray-500">Searching...</p>
  }

  if (!results.length) {
    return <p className="px-4 py-3 text-sm text-gray-500">No results found</p>
  }

  const handleSearchResultClick = (result: SearchResult) => {
    if (result.type === 'series') {
      // Check localStorage for continue watching data
      const continueWatching = localStorage.getItem(`continue_${result.id}`);
      
      if (continueWatching) {
        // If they have watched before, get their progress
        const { season, episode } = JSON.parse(continueWatching);
        router.push(`/watch/${result.id}?season=${season}&episode=${episode}`);
      } else {
        // If first time watching, start from season 1, episode 1
        router.push(`/watch/${result.id}?season=1&episode=1`);
      }
    } else {
      // For movies, just go to the watch page
      router.push(`/watch/${result.id}`);
    }
  }

  return results.map(result => (
    <div
      key={result.id}
      onClick={() => handleSearchResultClick(result)}
      className="flex items-start px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer group"
    >
      <div className="relative flex-shrink-0 w-[80px] h-[120px] rounded-md overflow-hidden">
        <Image
          src={result.poster}
          alt={result.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="ml-4 flex flex-col flex-grow min-w-0">
        <h3 className="font-medium text-white text-lg group-hover:text-primary transition-colors truncate">
          {result.title}
        </h3>
        <span className="text-sm text-gray-400 capitalize mt-1">
          {result.type}
        </span>
      </div>
    </div>
  ))
}