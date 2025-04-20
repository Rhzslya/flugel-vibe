import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  //  Check if the authorization header is present and valid
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Access denied: missing or invalid authorization token." },
      { status: 401 }
    );
  }

  const accessToken = authHeader.split(" ")[1];

  //   // Extract query parameters from the request
  const { searchParams } = req.nextUrl;
  const artistId = searchParams.get("seed_artist");
  const trackId = searchParams.get("seed_track");
  const genres = searchParams.get("seed_genres");

  console.log(genres);

  if (!artistId || !trackId || !genres) {
    return NextResponse.json(
      { message: "Missing required query parameters." },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      genres
    )}&type=track&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
