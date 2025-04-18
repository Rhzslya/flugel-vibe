"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type SpotifyTrack = {
  item: {
    name: string;
    album: {
      images: { url: string }[];
    };
    artists: {
      name: string;
    }[];
  };
};

export default function NowPlaying() {
  const { data: session } = useSession();
  const [track, setTrack] = useState<SpotifyTrack | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      if (!session?.accessToken) return;
      const res = await fetch("/api/spotify/currently-playing", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (res.ok) {
        const data: SpotifyTrack = await res.json();
        setTrack(data);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 10000); // update tiap 10 detik
    return () => clearInterval(interval);
  }, [session]);

  if (!track || !track.item) return <p>Nothing is playing</p>;

  return (
    <div className="flex items-center gap-2">
      <img
        src={track.item.album.images[0].url}
        alt="Album"
        className="w-12 h-12"
      />
      <div>
        <p className="font-bold">{track.item.name}</p>
        <p className="text-sm">
          {track.item.artists.map((a) => a.name).join(", ")}
        </p>
      </div>
    </div>
  );
}
