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
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg max-w-3xl">
              {/* Logo */}
              <div className="relative w-[250px] sm:w-[300px] md:w-[350px] h-[80px] sm:h-[100px] md:h-[120px] mb-6">
              <Image
                src={heroData.images.logo}
                alt={heroData.title}
                fill
                className="object-contain object-left"
                priority
              />
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed">
              {heroData.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-4">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-medium"
                onClick={handlePlay}
              >
                <Play className="mr-2 h-5 w-5" /> Play
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleMoreInfo}
                className="px-8 py-6 text-lg font-medium bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              >
                <Info className="mr-2 h-5 w-5" /> More Info
              </Button>
              </div>
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