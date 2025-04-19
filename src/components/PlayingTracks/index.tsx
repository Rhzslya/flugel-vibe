import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { motion } from "framer-motion";
import Image from "next/image";
import { capitalizeFirst } from "@/utils/Capitalize";
import { SpotifyTrack } from "@/types/spotify";

type PlayingTracksProps = {
  track: SpotifyTrack;
};

const PlayingTracks = ({ track }: PlayingTracksProps) => {
  return (
    <BackgroundGradient className="min-w-[200px]">
      <motion.div
        className="flex flex-col gap-2 rounded-md bg-black/80 px-4 py-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Konten utama */}
        <div className="flex items-center gap-4">
          {/* Album Cover dengan animasi */}
          <motion.div
            className="w-16 h-16 rounded-md overflow-hidden"
            key={track.item.album.images[0].url} // key diubah saat gambar album berganti
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Image
              width={64}
              height={64}
              src={track.item.album.images[0].url}
              alt="Album Cover"
              className="object-cover"
            />
          </motion.div>

          {/* Info Lagu dengan animasi */}
          <div className="text-white text-left overflow-hidden">
            <motion.p
              className="text-base font-semibold truncate"
              key={track.item.name} // key diubah saat nama lagu berganti
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {capitalizeFirst(track.item.name)}
            </motion.p>
            <motion.p
              className="text-sm text-gray-300 truncate"
              key={track.item.artists.map((a) => a.name).join(", ")} // key diubah saat artis berganti
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {track.item.artists.map((a) => a.name).join(", ")}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </BackgroundGradient>
  );
};

export default PlayingTracks;
