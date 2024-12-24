import { MediaType } from "./MediaType";

export interface MediaItem {
    id: number;
    title: string;
    poster: string;
    type: MediaType;
    videoUrl: string;
    images: never[];
    description: string;
}


interface Collection {

    title: string;

    items: MediaItem[];

}



export interface MovieData {

    hero: MediaItem;

    collections: Collection[];

}
