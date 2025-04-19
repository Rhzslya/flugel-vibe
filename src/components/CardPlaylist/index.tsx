import { cn } from "@/lib/utils";
import React from "react";

type CardPlaylistProps = {
  imageUrl: string;
  title: string;
  artist: string;
  previewUrl: string | null;
};

const CardPlaylist: React.FC<CardPlaylistProps> = ({
  imageUrl,
  title,
  artist,
  previewUrl,
}) => {
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-[300px] rounded-md shadow-xl mx-auto bg-cover bg-center flex flex-col justify-between p-4",
          "bg-black"
        )}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute w-full h-full top-0 left-0 bg-black/50 transition duration-300 group-hover/card:bg-black/70 z-0" />
        <div className="flex flex-col justify-between h-full relative z-10">
          <div className="text-white">
            <h1 className="font-bold text-xl">{title}</h1>
            <p className="text-sm text-gray-300">{artist}</p>
          </div>

          {previewUrl ? (
            <audio controls className="w-full mt-4">
              <source src={previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p className="text-sm text-gray-400 mt-4">No preview available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardPlaylist;
