// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { refreshAccessToken } from "./refreshToken";

const scopes = [
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-playback-state",
  "user-read-currently-playing",
].join(",");

const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?scope=${scopes}&show_dialog=true`;

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: SPOTIFY_AUTH_URL,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 24 * 60,
    updateAge: 0,
  },
  callbacks: {
    async jwt({ token, account }) {
      const now = Math.floor(Date.now() / 1000);

      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expires_at: account.expires_at,
        };
      }

      if (typeof token.expires_at === "number" && now >= token.expires_at) {
        return await refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      if (!token.accessToken) return session;

      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
