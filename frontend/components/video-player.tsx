"use client";

import { ArrowLeft, StepForward } from 'lucide-react';
import type { MediaType } from '@/types/MediaType';

interface VideoPlayerProps {
  title: string;
  type: MediaType;
  id: string;
  season?: number;
  episode?: number;
  onBack: () => void;
  onNextEpisode?: () => void;
  onPause?: () => void;
}

export function VideoPlayer({ 
  title, 
  type, 
  id, 
  season, 
  episode, 
  onBack, 
  onNextEpisode, 
  //onPause 
}: VideoPlayerProps) {
  function getSource() {
    let url = `https://vidsrc.xyz/embed/${type === 'series' ? 'tv' : type}?tmdb=${id}`;
    if (window.location.origin) url += `&o=${encodeURIComponent(window.location.origin)}`;
    if (type === 'series' && season && episode) {
      url += `&season=${season}&episode=${episode}`;
    }
    return url;
  }

  return (
    <div className="relative w-full h-full bg-black">
      <div className="absolute top-4 left-4 z-50 flex items-center gap-4">
        <button
          onClick={() => onBack()}
          className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        {onNextEpisode && (
          <button
            onClick={onNextEpisode}
            className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <StepForward className="w-5 h-5 text-white" />
          </button>
        )}
      </div>
      
      <iframe
        title={title}
        src={getSource()}
        className="absolute inset-0 w-full h-full"
        allowFullScreen
        allow="fullscreen"
        referrerPolicy="origin"
      />
    </div>
  );
}