"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PlayingTracks from "../PlayingTracks";
import { SpotifyRecommendationTrack, SpotifyTrack } from "@/types/spotify";
import { BentoPlaylist } from "../BentoPlaylist";

export default function NowPlaying() {
  const { data: session, status } = useSession();

  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [genres, setGenres] = useState([""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<
    SpotifyRecommendationTrack[]
  >([]);

  console.log(track?.is_playing);
  useEffect(() => {
    if (status !== "authenticated" || !session?.accessToken) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/spotify/currently-playing", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        const data = await res.json();
        setTrack(data as SpotifyTrack);

        if (!data?.is_playing) {
          setRecommendations([]);
          return;
        }

        if (res.ok && data?.item?.id !== track?.item?.id) {
          const artistId = data.item.artists[0].id;
          const trackid = data.item.id;

          const genreRes = await fetch(
            `/api/spotify/genres?artistId=${artistId}`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );

          const genreData = await genreRes.json();
          setGenres(genreData.genres);

          const recommendationsRes = await fetch(
            `/api/spotify/recommendations-playlist?seed_artist=${artistId}&seed_genres=${genreData.genres}&seed_track=${trackid}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );

          const recommendationsData = await recommendationsRes.json();

          if (!recommendationsRes.ok) {
            setRecommendations([]);
            return;
          }
          setRecommendations(recommendationsData.data.tracks.items);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch track", error);
        setErrorMessage("Failed to fetch track");
      } finally {
        setIsLoading(false);
      }
    }, 5000); // cek setiap 5 detik

    return () => clearInterval(interval);
  }, [session?.accessToken, status, track?.item?.id, genres, recommendations]);

  return (
    <>
      {errorMessage ? (
        <motion.div
          className="mt-4 rounded-md bg-red-100 border border-red-400 px-4 py-3 text-red-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm font-medium">{errorMessage}</p>
        </motion.div>
      ) : (
        <div className="now-playing-box mt-6">
          {isLoading ? (
            <motion.p
              className="text-xs text-gray-400 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              Loading...
            </motion.p>
          ) : !track || !track.item || !track.is_playing ? (
            <motion.p
              className="text-xs text-gray-400 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              Play some music on Spotify 🎵
            </motion.p>
          ) : (
            <>
              <PlayingTracks track={track} />
            </>
          )}
        </div>
      )}
      <BentoPlaylist recommendations={recommendations} />
    </>
  );
}
