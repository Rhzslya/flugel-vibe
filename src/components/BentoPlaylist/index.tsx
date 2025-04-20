import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import Image from "next/image";
import { motion } from "framer-motion";
import { zoomInUp } from "@/utils/FramerMotionStyle";
import { SpotifyRecommendationTrack } from "@/types/spotify";

type BentoProjectProps = {
  recommendations: SpotifyRecommendationTrack[];
};

export const BentoProject: React.FC<BentoProjectProps> = ({
  recommendations,
}) => {
  const [visibleItems, setVisibleItems] = useState(5);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 5);
  };

  return (
    <motion.div className="max-w-4xl mx-auto">
      <BentoGrid>
        {recommendations.slice(0, visibleItems).map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.name}
            artist={item.artists?.[0]?.name || "Unknown Artist"}
            index={i}
            header={
              <motion.div
                className="relative w-full h-full rounded-xl overflow-hidden"
                variants={zoomInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
              >
                <Image
                  src={item.album?.images?.[0]?.url || ""}
                  alt={item.name}
                  objectFit="cover"
                  fill
                  className="rounded-xl group-hover:scale-105 duration-300"
                  priority={i === 0}
                  placeholder="blur"
                  blurDataURL={item.album?.images?.[0]?.url}
                />
              </motion.div>
            }
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>

      {visibleItems < recommendations.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-amber-600 font-semibold text-white rounded-md hover:text-black transition duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </motion.div>
  );
};
