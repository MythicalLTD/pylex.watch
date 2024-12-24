"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Plus, Check, X, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MediaCard } from "@/components/media-card"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cn } from "@/lib/utils"
import { fetchTitleDetails, fetchEpisodes } from "../lib/api";

interface Genre {
  id: number;
  name: string;
}

interface SuggestedItem {
  description: string
  id: number;
  title: string;
  poster: string;
  type: "movie" | "series";
}

interface Images {
  backdrop: string;
  poster: string;
  logo: string;
}

interface Episode {
  number: number;
  title: string;
  description: string;
  image: string;
  runtime: number;
}

interface TitleData {
  id: number;
  title: string;
  description: string;
  genres: Genre[];
  date: string;
  rating: number;
  runtime?: number;
  seasons?: number;
  images: Images;
  suggested: SuggestedItem[];
}

interface TitleDetailsProps {
  type: "movie" | "series";
  id: string;
  onClose: () => void;
}

// Add interface for wishlist item
interface WishlistItem {
  id: number;
  poster: string;
  title: string;
  type: "movie" | "series";
}

export function TitleDetails({ type, id, onClose }: TitleDetailsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<TitleData | null>(null)
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [maxEpisodes, setMaxEpisodes] = useState(1)
  console.log(maxEpisodes)
  const [wished, setWished] = useState(false)
  const [extendSuggestions, setExtendSuggestions] = useState(false)
  const [extendEpisodes, setExtendEpisodes] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const json = await fetchTitleDetails(type, id.toString());

        if (json.success) {
          setData(json.data)
          if (type === "series") {
            const cont = localStorage.getItem('continue_' + id);
            if (cont) {
              const parsed: { season: number; episode: number } = JSON.parse(cont);
              setSeason(parsed.season);
              setEpisode(parsed.episode);
              fetchEpisodes(id.toString(), parsed.season.toString()).then((episodesRes) => {
                if (episodesRes.success) {
                  setEpisodes(episodesRes.data);
                  setMaxEpisodes(episodesRes.data.length);
                }
              });
            } else {
              fetchEpisodes(id.toString(), (1).toString()).then((episodesRes) => {
                if (episodesRes.success) {
                  setEpisodes(episodesRes.data);
                  setMaxEpisodes(episodesRes.data.length);
                }
              });
            }
          }
        } else {
          throw new Error("API returned unsuccessful response")
        }
      } catch (e) {
        console.error("Failed to fetch title details:", e)
        setError("Failed to fetch title details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, type])

  useEffect(() => {
    const handleOpenTitleDetails = (event: CustomEvent<{ id: number; type: "movie" | "series" }>) => {
      const { id, type } = event.detail;
      // Check wishlist status for new title
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]') as WishlistItem[];
      setWished(wishlist.some(item => item.id === id));

      // Fetch and show the new title details
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
          const json = await fetchTitleDetails(type, id.toString());

          if (json.success) {
            setData(json.data);
            if (type === "series") {
              const cont = localStorage.getItem('continue_' + id);
              if (cont) {
                const parsed: { season: number; episode: number } = JSON.parse(cont);
                setSeason(parsed.season);
                setEpisode(parsed.episode);
                fetchEpisodes(id.toString(), parsed.season.toString()).then((episodesRes) => {
                  if (episodesRes.success) {
                    setEpisodes(episodesRes.data);
                    setMaxEpisodes(episodesRes.data.length);
                  }
                });
              } else {
                fetchEpisodes(id.toString(), (1).toString()).then((episodesRes) => {
                  if (episodesRes.success) {
                    setEpisodes(episodesRes.data);
                    setMaxEpisodes(episodesRes.data.length);
                  }
                });
              }
            }
          } else {
            throw new Error("API returned unsuccessful response");
          }
        } catch (e) {
          console.error("Failed to fetch title details:", e);
          setError("Failed to fetch title details. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    };

    window.addEventListener('openTitleDetails', handleOpenTitleDetails as EventListener);
    return () => {
      window.removeEventListener('openTitleDetails', handleOpenTitleDetails as EventListener);
    };
  }, [id, type]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]') as WishlistItem[];
    setWished(wishlist.some(item => item.id === data?.id));
  }, [data]);

  const handleSeasonChange = (value: string) => {
    const selectedSeason = parseInt(value);
    setSeason(selectedSeason);
    fetchEpisodes(id.toString(), selectedSeason.toString()).then((episodesRes) => {
      if (episodesRes.success) {
        setEpisodes(episodesRes.data);
        setMaxEpisodes(episodesRes.data.length);
      }
    });
  };

  const handleWishlistToggle = () => {
    if (!data) return;
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]') as WishlistItem[];
    const newWished = !wished;

    if (newWished) {
      // Add to wishlist
      const newItem: WishlistItem = {
        id: data.id,
        poster: data.images.poster,
        title: data.title,
        type: type
      };
      localStorage.setItem('wishlist', JSON.stringify([...wishlist, newItem]));
    } else {
      // Remove from wishlist
      const filteredWishlist = wishlist.filter(item => item.id !== data.id);
      localStorage.setItem('wishlist', JSON.stringify(filteredWishlist));
    }

    setWished(newWished);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Stop if clicking inside the modal
      if (ref.current?.contains(event.target as Node)) {
        return;
      }

      // Stop if clicking inside any select dropdown
      const target = event.target as HTMLElement;
      if (target.closest('[data-radix-popper-content-wrapper]')) {
        return;
      }

      // Only close if clicking the backdrop
      const isBackdrop = (event.target as HTMLElement).classList.contains('modal-backdrop');
      if (isBackdrop) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg dark:bg-neutral-950">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-80 z-50 overflow-y-auto rounded-lg modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="relative bg-white max-w-4xl mx-auto my-10 rounded-2xl shadow-lg overflow-hidden dark:bg-neutral-950"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 rounded-3xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="p-6">
            <div className="p-3 border border-red-500/50 bg-red-500/10 text-white rounded-md">
              ⚠️ {error || "Unable to load content. Please try again later."}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 overflow-y-auto rounded-lg modal-backdrop"
      onClick={(e) => {
        // Only close if clicking directly on the backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={ref}
        className="relative bg-white max-w-4xl mx-auto my-10 rounded-2xl shadow-lg overflow-hidden dark:bg-neutral-950"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 rounded-3xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="relative h-[40vh] md:h-[50vh]">
          <Image
            src={data.images.backdrop}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <Badge variant="secondary">{data.rating}% Match</Badge>
              <span>{new Date(data.date).getFullYear()}</span>
              {type === "movie" ? (
                <span>{Math.floor((data.runtime || 0) / 60)}h {(data.runtime || 0) % 60}m</span>
              ) : (
                <span>{data.seasons} Seasons</span>
              )}
            </div>
            <p className="text-lg">{data.description}</p>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href={`/watch/${id}${type === 'series' ? `?season=${season}&episode=${episode}` : ''}`} passHref>
                  <span className="flex items-center">
                    <Play className="mr-2 h-4 w-4" /> {type === 'series' ? `S${season} E${episode}` : 'Play'}
                  </span>
                </Link>
              </Button>
              <Button variant="outline" onClick={handleWishlistToggle}>
                {wished ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {wished ? "Added" : "Wishlist"}
              </Button>
            </div>
            {type === "series" && (
              <SelectPrimitive.Root
                defaultValue={season.toString()}
                onValueChange={handleSeasonChange}
              >
                <SelectPrimitive.Trigger
                  className={cn(
                    "flex h-10 w-[120px] items-center justify-between rounded-md bg-transparent px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <SelectPrimitive.Value placeholder="Season" />
                  <SelectPrimitive.Icon>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </SelectPrimitive.Icon>
                </SelectPrimitive.Trigger>

                <SelectPrimitive.Portal>
                  <SelectPrimitive.Content
                    className={cn(
                      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
                      "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
                    )}
                    position="popper"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SelectPrimitive.Viewport
                      className="p-1 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                    >
                      {Array.from({ length: data.seasons || 0 }, (_, i) => i + 1).map((season) => (
                        <SelectPrimitive.Item
                          key={season}
                          value={season.toString()}
                          className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50"
                        >
                          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                            <SelectPrimitive.ItemIndicator>
                              <Check className="h-4 w-4" />
                            </SelectPrimitive.ItemIndicator>
                          </span>
                          <SelectPrimitive.ItemText>Season {season}</SelectPrimitive.ItemText>
                        </SelectPrimitive.Item>
                      ))}
                    </SelectPrimitive.Viewport>
                  </SelectPrimitive.Content>
                </SelectPrimitive.Portal>
              </SelectPrimitive.Root>
            )}
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {data.genres.map((genre) => (
                <Badge key={genre.id} variant="outline">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
          {type === "series" && (
            <div className="mb-6">
              {episodes.some(episode => episode.image?.includes('w500null')) && (
                <div className="mb-4 p-3 border border-amber-500/50 bg-amber-500/10 text-white rounded-md">
                  ⚠️ Some episodes may not be released yet or their images may fail to load
                </div>
              )}
              <h3 className="text-xl font-semibold mb-4">Episodes</h3>
              <div className="space-y-4">
                {episodes.map((episode) => (
                  <Link key={episode.number} href={`/watch/${id}?season=${season}&episode=${episode.number}`}>
                    <div className="flex items-center p-5 border-b border-white/10 cursor-pointer hover:bg-white/5">
                      <h2 className="text-[#c9c9c9] min-w-[70px] text-2xl font-medium text-center">{episode.number}</h2>
                      <Image
                        src={episode.image?.includes('w500null') ? data.images.backdrop : episode.image}
                        alt={episode.title}
                        width={130}
                        height={73}
                        className="w-full max-w-[130px] aspect-video rounded-md object-cover"
                      />
                      <div className="ml-5 flex-1">
                        <div className="flex items-center">
                          <h4 className="text-[15px] font-semibold">{episode.title}</h4>
                          <span className="ml-auto text-[15px] font-medium">
                            {episode.runtime ? `${Math.floor(episode.runtime / 60)}h ${episode.runtime % 60}m` : 'N/A'}
                          </span>
                        </div>
                        {episode.description && (
                          <p className="mt-2.5 text-[14px] text-[#c9c9c9]">{episode.description}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {episodes.length > 10 && (
                <div className="title-extend">
                  <button className="button secondary" onClick={() => setExtendEpisodes(!extendEpisodes)}>
                    {extendEpisodes ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              )}
            </div>
          )}
          {data.suggested && data.suggested.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">More Like This</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.suggested.slice(0, extendSuggestions ? undefined : 10).map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => {
                      // Dispatch event to open new title details
                      const event = new CustomEvent('openTitleDetails', {
                        detail: { id: item.id, type: item.type }
                      });
                      window.dispatchEvent(event);
                    }}
                  >
                    <MediaCard
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      imageUrl={item.poster}
                      type={item.type} />
                  </div>
                ))}
              </div>
              {data.suggested.length > 10 && (
                <Button
                  variant="ghost"
                  className="w-full mt-4"
                  onClick={() => setExtendSuggestions(!extendSuggestions)}
                >
                  {extendSuggestions ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" /> Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" /> Show More
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
