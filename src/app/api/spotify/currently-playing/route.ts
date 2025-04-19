import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Access denied: missing or invalid authorization token." },
      { status: 401 }
    );
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
    return NextResponse.json({
      message: "No track is currently playing.",
    });
  }

  if (!res.ok) {
    const errorText = await res.text();
    return NextResponse.json(
      {
        message: "Failed to fetch currently playing track.",
        detail: errorText,
      },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
