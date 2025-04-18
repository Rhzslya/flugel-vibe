// app/api/spotify/currently-playing/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = authHeader.split(" ")[1];

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (res.status === 204) {
    return NextResponse.json({ message: "No track currently playing" });
  }

  if (!res.ok) {
    const errorText = await res.text(); // biar aman baca error
    return NextResponse.json(
      { error: "Unable to fetch currently playing", detail: errorText },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
