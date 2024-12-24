"use client"

import Image from "next/image"
import { Play, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { TitleDetails } from "./title-details"

interface HeroData {
  id: number;
  type: string;
  title: string;
  description: string;
  images: {
    logo: string;
    backdrop: string;
  };
  videoUrl: string; // Add videoUrl to the HeroData interface
}

export function HeroSection({ heroData }: { heroData: HeroData }) {
  const [showTitleDetails, setShowTitleDetails] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<{ id: number; type: string } | null>(null);

  const handleMoreInfo = () => {
    setSelectedTitle({ id: heroData.id, type: heroData.type });
    setShowTitleDetails(true);
  };

  const handlePlay = () => {
    const baseUrl = `/watch/${heroData.id}`;
    const url = heroData.type === 'series' ? `${baseUrl}?season=1&episode=1` : baseUrl;
    window.location.href = url;
  };

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[80vh] lg:h-screen">
      {/* Backdrop Image Container */}
      <div className="absolute inset-0">
        <Image
          src={heroData.images.backdrop}
          alt={heroData.title}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-20 md:pt-24 lg:pt-32">
          <div className="max-w-2xl space-y-4 md:space-y-6">
            {/* Logo */}
            <div className="relative w-[200px] sm:w-[250px] md:w-[300px] h-[60px] sm:h-[75px] md:h-[90px]">
              <Image
                src={heroData.images.logo}
                alt={heroData.title}
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-white/90 line-clamp-3 md:line-clamp-4">
              {heroData.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" className="w-full sm:w-auto" onClick={handlePlay}>
                <Play className="mr-2 h-4 w-4" /> Play
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleMoreInfo}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              >
                <Info className="mr-2 h-4 w-4" /> More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Title Details Modal */}
      {showTitleDetails && selectedTitle && (
        <TitleDetails
          id={selectedTitle.id.toString()}
          type={selectedTitle.type as "movie" | "series"}
          onClose={() => setShowTitleDetails(false)}
        />
      )}
    </section>
  )
}