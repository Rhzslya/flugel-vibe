import { NextRequest, NextResponse } from "next/server";

// /api/spotify/genres.ts
export async function GET(req: NextRequest) {
  const artistId = req.nextUrl.searchParams.get("artistId");
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !artistId) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const accessToken = authHeader.split(" ")[1];

  const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json(
      { message: "Failed to fetch genres", err },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json({ genres: data.genres });
}
