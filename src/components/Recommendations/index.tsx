"use client";

import { SpotifyRecommendationTrack } from "@/types/spotify";
import { capitalizeFirst } from "@/utils/Capitalize";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { popIn } from "@/utils/FramerMotionStyle";
import CardPlaylist from "../CardPlaylist";

type RecommendationsProps = {
  artistId: string;
  trackId: string;
  genres: string[];
  accessToken?: string;
};

const Recommendations: React.FC<RecommendationsProps> = ({
  artistId,
  trackId,
  genres,
  accessToken,
}) => {
  const [recommendations, setRecommendations] = useState<
    SpotifyRecommendationTrack[]
  >([]);
  const [selectedGenre, setSelectedGenre] = useState<string>(genres[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/spotify/recommendations-playlist?seed_artist=${artistId}&seed_genres=${selectedGenre}&seed_track=${trackId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setRecommendations(data.tracks.items); // Access the correct track data
        } else {
          setError("Failed to fetch recommendations");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [artistId, trackId, selectedGenre, accessToken]);

  return (
    <div className="recommendations-root mt-4">
      <h3>Select Your Genre</h3>
      <div className="flex gap-2 my-3">
        {genres.map((genre) => (
          <motion.button
            key={genre}
            className={`text-sm px-3 py-2 rounded-md shadow-md transition cursor-pointer
        ${
          selectedGenre === genre
            ? "bg-white text-black font-semibold"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
            initial="hidden"
            animate="visible"
            variants={popIn(0.6)}
            onClick={() => setSelectedGenre(genre)}
          >
            {capitalizeFirst(genre)}
          </motion.button>
        ))}
      </div>

      {loading && <p>Loading recommendations...</p>}
      {error && <p>{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {recommendations.map((track) => (
          <CardPlaylist
            key={track.id}
            imageUrl={track.album?.images?.[0]?.url || "/fallback.jpg"}
            title={track.name}
            artist={track.artists?.[0]?.name || "Unknown Artist"}
            previewUrl={track.preview_url}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
