"use client";

import { Suspense } from "react";
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MediaCollection } from "@/components/media-collection"
import { fetchMovieData } from "@/lib/api"
import { Footer } from "@/components/footer";
import { useEffect, useState } from "react";
import { TitleDetails } from "@/components/title-details";
import type { MediaType } from "@/types/MediaType";
import type { MovieData, MediaItem } from "@/types/MediaItem";
import { useSearchParams } from "next/navigation";

// Create a separate component for the content that uses useSearchParams
function HomeContent() {
  const searchParams = useSearchParams();
  const modalId = searchParams?.get('modal');
  const modalType = searchParams?.get('type');
  const [showTitleDetails, setShowTitleDetails] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<{ id: string; type: MediaType } | null>(null);
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  const openTitleDetails = (id: string, type: MediaType) => {
    setSelectedTitle({ id, type });
    setShowTitleDetails(true);
  };

  useEffect(() => {
    if (modalId && modalType && (modalType === 'movie' || modalType === 'series')) {
      openTitleDetails(modalId, modalType);
    }
  }, [modalId, modalType]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieData();
      if (data.hero) {
        data.hero = {
          ...data.hero,
          description: data.hero.description || '',
          images: data.hero.images || [],
          videoUrl: data.hero.videoUrl || ''
        };
      }
      setMovieData(data);
    };
    getData();
  }, []);

  if (!movieData) return null;

  return (
    <main className="bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
      <Navbar />
      <HeroSection heroData={{
        ...movieData.hero,
        id: Number(movieData.hero.id),
        description: movieData.hero?.description || '',
        images: Array.isArray(movieData.hero?.images) ? { logo: '', backdrop: '' } : (movieData.hero?.images || { logo: '', backdrop: '' }),
        videoUrl: movieData.hero?.videoUrl || ''
      }} />
      <div className="py-8">
        {movieData.collections.map((collection, index: number) => (
          <MediaCollection
            key={index}
            title={collection.title}
            items={collection.items as MediaItem[]}
          />
        ))}
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

// Main page component with Suspense
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

