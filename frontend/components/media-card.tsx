"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Check, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TitleDetails } from "@/components/title-details"
import type { MediaShort } from "@/types/MediaShort"

interface MediaCardProps {
  id: number
  title: string
  description: string
  imageUrl: string
  type: "movie" | "series"
}

export function MediaCard({ id, title, description, imageUrl, type }: MediaCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    // Check if item is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]') as MediaShort[];
    setIsWishlisted(wishlist.some(item => item.id === id && item.type === type));
  }, [id, type]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the details modal
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]') as MediaShort[];
    const newWishlisted = !isWishlisted;

    if (newWishlisted) {
      // Add to wishlist
      const newItem: MediaShort = {
        id,
        title,
        poster: imageUrl,
        type,
        description: description
      };
      localStorage.setItem('wishlist', JSON.stringify([...wishlist, newItem]));
    } else {
      // Remove from wishlist
      const filteredWishlist = wishlist.filter(item => !(item.id === id && item.type === type));
      localStorage.setItem('wishlist', JSON.stringify(filteredWishlist));
    }

    setIsWishlisted(newWishlisted);
  };

  return (
    <>
      <Card 
        className="overflow-hidden group/card relative cursor-pointer rounded-xl"
        onClick={() => setShowDetails(true)}
      >
        <CardContent className="p-0">
          <div className="aspect-[2/3] relative">
            <Badge
              variant="secondary"
              className="absolute top-2 right-2 bg-neutral-900 text-neutral-50 z-10 dark:bg-neutral-50 dark:text-neutral-900"
            >
              {type === "movie" ? "Movie" : "TV Show"}
            </Badge>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
              <Button 
                size="icon" 
                className="rounded-full w-10 h-10 bg-white hover:bg-white/90 text-black"
                onClick={handleWishlistClick}
              >
                {isWishlisted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <Plus className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>
          </div>
        </CardContent>
      </Card>
      {showDetails && (
        <TitleDetails
          type={type === "movie" ? "movie" : "series"}
          id={id.toString()}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  )
}

