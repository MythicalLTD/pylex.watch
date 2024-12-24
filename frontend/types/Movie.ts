export interface Movie {
  id: number;
  title: string;
  description: string;
  genres: { id: number; name: string }[];
  date: string;
  rating: number;
  runtime: number;
  images: {
    backdrop: string;
    poster: string;
    logo: string;
  };
}
