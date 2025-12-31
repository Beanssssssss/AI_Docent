export type Gallery = {
  id: number;
  name: string;
};

export type Exhibition = {
  id: number;
  name: string;
};

export type Artwork = {
  id: string;
  title: string;
  artist: string;
  image_url?: string;
};

export type ImageSearchResult = {
  score: number;
  artwork: Artwork;
};