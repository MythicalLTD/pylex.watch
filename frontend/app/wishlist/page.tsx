"use client";

import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MediaCard } from "@/components/media-card";
import { TitleDetails } from "@/components/title-details";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MediaType } from "@/types/MediaType";
import type { MediaShort } from "@/types/MediaShort";

interface ContinueWatching extends MediaShort {
    description: string;
    progress?: {
        season: number;
        episode: number;
    };
}

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<MediaShort[]>([]);
    const [continueWatching, setContinueWatching] = useState<ContinueWatching[]>([]);
    const [showTitleDetails, setShowTitleDetails] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState<{ id: string; type: MediaType } | null>(null);

    const continueScrollRef = useRef<HTMLDivElement>(null);
    const wishlistScrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return;

        const scrollAmount = direction === 'left' ? -400 : 400;
        ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    useEffect(() => {
        // Load wishlist from localStorage
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }

        // Load continue watching from localStorage
        const loadContinueWatching = () => {
            const watching: ContinueWatching[] = [];
            const viewed = localStorage.getItem('viewed');

            if (viewed) {
                const viewedItems: MediaShort[] = JSON.parse(viewed);
                viewedItems.forEach(item => {
                    const progress = localStorage.getItem(`continue_${item.id}`);
                    if (progress) {
                        watching.push({
                            ...item,
                            progress: JSON.parse(progress)
                        });
                    } else {
                        watching.push(item);
                    }
                });
            }
            setContinueWatching(watching);
        };

        loadContinueWatching();
    }, []);

    const handleCardClick = (id: number, type: MediaType) => {
        setSelectedTitle({ id: id.toString(), type });
        setShowTitleDetails(true);
    };

    return (
        <main className="min-h-screen bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-8">
                {/* Continue Watching Section */}
                {continueWatching.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">Continue Watching</h2>
                        <div className="group/slider relative">
                            <div
                                ref={continueScrollRef}
                                className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
                            >
                                {continueWatching.map((item) => (
                                    <div
                                        key={`${item.type}-${item.id}`}
                                        className="relative w-[160px] md:w-[200px] flex-none"
                                        onClick={() => handleCardClick(item.id, item.type)}
                                    >
                                        <MediaCard
                                            id={item.id}
                                            title={item.title}
                                            description={item.description}
                                            imageUrl={item.poster}
                                            type={item.type}
                                        />
                                        {item.progress && (
                                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80 text-xs text-white">
                                                S{item.progress.season} E{item.progress.episode}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/5 backdrop-blur-md rounded-full opacity-0 group-hover/slider:opacity-100 z-10 ml-2 hover:bg-white/20 hover:backdrop-blur-lg transition-opacity"
                                onClick={() => scroll("left", continueScrollRef)}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/5 backdrop-blur-md rounded-full opacity-0 group-hover/slider:opacity-100 z-10 mr-2 hover:bg-white/20 hover:backdrop-blur-lg transition-opacity"
                                onClick={() => scroll("right", continueScrollRef)}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>
                    </section>
                )}

                {/* Wishlist Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
                    {wishlist.length > 0 ? (
                        <div className="group/slider relative">
                            <div
                                ref={wishlistScrollRef}
                                className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
                            >
                                {wishlist.map((item) => (
                                    <div
                                        key={`${item.type}-${item.id}`}
                                        className="w-[160px] md:w-[200px] flex-none"
                                        onClick={() => handleCardClick(item.id, item.type)}
                                    >
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
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/5 backdrop-blur-md rounded-full opacity-0 group-hover/slider:opacity-100 z-10 ml-2 hover:bg-white/20 hover:backdrop-blur-lg transition-opacity"
                                onClick={() => scroll("left", wishlistScrollRef)}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/5 backdrop-blur-md rounded-full opacity-0 group-hover/slider:opacity-100 z-10 mr-2 hover:bg-white/20 hover:backdrop-blur-lg transition-opacity"
                                onClick={() => scroll("right", wishlistScrollRef)}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p>Your wishlist is empty</p>
                            <p className="text-sm mt-2">Add movies and TV shows to your wishlist to see them here</p>
                        </div>
                    )}
                </section>
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