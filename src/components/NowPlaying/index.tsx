"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion
import PlayingTracks from "../PlayingTracks";
import { SpotifyTrack } from "@/types/spotify";
import Recommendations from "../Recommendations";

export default function NowPlaying() {
  const { data: session, status } = useSession();

  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState<string[]>([]);
  const [artistId, setArtistId] = useState("");
  const [trackId, setTrackId] = useState("");

  useEffect(() => {
    if (status !== "authenticated") {
      setIsLoading(false);
      setTrack(null);
      return;
    }
    const fetchTrack = async () => {
      if (!session) return;
      if (!session.accessToken) {
        setTrack(null);
        setErrorMessage("");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/spotify/currently-playing", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.item?.artists?.length > 0) {
          const artistId = data.item.artists[0].id;

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
          setArtistId(artistId);
        }

        if (res.ok) {
          setTrack(data as SpotifyTrack);
          setTrackId(data.item?.id);
        } else {
          setErrorMessage(data.message || "Something went wrong");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch track");
        console.log(error);
      } finally {
        setIsLoading(false); // Ini tetap dijalankan, baik sukses maupun error
      }
    };

    fetchTrack();

    const interval = setInterval(fetchTrack, 10000);
    return () => clearInterval(interval);
  }, [session, status]);

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
              <Recommendations
                artistId={artistId}
                trackId={trackId}
                genres={genres}
                accessToken={session?.accessToken}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
