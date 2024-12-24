"use client";

/* eslint-disable */

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { VideoPlayer } from '@/components/video-player';
import type { MediaType } from '@/types/MediaType';
import type { Movie } from '@/types/Movie';
import type { Series } from '@/types/Series';
import type { MediaShort } from '@/types/MediaShort';

interface WatchContentProps {
  id: string;
}

export function WatchContent({ id }: WatchContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [type, setType] = useState<MediaType>('movie');
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [maxEpisodes, setMaxEpisodes] = useState(1);
  const [data, setData] = useState<Movie | Series>();
  const [showTitleDetails, setShowTitleDetails] = useState(false);
  console.log(showTitleDetails);
  function addViewed(data: MediaShort) {
    let viewed: MediaShort[] = [];
    const storage = localStorage.getItem('viewed');
    if (storage) {
      viewed = JSON.parse(storage);
    }
    const index = viewed.findIndex(v => v.id === data.id && v.type === data.type);
    if (index !== -1) {
      viewed.splice(index, 1);
    }
    viewed.unshift(data);
    viewed = viewed.slice(0, 15);
    localStorage.setItem('viewed', JSON.stringify(viewed));
  }

  function getTitle() {
    let title = data ? data.title : 'Watch';
    if (type === 'series') title += ` S${season} E${episode}`;
    return title;
  }

  async function getData(_type: MediaType) {
    const req = await fetch(`https://api.rypr.ru/${_type}/${id}`);
    const res = await req.json();
    if (!res.success) return;
    const data: Movie | Series = res.data;
    setData(data);
    addViewed({
      id: data.id,
      poster: data.images.poster,
      title: data.title,
      description: data.description,
      type: _type,
    });
  }

  async function getMaxEpisodes(season: number) {
    const req = await fetch(`https://api.rypr.ru/episodes/${id}?s=${season}`);
    const res = await req.json();
    if (!res.success) {
      router.push('/');
      return;
    }
    setMaxEpisodes(res.data.length);
  }

  useEffect(() => {
    if (!data) return;
    if (!('seasons' in data)) return;
    if (season > data.seasons) {
      router.push('/');
      return;
    }
    if (episode > maxEpisodes) {
      router.push('/');
      return;
    }
  }, [data, maxEpisodes, season, episode, router]);

  useEffect(() => {
    const fetchData = async () => {
      const seasonParam = searchParams.get('season');
      const episodeParam = searchParams.get('episode');
      const me = searchParams.get('me');

      if (!seasonParam || !episodeParam) {
        setType('movie');
        await getData('movie');
        return;
      }

      setSeason(parseInt(seasonParam));
      setEpisode(parseInt(episodeParam));

      if (me) {
        setMaxEpisodes(parseInt(me));
      } else {
        await getMaxEpisodes(parseInt(seasonParam));
      }

      setType('series');
      await getData('series');

      localStorage.setItem(
        'continue_' + id,
        JSON.stringify({
          season: parseInt(seasonParam),
          episode: parseInt(episodeParam)
        })
      );
    };

    fetchData();
  }, [id, searchParams, getData, getMaxEpisodes]);

  const handleBack = () => {
    const modalParams = new URLSearchParams();
    modalParams.set('modal', id);
    modalParams.set('type', type);
    
    router.push(`/?${modalParams.toString()}`);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black">
      <VideoPlayer
        title={getTitle()}
        type={type}
        id={id}
        season={season}
        episode={episode}
        onBack={handleBack}
        onNextEpisode={
          type === 'series' && episode < maxEpisodes
            ? () => router.push(`/watch/${id}?season=${season}&episode=${episode + 1}&me=${maxEpisodes}`)
            : undefined
        }
        onPause={() => setShowTitleDetails(true)}
      />
    </div>
  );
}
