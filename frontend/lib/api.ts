import type { MediaType } from '@/types/MediaType';

export async function fetchMovieData() {
  const response = await fetch("https://api.rypr.ru/browse");
  const data = await response.json();
  return data.data;
}

export async function fetchSearchResults(searchQuery: string) {
  const response = await fetch(`https://api.rypr.ru/search?q=${encodeURIComponent(searchQuery)}`);
  const data = await response.json();
  return data;
}

export async function fetchTitleDetails(type: MediaType, id: string) {
  const res = await fetch(`https://api.rypr.ru/${type}/${id}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const json = await res.json();
  return json;
}

export async function fetchEpisodes(id: string, selectedSeason: string) {
  const res = await fetch(`https://api.rypr.ru/episodes/${id}?s=${selectedSeason}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const json = await res.json();
  return json;
}
