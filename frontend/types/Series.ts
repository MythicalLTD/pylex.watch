export interface Series {
  id: number;
  title: string;
  description: string;
  genres: { id: number; name: string }[];
  date: string;
  rating: number;
  seasons: number;
  images: {
    backdrop: string;
    poster: string;
    logo: string;
  };
}
