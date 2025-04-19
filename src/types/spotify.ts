export type SpotifyTrack = {
  is_playing: boolean;
  item: {
    id: string; // ✅ tambahkan ini
    name: string;
    external_urls: { spotify: string };
    album: {
      name: string;
      images: { url: string }[];
    };
    artists: {
      name: string;
    }[];
  };
  actions: {
    disallows: {
      pausing?: boolean;
      skipping_prev?: boolean;
      resuming?: boolean;
    };
  };
};

// types/spotifyRecommendation.ts

export type SpotifyRecommendationTrack = {
  id: string;
  name: string;
  preview_url: string;
  artists: {
    id: string;
    name: string;
  }[];
  external_urls: {
    spotify: string;
  };
  album?: {
    name: string;
    images?: {
      url: string;
      height: number;
      width: number;
    }[];
  };
};
