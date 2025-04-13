"use client";

import { slideInFromLeft, fadeIn, popIn } from "@/utils/FramerMotionStyle";
import { SpotifyIcon } from "@/utils/Icons";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 text-center">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold"
        initial="hidden"
        animate="visible"
        variants={slideInFromLeft(0.3)}
      >
        FlugelVibe
      </motion.h1>
      <motion.p
        className="mt-4 text-xs sm:text-sm md:text-base text-gray-400"
        initial="hidden"
        animate="visible"
        variants={fadeIn(0.5)}
      >
        Choose your vibe, and let the music find you.
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {["Chill", "Happy", "Sad", "Focus"].map((vibe) => (
          <motion.div
            key={vibe}
            className="bg-white/10 text-white text-sm md:text-base py-4 sm:py-5 md:py-6 px-2 sm:px-3 md:px-4 rounded-lg shadow-md hover:bg-white/20 transition cursor-pointer"
            initial="hidden"
            animate="visible"
            variants={popIn(0.6)}
          >
            {vibe}
          </motion.div>
        ))}
      </div>

      <motion.button
        className="mt-10 bg-gradient-to-r from-[#1ED760] to-[#1DB954] hover:brightness-110 transition-colors duration-300 px-4 md:px-6 py-3 rounded-lg text-white text-sm md:text-base font-bold flex items-center gap-2 shadow-md"
        initial="hidden"
        animate="visible"
        variants={popIn(0.8)}
      >
        Connect with Spotify
        <SpotifyIcon size={30} />
      </motion.button>
    </main>
  );
}
